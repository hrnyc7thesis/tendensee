import React, { Component } from 'react';
import { ScrollView, Text, Alert, View, Image, StyleSheet, Switch, TouchableOpacity, Picker, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const ImagePicker = require('react-native-image-picker');
import Snackbar from 'react-native-snackbar';
import {ActionCreators} from '../Actions/ActionCreators';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { MY_IP } from './../myip';
import Prompt from 'react-native-prompt';
import colors from '../ColorPalette.js';
import BackNav from '../Components/BackNav';
import TitleNav from '../Components/TitleNav';
import NavigationBar from 'react-native-navbar';

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
    language:  'English',
    promptVisible: false
  }
}

handlePhoto = (photo) => {
  this.props.updatePhoto(photo, this.props.user, this.props.habits);
};

toggleNotification = () => {
  this.setState({notification: !this.state.notification}, this.sendNotificationUpdate)
  Snackbar.show({
    backgroundColor: this.state.notification ? '#0277bd' : '#58a5f0',
    title: this.state.notification ? 'All Notifications Turned OFF' : 'All Notifications Turned ON',
    duration: Snackbar.LENGTH_SHORT,
  });
};

sendNotificationUpdate = () =>{
  this.props.handleNotification(this.state.notification, this.props.user, this.props.habits);
};

sendPrivateUpdate = () =>{
  this.props.handlePrivate(this.state.allPrivate, this.props.user, this.props.habits);
};

toggleAllPrivate = () => {
  this.setState({allPrivate: !this.state.allPrivate }, this.sendPrivateUpdate);
  Snackbar.show({
    backgroundColor: this.state.allPrivate ? '#0277bd' : '#58a5f0',
    title: this.state.allPrivate ? 'All Habits Set Private' : 'All Habits Set Public',
    duration: Snackbar.LENGTH_SHORT,
  });
};

isValidateEmail(promptValue){
  var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.test(promptValue);
};

updateEmail = (newEmail) => {
    this.setState({ email: newEmail });
    this.props.updateEmail(newEmail, this.props.user, this.props.habits);
};

render() {
    return(
      <View style= {styles.pageView}>
      <StatusBar hidden={true} />
        <NavigationBar
          statusBar={{hidden:true}}
          tintColor={colors.primaryDark}
          title={<TitleNav
                        title={'Settings'}
          style={{marginTop:4}}
                        style={{ fontWeight: 'bold', fontSize: 18, color: colors.primaryText }}
                      />}
          leftButton={<BackNav
                        style={{ marginLeft: 14, marginTop:6, color: colors.primaryText }}
                        onPress={() => {Actions.camera()}}
                      />}
        />
        <View style={styles.container}>
          <View style={{alignItems: 'flex-start'}}>
            <Icon style={{color: '#cfd8dc', fontSize: 17 }} size={15} name='arrow-left' onPress={() => {Actions.images()}}/>
          <Text style={styles.headingText}>Setting</Text>
         </View>
          <View style={styles.profileWrap}>
            <TouchableOpacity style={{alignSelf:'center', marginBottom:20 }} onPress={this.ImageShow.bind(this)}>
               <Image
                  source={{uri:`${this.props.user.photo}` || 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'}}
                  style={{borderRadius: 30, height: 100, width: 100}}
                />
                <Text style={{fontSize: 12}}>Set Profile Image</Text>
            </TouchableOpacity>
            <Text style={styles.subHeadingSetting}>Profile Setting:</Text>
            <View style={styles.habitProp}>
              <Text style={styles.textst}>User Name: {this.props.user.username}</Text>
              <View style={{  flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textst}>Email: {this.state.email}  </Text>
                <Icon name='pencil' style={{fontSize: 15, color: 'red'}} onPress={() => this.setState({ promptVisible: true })}/>
              </View>
              <Prompt
                title="Type your Email"
                placeholder="Start typing"
                defaultValue={this.state.email}
                visible={this.state.promptVisible}
                onCancel={() => this.setState({ promptVisible: false})}
                onSubmit={(value) => this.isValidateEmail(value) ? this.setState({promptVisible: false}, this.updateEmail(value)): Alert.alert("Invalid email! please try again")}
              />
              <Text style={styles.textst}>Facebook: {this.props.user.facebook_name}</Text>
            </View>
          </View>
          <View style={styles.habitWrap}>
            <Text style={styles.subHeadingSetting}>Habit Setting:</Text>
            <View style={styles.habitProp}>
              <View style={styles.habitRow}>
                <Text style={styles.textst}>Notification For All Habits:    </Text>
                <Switch value={this.state.notification} onValueChange={this.toggleNotification}
                  onTintColor="#0277bd"
                  style={styles.switchSt}
                  thumbTintColor="#f05545"
                  tintColor="#ff0000"
                />
              </View>
              <View style={styles.habitRow}>
                <Text style={styles.textst}>Make All Habit Private:         </Text>
                <Switch value={this.state.allPrivate} onValueChange={this.toggleAllPrivate}
                  onTintColor="#0277bd"
                  style={styles.switchSt}
                  thumbTintColor="#f05545"
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
    backgroundColor: '#0277bd',
    marginTop: 10,
    padding: 4,
  },
  container: {
    borderRadius: 4,
    backgroundColor: '#0277bd',
    borderColor: '#d6d7da',
    justifyContent: 'center',
    marginTop: 10,
    padding:16.5,
  },
  headingText: {
    fontFamily: 'Arial',
    fontSize: 25,
    fontWeight: '400',
    alignSelf:'center'
  },
  subHeadingSetting: {
    fontSize: 19,
    fontFamily: 'Arial',
    fontWeight: '300',
    alignSelf: 'flex-start',
  },
  profileWrap: {
    borderRadius: 11,
    backgroundColor: '#cfd8dc',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    width: 334,
    height: 300,
    alignItems: 'flex-start',
    borderColor: '#7f0000',
  },
  habitWrap: {
    borderRadius: 11,
    backgroundColor: '#cfd8dc',
    justifyContent: 'space-around',
    padding: 20,
    // borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: 334,
    height: 230,
    alignItems: 'flex-start',
    borderColor: '#7f0000',
  },
  habitProp: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  habitRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  textst: {
    fontFamily: 'Arial',
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 10,

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
