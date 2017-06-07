import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions, TouchableHighlight, CameraRoll, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { H1, H2, H3, Button, ActionSheet, Container } from 'native-base';
import { ActionCreators } from './../Actions/ActionCreators';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
// import { Accelerometer, Gyroscope } from 'react-native-sensors';


class GotPhotoModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      x: 0,
      y: 0,
      z: 0, 
    }
  }

  _redirectToHabits() {
    this.props.hideGotPhotoModal();
    Actions.habits();
  }

  _showActionSheet() {
    BUTTONS = this.props.habits.filter(h => h.id !== this.props.currentPhoto.id_habits).map(h => h.name).concat(['Cancel']);
    CANCEL_INDEX = BUTTONS.length - 1;
    ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      title: 'Sorry! Our systems are still in training!',
      message: 'What is this a picture of?'
    },
    (buttonIndex) => {
      if (buttonIndex !== CANCEL_INDEX) {
        let newDate = Object.assign({}, this.props.currentPhoto, {
          id_habits: this.props.habits.filter(h => h.name === BUTTONS[buttonIndex])[0].id
        });
        this.props.updateDay(newDate);
        this.props.hideGotPhotoModal();
        Actions.habits();
      }
    });
  }

  _saveToCameraRoll() {
    CameraRoll.saveToCameraRoll(this.props.currentPhoto.picture)
      .then(Alert.alert('Success', 'Photo added to camera roll!'))
  }

  _deleteDateAndCloseModal() {
    this.props.deleteDay(this.props.currentPhoto);
    this.props.hideGotPhotoModal();
  }

  render () {
    let matchedHabit;
    if (this.props.currentPhoto) {
      matchedHabit = this.props.habits.filter(h => h.id === this.props.currentPhoto.id_habits)[0];
    }

    return (
    <Container>
      <Modal
        isVisible={this.props.sendPhotos.showGotPhotoModal}
        // isVisible={true}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => {this._closeModal()}}
        style={styles.modal}>
        <View style={styles.headerContainer}>
          <H1 style={{fontWeight: 'bold'}}>Image Recognized!</H1>
        </View>
        <TouchableHighlight underlayColor='gray' style={styles.shakeTextContainer} onPress={() => this._deleteDateAndCloseModal()}>
          <Text style={styles.shakeText}>Press to retake</Text>
        </TouchableHighlight>
        <View style={styles.yourPhotoTextContainer}>
          <H3 style={{fontWeight: 'bold'}}>Your Photo:</H3>
        </View>
        <View style={styles.photoContainer}>
          <Image style={styles.photo} source={{uri:this.props.currentPhoto ? this.props.currentPhoto.picture : ''}} />
        </View>
        <TouchableHighlight underlayColor='gray' style={styles.saveToDeviceLinkContainer} onPress={() => this._saveToCameraRoll()}>
          <Text style={styles.saveToDeviceLink}>SAVE TO DEVICE</Text>
        </TouchableHighlight>
        <View style={styles.youCompletedTextContainer}>
          <H3>You completed:</H3>
        </View>
        <View style={styles.completedHabitTextContainer}>
          <H2 style={{fontWeight: 'bold'}}>{matchedHabit ? matchedHabit.name : null}</H2>
        </View>
        <View style={styles.notRightHabitTextContainer}>
          <Text style={styles.notRightHabitText}>Not the right habit?</Text>
        </View>
        <TouchableHighlight underlayColor='gray' style={styles.selectNewLinkContainer} onPress={() => this._showActionSheet()}>
          <Text style={styles.selectNewLink}>Assign to another</Text>
        </TouchableHighlight>
        <View style={styles.okButtonContainer}>
          <Button block success style={{alignSelf: 'stretch'}} onPress={() => this._redirectToHabits()}>
            <Text style={styles.okButtonText}>Ok!</Text>
          </Button>
        </View>
      </Modal>
    </Container>
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
    sendPhotos: state.sendPhotos,
    habits: state.user.userData.habits,
    currentPhoto: state.sendPhotos.currentPhoto,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GotPhotoModal);
