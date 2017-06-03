import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions,  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { H1, H2, H3, Button } from 'native-base';
import { ActionCreators } from './../Actions/ActionCreators';
import Modal from 'react-native-modal';

class GotPhotoModal extends Component {
  constructor(props) {
    super(props);
  };
  render () {
    // const BUTTONS = this.props.habits.map(h => h.name).concat(['Cancel']);
    // const CANCEL_INDEX = BUTTONS.length-1;



    return (
      <Modal
        isVisible={this.props.photo.showGotPhotoModal}
        animationType={'fade'}
        transparent={false}
        onRequestClose={() => {this._closeModal()}}
        style={styles.modal}>
        <View style={styles.headerContainer}>
          <H1 style={{fontWeight: 'bold'}}>Image Recognized!</H1>
        </View>
        <View style={styles.shakeTextContainer}>
          <Text style={styles.shakeText}>Shake to retake</Text>
        </View>
        <View style={styles.yourPhotoTextContainer}>
          <H3 style={{fontWeight: 'bold'}}>Your Photo:</H3>
        </View>
        <View style={styles.photoContainer}>
          <Image style={styles.photo} source={{uri:'https://i.ytimg.com/vi/8ud6haTTfFY/maxresdefault.jpg'}} />
        </View>
        <View style={styles.saveToDeviceLinkContainer}>
          <Text style={styles.saveToDeviceLink}>SAVE TO DEVICE</Text>
        </View>
        <View style={styles.youCompletedTextContainer}>
          <H3>You completed:</H3>
        </View>
        <View style={styles.completedHabitTextContainer}>
          <H2 style={{fontWeight: 'bold'}}>Repeat the past</H2>
        </View>
        <View style={styles.notRightHabitTextContainer}>
          <Text style={styles.notRightHabitText}>Not the right habit?</Text>
        </View>
        <View style={styles.selectNewLinkContainer}>
          <Text style={styles.selectNewLink}>Assign to another</Text>
        </View>
        <View style={styles.okButtonContainer}>
          <Button block success style={{alignSelf: 'stretch'}}>
            <Text style={styles.okButtonText}>Ok!</Text>
          </Button>
        </View>
      </Modal>
    )
  }
};

const styles = StyleSheet.create({
  modal: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    flex: 0,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  headerContainer: {
    flex: 0,
    marginTop: 20,
  },
  shakeTextContainer: {
    flex: 0,
  },
  shakeText: {
    fontStyle: 'italic',
  },
  yourPhotoTextContainer: {
    flex: 0,
    marginTop: 20
  },
  photoContainer: {
    flex: 0,
  },
  photo: {
    flex: 0,
    height: 200,
    width: 200,
    marginTop: 3,
  },
  saveToDeviceLinkContainer: {
    flex: 0,
    marginTop: 3,
  },
  saveToDeviceLink: {
    fontSize: 10,
    color: 'gray',
    textDecorationLine: 'underline',
  },
  youCompletedTextContainer: {
    flex: 0,
    marginTop: 20
  },
  completedHabitTextContainer: {
    flex: 0,
    marginTop: 3
  },
  notRightHabitTextContainer: {
    flex: 0,
    marginTop: 20,
  },
  notRightHabitText: {
    fontWeight: 'bold'
  },
  selectNewLinkContainer: {

  },
  selectNewLink: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    color: 'blue',
  },
  okButtonContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  okButtonText: {
    color: 'white',
  },
})


const mapStateToProps = (state) => {
  return {
    photo: state.photo,
    habits: state.user.userData.habits
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GotPhotoModal);
