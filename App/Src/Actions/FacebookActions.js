import { facebookLoginAPI, getFacebookInfoAPI, facebookServer } from '../FacebookHelpers.js';
import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { fetchUserSuccess } from './UserActions.js';

export function authStarted() {
  return {
    type: 'FB_AUTH_STARTED',
  };
}

export function authSuccess(facebookToken, facebookProfile, serverAuthToken){
  return {
    type: 'FB_AUTH_SUCCESS',
    facebookToken,
    facebookProfile,
    authToken: serverAuthToken,
  };
}

export function authFailure(authError){
  return {
    type: 'FB_AUTH_FAILURE',
    authError,
  };
}

export function logout() {
  return {
    type: 'FB_LOGOUT',
  };
}

export function facebookLogin() {
  return (dispatch) => {
    dispatch(authStarted());
    let fbToken, fbProfile;
    facebookLoginAPI().then((facebookAuthResult) => {
      fbToken = facebookAuthResult.accessToken;
      console.log('fb token', fbToken);
      return getFacebookInfoAPI(facebookAuthResult.accessToken);
    }).then((facebookProfile) => {
      console.log('fb profile', facebookProfile);
      fbProfile = facebookProfile;
      facebookServer(facebookProfile)
      .then(data => {
        return data.json()
      })
      .then(data => {
        
        //LATER - page to set new username with first time fb login
        // if(data.user.username === data.user.facebook_id){
        //   Actions.fbSignup({type: ActionConst.RESET, data})
        // }
        dispatch(authSuccess(fbToken, fbProfile, data.token))
        dispatch(fetchUserSuccess(data))
        data.habits.length ? Actions.camera({type: ActionConst.RESET}) : Actions.habits({type: ActionConst.RESET});
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('user', JSON.stringify(data));
      })
      .catch(err => dispatch(authFailure(err)));
    })
    .catch(err => dispatch(authFailure(err)));
  };
}