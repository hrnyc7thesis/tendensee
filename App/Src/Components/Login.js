import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { facebookLogin } from '../Actions/FacebookActions';
import { Button, Text } from 'native-base';
import FBSDK, { LoginManager } from 'react-native-fbsdk';



class Login extends Component {
  componentWillMount() {
    this.authCheck(this.props.authToken);
  }

  componentWillReceiveProps(nextProps) {
    this.authCheck(nextProps.authToken);
  }

  authCheck(authToken){
    if (authToken) {
      return authToken;
    }
  }

  renderError() {
    if(this.props.authError){
      console.log(this.props.authError);
    }
    return null;
  }

  render() {
    return(
        <Button block onPress={this.props.onFacebookLoginPressed}><Text> Login with Facebook </Text></Button>
    );
  }
}

export default Login;
