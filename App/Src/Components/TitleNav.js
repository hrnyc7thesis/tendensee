import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Text, H1 } from 'native-base';


export default class TitleNav extends Component {
  render() {
    return (
      <TouchableOpacity style={{marginBottom: 10}}>
        <Text style={this.props.style}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
