import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './../Actions/ActionCreators';
import { Actions } from 'react-native-router-flux';

class Landing extends Component {

  constructor (props) {
    super (props);
    this.state = {
      timeout: false
    };

    setTimeout(this.noPersistTimeout.bind(this), 1000);
  }

  componentDidUpdate() {
    console.log('cdu token', this.props.user.token)
    if(this.props.user.token) {
      this.props.checkAuth(this.props.user.token);
    }
  }

  shouldComponentUpdate() {
    return (this.props.user.token || this.state.timeout) ? false : true;
  }

  noPersistTimeout() {
    if (!this.props) {
      setTimeout(this.noPersistTimeout.bind(this), 1000);
    } else if(!this.props.routes.scene.title === "Landing") {
      return
    } else if (this.props.routes.scene.title ==="Landing") {
      this.props.landingTimeout(this.props.user.token, this.props.routes.scene.title);
    } 
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
    routes: state.routes,
    user: state.user.userData,
    auth: state.auth
  }
};

export default connect (mapStateToProps, mapDispatchToProps)(Landing);
