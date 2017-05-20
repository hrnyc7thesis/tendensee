import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import Camera from 'react-native-camera';

class Cam extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.disk}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[Click!]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    let options = {};
    console.log('')
    this.camera.capture({metadata: options})
    .then((data) => {
      console.log('data: ', data);
      console.log('taking photo');
      let postData = data;
      postData['id_users'] = ''; // ADD USER ID HERE
      postData['id_habits'] = []; // array of USER HABIT DATA HERE
      fetch('http://10.16.0.80:8080/api/dates', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      .then((data) => console.log('picture res from server data:', data))
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

mapStateToProps = (state) => (
  {}
);

export default connect(mapStateToProps)(Cam);
