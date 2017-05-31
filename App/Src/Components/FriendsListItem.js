import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, CheckBox, Button, Icon } from 'native-base';

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFriendChecked: false
    }
  }

  _toggleFriendChecked = () => {
    this.setState({
      isFriendChecked: !this.state.isFriendChecked
    });
    if (!this.state.isFriendChecked) {
      this.props._addFriendToList(this.props.user.id);
    } else {
      this.props._removeFriendFromList(this.props.user.id);
    }
  }

  _deleteFriend = () => {
    console.log('deleting friend, id: ',this.props.user.id);
    this.props.deleteFriend(this.props.user.id);
  }

  render() {
    console.log('this.props.isModalVisible',this.props.isModalVisible);
    return (
      <View style={styles.friendCard}>
        <View style={styles.photo}>
          <Image style={styles.image} source={
            this.props.user.photo === 'NO_PHOTO' ?
              {uri: 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'}
              : {uri: this.props.user.photo}
          } />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{this.props.user.username}</Text>
          </View>
          <View>
            <Text style={styles.quote}>{
              this.props.user.tagline === 'NO_TAGLINE' ?
                `I'm not very inventive!`
                : this.props.user.tagline
            }</Text>
          </View>
        </View>
        <View style={styles.friendCheckbox}>
          {this.props.isModalVisible ? (
            <CheckBox checked={this.state.isFriendChecked} onPress={() => {this._toggleFriendChecked()}} />
          ) : (
              <Icon style={{fontSize: 30, color: 'red', flex: 1}} name="close" onPress={() => {this._deleteFriend()}}/>
          )
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  friendCard: {
    flex: 1,
    flexBasis: 0,
    flexShrink: 1,
    margin: 10,
    marginBottom: 0,
    flexDirection: 'row',
    borderColor: '#d1d1e0',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: '#e5f2ff'
  },
  photo: {
    flex: 1,
    margin: 'auto',
    alignSelf: 'center',
    paddingRight: 10
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  userInfo: {
    flex: 5,
    flexDirection: 'column',
  },
  usernameContainer: {
    paddingBottom: 2
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 8
  },
  friendCheckbox: {
    justifyContent: 'center',
    flex: 1,
  }
});

export default Friend;
