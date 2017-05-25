import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Actions, Router, Scene, Modal, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../Actions/ActionCreators';
import Camera from './Camera';
import Habits from './Habits';
import Auth from './Auth';

class TabIcon extends Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'blue' :'black'}}>{this.props.title}</Text>
        );
    }
}

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
      <Router>
        <Scene key={'root'}>
          <Scene key='auth' component={Auth} title='Signup' passProps={true} />
          <Scene key='camera' component={Camera} title='Capture You Habit' passProps={true} />
          <Scene key='habits' component={Habits} title='Your Habits!' passProps={true} />
        </Scene>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(ActionCreators, dispatch)
);

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
