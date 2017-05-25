import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Actions, Router, Scene, Modal, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../Actions/ActionCreators';
import Camera from './Camera';
import Habits from './Habits';
import Auth from './Auth';
import UserProfile from '../Components/UserProfile';
import Setting from './Setting';

class TabIcon extends Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'blue' :'black'}}>{this.props.title}</Text>
        );
    }
}

const ReduxRouter = connect()(Router);

class AppRouter extends Component {
  render() {
    let styles = StyleSheet.create({
      tabBar: {
        borderTopWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: '#fff',
        opacity: 1
      }
    })

    return (
      <ReduxRouter>
        <Scene key='root'>
          <Scene key='auth' component={Auth} title='Signup' passProps={true} />
          <Scene key='camera' titleProps={{order:1}} component={Camera} title='Capture Your Habit' passProps={true} animation='leftToRight' />
          <Scene key='habits' titleProps={{order:2}} component={Habits} title='Your Habits!' passProps={true} />
          <Scene key='setting' titleProps={{order:3}} component={Setting} title='Setting Page' passProps={true} />
        </Scene>
      </ReduxRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(ActionCreators, dispatch)
);

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
