import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon, H1 } from 'native-base';


export default class WordTitleNav extends Component {
  render() {
    return (
      <TouchableOpacity style={{marginBottom: 2}}>
        <Text style={[this.props.style, {fontWeight: 'bold', fontSize: 24, color: colors.primaryText}]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
