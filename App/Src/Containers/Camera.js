import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Text, View, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import Camera from 'react-native-camera';
import { ActionCreators } from './../Actions/ActionCreators';
import { Button, Icon } from 'native-base';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Actions } from 'react-native-router-flux';


class Cam extends Component {


  componentWillMount() {
    this.props.fetchUser(this.props.user.token);
  }

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
    console.log('in cam - day, habit', this.props.day, this.props.habitProps)

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
        </GestureRecognizer>
    );
  }

  takePicture() {
    let options = {};
    console.log('');
    this.camera.capture({metadata: options})
    .then((data) => {
      Alert.alert('Got Photo!');
      let sendData = Object.assign({}, this.props.user, {
        data: data
      });
      this.props.sendPhoto(sendData, this.props.day, this.props.habitProps);

      this.props.incrementPhotoCount();
      console.log('sendData: ', sendData);
      console.log('taking photo');

      // //
      // // let postData = data;
      // // postData['id_users'] = ''; // ADD USER ID HERE
      // // postData['id_habits'] = []; // array of USER HABIT DATA HERE
      // fetch('http://192.168.1.5:8080/api/dates', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(postData)
      // })
      // .then((data) => console.log('picture res from server data:', data))
      // .catch((err) => console.log('Send error', err))
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
  }
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
