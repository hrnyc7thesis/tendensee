import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { H1, } from 'native-base';
import { ActionCreators } from './../Actions/ActionCreators';
import Modal from 'react-native-modal';

class PhotoCalculatingModal extends Component {
  constructor(props) {
    super(props);
  };
  render () {
    return (
      <Modal
        isVisible={false}
        animationType={'fade'}
        transparent={false}
        onRequestClose={() => {this._closeModal()}}>
        <View style={{ flex: 1 }}>
          <H1>Hello!</H1>
        </View>
      </Modal>
    )
  }
};

const styles = StyleSheet.create({

})


const mapStateToProps = (state) => {
  return {
    photo: state.photo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCalculatingModal);
