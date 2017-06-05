const initialState = {
  authenticating: false,
  authToken: null,
  authError: null,
  facebookToken: null,
  facebookProfile: null
}

function facebook(state = initialState, action) {
  switch(action.type) {
    case 'FB_AUTH_STARTED':
      return Object.assign({}, state, {
        authenticating: true,
        loginText: 'Connexion..'
      });
    case 'FB_AUTH_SUCCESS':
      return Object.assign({}, state, {
        authenticating: false,
        authToken: action.authToken,
        facebookToken: action.facebookToken,
        facebookProfile: action.facebookProfile,
      });
    case 'FB_AUTH_FAILURE':
      return Object.assign({}, state, {
        authenticating: false,
        authError: action.authError.message,
      });
    case 'FB_LOGOUT':
      return Object.assign({}, state, {
        authenticating: false,
        authToken: null,
        facebookToken: null,
        facebookProfile: null,
        loginText: null,
      });
    default:
      return state;
  }
}

export default facebook;