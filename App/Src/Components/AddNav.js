import React, { Component } from 'react';
import { TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';


export default class AddNav extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.onPress()}}>
        <Icon style={this.props.style} name='add-circle' />
      </TouchableOpacity>
    );
  }
}