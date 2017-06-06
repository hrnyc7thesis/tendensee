import React, { Component } from 'react';
import { ScrollView, Text, Alert, View, Image, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const ImagePicker = require('react-native-image-picker');
import Snackbar from 'react-native-snackbar';
import {ActionCreators} from '../Actions/ActionCreators';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { MY_IP } from './../myip';
import Prompt from 'react-native-prompt';

const options = {
  title: 'Select Photo',
  quality: .2,
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
    {name:'instagram', title: 'Choose Photo from Instagram'}
  ],
  storageOptions: {
    skipBackup: false,
    path: 'images'
  }
};

class UserSettings extends Component {
  constructor(props){
  super(props);
  this.state = {
    notification: this.props.user.notifications,// 1=true
    allPrivate: this.props.user.private,//0=false
    email: this.props.user.email,
    promptVisible: false
  }
}

handlePhoto = (photo) => {
  this.props.updatePhoto(photo, this.props.user, this.props.habits);
};

toggleNotification = () => {
  this.setState({notification: !this.state.notification}, this.sendNotificationUpdata)
  Snackbar.show({
    backgroundColor: this.state.notification ? '#AD1457' : '#4CAF50',
    title: this.state.notification ? 'Notifications Turned OFF' : 'Notifications Turned ON',
    duration: Snackbar.LENGTH_SHORT,
  });
};

sendNotificationUpdata = () =>{
  this.props.handleNotification(this.state.notification, this.props.user, this.props.habits);
}

sendPrivateUpdata = () =>{
  this.props.handlePrivate(this.state.allPrivate, this.props.user, this.props.habits);
}

toggleAllPrivate = () => {
  this.setState({allPrivate: !this.state.allPrivate }, this.sendPrivateUpdata);
  Snackbar.show({
    backgroundColor: this.state.allPrivate ? '#E91E63' : '#263238',
    title: this.state.allPrivate ? 'Private OFF' : 'All Habit Set To Private',
    duration: Snackbar.LENGTH_SHORT,
  });
};

validateAndSaveEmail = (promptValue) => {
  var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.test(promptValue)) {
    this.setState({ email: promptValue });
    this.props.updateEmail(promptValue, this.props.user, this.props.habits);
  } else {
    Alert.alert("Make sure your email is valid! Try Again!")
  }
};

render() {
    return(
      <View style= {styles.pageView}>
        <View style={styles.container}>
          <View style={{alignItems: 'flex-start'}}>
            <Icon size={15} name='arrow-left' onPress={() => {Actions.images()}}/>
          <Text style={styles.headingText}>Setting</Text>
         </View>
          <View style={styles.sectionWrap}>
            <TouchableOpacity style={{alignSelf:'center', marginBottom:20 }} onPress={this.ImageShow.bind(this)}>
               <Image
                  source={{uri: `${this.props.user.photo}` || 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'}}
                  style={{borderRadius: 30, height: 100, width: 100}}
                />
            </TouchableOpacity>
            <Text style={styles.subHeadingSetting}>Profile Setting:</Text>
            <View style={styles.habitProp}>
              <Text style={styles.textst}> User Name: {this.props.user.username}</Text>
              <Text style={styles.textst}> Email: {this.state.email}
                <Icon iconCenter onPress={() => this.setState({ promptVisible: true })} name='pencil' style={{fontSize: 15, color: 'red'}} />
              </Text>
              <Prompt
                title="Type your Email"
                placeholder="Start typing"
                defaultValue={this.state.email}
                visible={this.state.promptVisible}
                onCancel={() => this.setState({ promptVisible: false})}
                onSubmit={(value) => this.setState({ promptVisible: false}, this.validateAndSaveEmail(value))}
              />
              <Text style={styles.textst}>Facebook: {this.props.user.facebook_name}</Text>
            </View>
          </View>
          <View style={styles.sectionWrap}>
            <Text style={styles.subHeadingSetting}>Habit Setting:</Text>
            <View style={styles.habitProp}>
              <View style={styles.habitRow}>
                <Text style={styles.textst}>Notification For All Habits:   </Text>
                <Switch value={this.state.notification} onValueChange={this.toggleNotification}
                  onTintColor="#00ff00"
                  style={styles.switchSt}
                  thumbTintColor="#0000ff"
                  tintColor="#ff0000"
                />
              </View>
              <View style={styles.habitRow}>
                <Text style={styles.textst}>Make All Habit Private:         </Text>
                <Switch value={this.state.allPrivate} onValueChange={this.toggleAllPrivate}
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
        this.handlePhoto(response.data);
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
    backgroundColor: '#F5F5F5',
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
    fontSize: 19,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500'
  },
  sectionWrap: {
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-around',
    padding: 20,
    borderWidth: 1,
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
  },
  textst: {
    fontFamily: 'Georgia-Italic',
    marginBottom: 10,
    fontSize: 16,
  },
  switchSt: {
    transform: [{scaleX: .75}, {scaleY: .75}],
  }
});

const mapStateToProps = (state) =>{
  return {
    user: state.user.userData.user,
    habits:state.user.userData.habits,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
