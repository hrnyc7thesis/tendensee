import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { ActionCreators } from '../Actions/ActionCreators';
import Camera from './Camera';

class AppContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  }
});


mapDispatchToProps = (dispatch) => (
  bindActionCreators(ActionCreators, dispatch)
);

mapStateToProps = (state) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
