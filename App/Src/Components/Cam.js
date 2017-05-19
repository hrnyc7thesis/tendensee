import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Camera from 'react-native-camera';

export default class Cam extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[Click!]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    console.log('')
    this.camera.capture({metadata: options})
      .then((data) => {
        console.log('data: ', data);
        console.log('taking photo');
        fetch('http://{INSERT IP ADDRESS HERE}:8080/api/dates', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ imageData: data })
        })
          .then(() => console.log('Send success'))
          .catch((err) => console.log('Send error', err))
      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('Cam', () => Cam);
