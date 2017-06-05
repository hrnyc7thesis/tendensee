import { MY_IP } from './myip';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const facebookParams = 'id,name,email,picture.width(100).height(100)';

export const facebookLoginAPI = () => {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email'])
    .then((FBloginResult) => {
      if (FBloginResult.isCancelled) {
        throw new Error('Login cancelled');
      }

      if (FBloginResult.deniedPermissions) {
        throw new Error('We need the requested permissions');
      }

      return AccessToken.getCurrentAccessToken();
      console.log(FBloginResult);
    })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const getFacebookInfoAPI = () => {
  return new Promise((resolve, reject) => {
    const profileInfoCallback = (error, profileInfo) => {
      if (error) reject(error);

      resolve(profileInfo);
    };

    const profileInfoRequest =
      new GraphRequest(
        '/me',
        {
          parameters: {
            fields: {
              string: facebookParams,
            },
          },
        },
        profileInfoCallback
      );

    new GraphRequestManager().addRequest(profileInfoRequest).start();
  });
}

export const getFacebookFriends = () => {
  return new Promise((resolve, reject) => {
    const profileInfoCallback = (error, profileInfo) => {
      if (error) reject(error);
      console.log(profileInfo);
      resolve(profileInfo);
    };

    const profileFriendsRequest =
      new GraphRequest(
        '/me/friends',
        {
          parameters: {
            fields: {
              string: facebookParams,
            },
          },
        },
        profileInfoCallback
      );

    new GraphRequestManager().addRequest(profileFriendsRequest).start();
  });
}

export const facebookServer = (facebookProfile) => {
  return fetch(`http://${MY_IP}:8080/facebook`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(facebookProfile)
  })
}