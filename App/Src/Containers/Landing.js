import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './../Actions/ActionCreators';
import { Actions } from 'react-native-router-flux';

class Landing extends Component {
  
  constructor (props) {
    super (props);
    this.state = {};
  }

  componentDidUpdate() {
    console.log('landing user token', this.props.user.token)

    if(this.props.user.token) {
      this.props.checkAuth(this.props.user.token);
    }
  }

  shouldComponentUpdate() {
    return this.props.user.token ? false : true;
  }

  render() {
    console.log('landing render isloggedin', this.props.auth.isLoggedIn)
    return (
        <View style={{flex:1, alignSelf:'stretch', backgroundColor: 'red'}} />
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(ActionCreators, dispatch)
);

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userData,
    auth: state.auth
  }
};

export default connect (mapStateToProps, mapDispatchToProps)(Landing);