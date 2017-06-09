import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Text, View, Dimensions, StyleSheet, TouchableHighlight, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import Camera from 'react-native-camera';
import { ActionCreators } from './../Actions/ActionCreators';
import { Button, Icon } from 'native-base';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Actions, ActionConst } from 'react-native-router-flux';
import PhotoCalculatingModal from './../Components/PhotoCalculatingModal';
import GotPhotoModal from './../Components/GotPhotoModal';
import colors from './../ColorPalette';

// import { Accelerometer, Gyroscope } from 'react-native-sensors';
// let accelerationObservable;

class Cam extends Component {

  constructor(props) {
    super(props);
    this.state= {
      // deleteActionRun: false,
      // accelerationObservable: null,
      habitProps: this.props.habitProps,
      habitDay: this.props.habitDay,
    }
    console.log('camera constructor')
  }

  componentWillMount() {
    console.log('helloooo cameraaa', this.props.user);
    let habits = this.props.habits.map(h => (
      {id: h.id, name: h.name, notification: h.notification}
    ));
    console.log(habits);
  }

  onSwipeLeft() {
    Actions.habits();
  }

  onSwipeRight() {
    Actions.images();
  }

  // _deleteDateAndCloseModal() {
  //   this.props.deleteDay(this.props.currentPhoto);
  //   this.props.hideGotPhotoModal();
  // }

  render() {
    // if (accelerationObservable) {
    //   accelerationObservable
    //   .map(({ x, y, z }) => x + y + z)
    //   .filter(speed => speed > 1)
    //   .subscribe(speed => {
    //     if (!this.state.deleteActionRun) {
    //       accelerationObservable.stop();
    //       console.log('hi! this is acceleration');
    //       this._deleteDateAndCloseModal();
    //       this.setState({ deleteActionRun: true });
    //     }
    //   })
    // }
    console.log('cam all state', this.state)
    console.log('cam ernder day, habit', this.state.habitDay, this.state.habitProps, this.takePicture)
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
      <StatusBar hidden={true} />
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            captureTarget={Camera.constants.CaptureTarget.memory}
            captureQuality='medium'
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <View style={styles.buttonsContainer}>
              <Button transparent onPress={() => {Actions.images()}}>
                <Icon style={{fontSize: 40, color: 'white', opacity: 1}} name="person" />
              </Button>
              <View style={{borderRadius: 25, borderBottomWidth: 3, borderBottomColor: 'white', paddingBottom: 2}}>
                <Button transparent onPress={() => this.takePicture()}>
                  <Icon style={{fontSize: 50, color: 'white'}} name="radio-button-on" />
                </Button>
              </View>
              <Button transparent onPress={() => {Actions.habits()}}>
                <Icon style={{fontSize: 40, color: 'white'}} name="list" />
              </Button>
            </View>
          </Camera>

          <View>
            <PhotoCalculatingModal />
          </View>

          <View style={styles.gotPhotoModal}>
            <GotPhotoModal habitDay={this.state.habitDay} habitProps={this.props.habitProps} />
          </View>

        </GestureRecognizer>
    );
  }

  takePicture(d, h) {
    console.log('in tp')
    let options = {};
    this.camera.capture({metadata: options})
    .then((data) => {
      // Alert.alert('Got Photo!');
      let sendData = Object.assign({}, this.props.user, {
        data: data
      });
      this.props.sendPhoto(sendData, this.state.habitDay, this.props.habitProps);
      // this.setState({ deleteActionRun: false });
      // accelerationObservable = new Accelerometer({
      //   updateInterval: 2000
      // });
      // this.props.showPhotoCalculatingWithTimeout();
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
    borderRadius: 0,
    alignSelf: 'stretch',
    backgroundColor: colors.primaryDark,
    paddingTop: 5,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gotPhotoModal: {
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    auth: state.auth,
    currentPhoto: state.sendPhotos.currentPhoto,
    habits: state.user.userData.habits,

  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cam);
