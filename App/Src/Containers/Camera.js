import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Text, View, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import Camera from 'react-native-camera';
import { ActionCreators } from './../Actions/ActionCreators';
import { Button, Icon } from 'native-base';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Actions } from 'react-native-router-flux';
import PhotoCalculatingModal from './../Components/PhotoCalculatingModal';
import GotPhotoModal from './../Components/GotPhotoModal';

class Cam extends Component {

  onSwipeLeft() {
    Actions.habits();
  }

  onSwipeRight() {
    Actions.images();
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
          style={styles.gesture}
          onSwipeLeft={() => this.onSwipeLeft()}
          config={config}
          onSwipeRight={() => this.onSwipeRight()}
        >
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            captureTarget={Camera.constants.CaptureTarget.memory}
            captureQuality='low'
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <View style={styles.buttonsContainer}>
              <Button transparent onPress={() => {Actions.images()}}>
                <Icon style={{fontSize: 40, color: 'white'}} name="person" />
              </Button>
              <Button transparent onPress={this.takePicture.bind(this)}>
                <Icon style={{fontSize: 80, color: 'white', alignSelf: 'flex-end'}} name="radio-button-on" />
              </Button>
              <Button transparent onPress={() => {Actions.habits()}}>
                <Icon style={{fontSize: 40, color: 'white'}} name="menu" />
              </Button>
            </View>
          </Camera>

          <View>
            <PhotoCalculatingModal />
          </View>

          <View style={styles.gotPhotoModal}>
            <GotPhotoModal />
          </View>

        </GestureRecognizer>
    );
  }

  takePicture() {
    let options = {};
    this.camera.capture({metadata: options})
    .then((data) => {
      // Alert.alert('Got Photo!');
      let sendData = Object.assign({}, this.props.user, {
        data: data
      });
      this.props.sendPhoto(sendData);
      this.props.showPhotoCalculatingWithTimeout();
    })
    .catch(err => console.error(err));
  }

}

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  gotPhotoModal: {
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cam);
