import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import { login } from '../Actions/AuthActions.js'

class Login extends Component {

  render() {
    return (
      <View>
        <Text>
          Login
        </Text>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect (mapDispatchToProps)(Login);
