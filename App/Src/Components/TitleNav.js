import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { Icon, H1 } from 'native-base';


export default class TitleNav extends Component {
  render() {
    return (
      <TouchableOpacity>
        <Image style={{ height: 30, width: 135, marginBottom:0, resizeMode: 'contain'}} source={{uri: 'https://s3.us-east-2.amazonaws.com/tgoc99habit/tendensee-logo-1000.png'}}/>
      </TouchableOpacity>
    );
  }
}
