import React, { Component } from 'react';
import { ScrollView, Text, Alert, View, Button, Image, StyleSheet, Switch, TextInput, TouchableOpacity, AlertIOS } from 'react-native';
import { Container, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
var ImagePicker = require('react-native-image-picker');
import Snackbar from 'react-native-snackbar';


var options = {
  title: 'Select Photo',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
    {name:'instagram', title: 'Choose Photo from Instagram'}
  ],
  storageOptions: {
    skipBackup: false,
    path: 'images'
  }
};

const dummyUserData = {
    "user": {
      "fullname": "Yet!",
      "id": 101,
      "username": "Deb123",
      "email": "debasishbd@outlook.com",
      "facebook": "dave mozumder",
      "profileImg": "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwi-1pDPlJvUAhXJ2xoKHQx8Dy0QjRwIBw&url=http%3A%2F%2Fenadcity.org%2Fcg-leaders-profile%2F&psig=AFQjCNEX99KVyfv5WTGi0pTZufq2xza6iQ&ust=1496355405013384"
    },
    "habits": [
      {
        "id": 12,
        "name": "Exercise",
        "description": "I will workout every other day for next one month, wish me good luck fellas",
        "type": "gym",
        "habitPic": "https://media-cdn.tripadvisor.com/media/photo-s/04/b9/12/9a/fairfield-inn-suite-rdu.jpg",
        "start_date": "0000-00-00 00:00:00",
        "notification": null, // would be time of day if set
        "private": false,
        "has_picture": true,
        "id_users": 101,
        "dates": [
          {
            "id": 2,
            "date": "0000-00-00",
            "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
          }
        ]
      },
      {
        "id": 16,
        "name": "Study",
        "description": "I will read every other day for next one month, wish me good luck fellas",
        "type": "book",
        "start_date": "0000-00-00 00:00:00",
        "notification": 1,
        "private": false,
        "has_picture": true,
        "id_users": 101,
        "dates": [
          {
            "id": 1,
            "date": "0000-00-00",
            "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
          }
        ]
      }
    ]
}

export default class UserSettings extends Component {
  state = {
    notification: true,
    allPrivate: false,
    email: dummyUserData.user.email,
    avatarSource: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  };
  _toggleNotification = () => {
    this.setState({notification: !this.state.notification});
    Snackbar.show({
      backgroundColor: this.state.notification ? '#AD1457' : '#4CAF50',
      title: this.state.notification ? 'Notifications Turned OFF' : 'Notifications Turned ON',
      duration: Snackbar.LENGTH_SHORT,
    });
  };
  _toggleAllPrivate = () => {
    this.setState({allPrivate: !this.state.allPrivate});
    Snackbar.show({
      backgroundColor: this.state.allPrivate ? '#E91E63' : '#263238',
      title: this.state.allPrivate ? 'Private OFF' : 'All Habit Set To Private',
      duration: Snackbar.LENGTH_SHORT,
    });
  };
  _saveResponse = (promptValue) => {
    this.setState({ email: promptValue });
  };

    render() {
      // let profileImg = this.state.avatarSource === null ? null :
        return (
          <View style= {styles.pageView}>
            <View style={styles.container}>
              <Text style={styles.headingText}>Setting</Text>
              <View style={styles.habitWrap}>
                <TouchableOpacity style={{alignSelf:'center', marginBottom:20 }}onPress={this.ImageShow.bind(this)}>
                   <Image
                      source={{uri: this.state.avatarSource}}
                      style={{borderRadius: 30, height: 100, width: 100}}
                    />
                </TouchableOpacity>
                <Text style={styles.subHeadingSetting}>Profile Setting:</Text>
                <View style={styles.habitProp}>
                  <Text style={styles.textst}>User Name: {dummyUserData.user.username}</Text>
                  <Text style={styles.textst}> Email: {this.state.email}
                    <Icon onPress={() => AlertIOS.prompt('Type Your Email', null, this._saveResponse)} name='pencil' style={{fontSize: 15, color: 'red'}}/>
                  </Text>
                  <Text style={styles.textst}>Facebook: {dummyUserData.user.facebook}</Text>
                  <Text style={styles.textst}>Full Name: {dummyUserData.user.fullname}</Text>
                </View>
              </View>
              <View style={styles.habitWrap}>
                <Text style={styles.subHeadingSetting}>Habit Setting:</Text>
                <View style={styles.habitProp}>
                  <View style={styles.habitRow}>
                    <Text style={styles.textst}>Notification For All Habits:   </Text>
                    <Switch value={this.state.notification} onValueChange={this._toggleNotification}
                      onTintColor="#00ff00"
                      style={styles.switchSt}
                      thumbTintColor="#0000ff"
                      tintColor="#ff0000"
                    />
                  </View>
                  <View style={styles.habitRow}>
                    <Text style={styles.textst}>Make All Habit Private:         </Text>
                    <Switch value={this.state.allPrivate} onValueChange={this._toggleAllPrivate}
                      onTintColor="#00ff00"
                      style={styles.switchSt}
                      thumbTintColor="#0000ff"
                      tintColor="#ff0000"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
    }
    //the following codes are for profile Image functionality
    ImageShow() {
      ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          avatarSource: response.uri
        });
      }
    });
    }
}

const styles = StyleSheet.create({
  pageView: {
    marginTop: 10,
    padding: 4,
  },
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    justifyContent: 'center',
    marginTop: 10,
    padding:20,
  },
  headingText: {
    fontFamily: 'Cochin',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  subHeadingSetting: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    fontSize: 19,
    fontWeight: '300',
  },
  habitWrap: {
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 0.5,
    marginTop: 10,
    alignItems: 'flex-start',
    borderColor: '#d6d7da',
  },
  habitProp: {
    padding: 10,
    justifyContent: 'space-around',
  },
  habitRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  textst: {
    fontFamily: 'Georgia-Italic',
    marginBottom: 10,
    fontSize: 15,
  },
  switchSt: {
    transform: [{scaleX: .75}, {scaleY: .75}],
  }
});
