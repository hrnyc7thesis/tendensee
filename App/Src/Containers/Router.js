import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux';
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
          <Scene key={'tabs'} hideNavBar={true} tabs={true} tabBarStyle={styles.tabBar} direction={'vertical'}>
            <Scene
              key={'cameraTab'}
              title={'Camera'}
              icon={TabIcon}
              style={{paddingTop: 64}}
            >
              <Scene
                key={'camera'}
                component={Camera}
                title={'Capture your Habit'}
                passProps={true}/>
            </Scene>
            <Scene
              key={'habitsTab'}
              title={'Habits'}
              icon={TabIcon}
              style={{paddingTop: 64}}
            >
              <Scene
                key={'habits'}
                component={Habits}
                title={'Your Habits!'}
                passProps={true} />
            </Scene>
            <Scene
              key={'authTab'}
              title={'Login'}
              icon={TabIcon}
              style={{paddingTop: 64}}
            >
              <Scene
                key={'auth'}
                component={Auth}
                title={'Login or Signup'}
                passProps={true} />
            </Scene>
          </Scene>
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
