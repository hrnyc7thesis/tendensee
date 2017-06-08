import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Actions, Router, Scene, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../Actions/ActionCreators';
import Camera from './Camera';
import Habits from './Habits';
import IndividualHabit from './IndividualHabit';
import Auth from './Auth';
import Setting from './Setting';
import Landing from './Landing';
import Images from './Images';
import { Icon } from 'native-base';

const ReduxRouter = connect()(Router);

class AppRouter extends Component {

  render() {

    return (
      <ReduxRouter navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>
        <Scene key='root'>
          <Scene
          key='landing'
          component={Landing}
          hideNavBar={true}
          title='Landing'
          passProps={true}
          initial={true}
          />
          <Scene
          key='auth'
          component={Auth}
          hideNavBar={true}
          title='Signup'
          passProps={true}
          />
          <Scene
          key='camera'
          component={Camera}
          hideNavBar={true}
          panHandlers={null}
          title='Capture Your Habit'
          passProps={true} />
          <Scene
          key='habits'
          component={Habits}
          hideNavBar={true}
          title='Your Habits!'
          passProps={true} />
          <Scene
          key='images'
          component={Images}
          title='Images Page'
          hideNavBar={true}
          passProps={true}
          animation='leftToRight'/>
          <Scene
          key='setting'
          component={Setting}
          title='Setting Page'
          hideNavBar={true}
          passProps={true} />
          <Scene
          key='individualHabit'
          component={IndividualHabit}
          title='Habit Page'
          hideNavBar={true}
          passProps={true}
          rightTitle='Edit'
          onRight={()=> {console.log('clicked header')}}
          navigationBarStyle={styles.navBar}
          titleOpacity={0} />
        </Scene>
      </ReduxRouter>
    )
  }
}

const styles = StyleSheet.create({

  navBar: {
      backgroundColor:'#1fb7e9',
  },
  navBarTitle:{
      color:'#FFFFFF'
  },
  barButtonTextStyle:{
      color:'#FFFFFF'
  },
  barButtonIconStyle:{
      tintColor:'rgb(255,255,255)'
  },
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(ActionCreators, dispatch)
);

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userData,
    auth: state.auth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
