import React, { Component } from 'react';
import { ScrollView, Text, Alert, View, Image, StyleSheet, Switch } from 'react-native';
import { Container } from 'native-base';

const dummyUserData = {
    "user": {
      "fullname": "Yet!",
      "id": 101,
      "username": "Deb123",
      "email": "debasishbd@outlook.com",
      "facebook": "dave mozumder",
      "profileImg": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
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

const onButtonPress = () =>{
  Alert.alert("button pressed")
}



//key={habit.id} habit={habit}

export default class UserSettings extends Component {
  state = {
    notification: true,
    allPrivate: false,

  };
  _toggleNotification = () => {
    this.setState({notification: !this.state.notification});
  };
  _toggleAllPrivate = () => {
    this.setState({allPrivate: !this.state.allPrivate});
  };

    render() {
        return (
          <View style= {styles.pageView}>
            <View style={styles.container}>
              <Text style={styles.headingText}>Setting</Text>
              <View style={styles.habitWrap}>
                <Text style={styles.habitSetting}>Profile Setting:</Text>
                <View style={styles.habitProp}>
            {/* I need to stylet this text with one style */}
                  <Text style={styles.textst}>User Name: {dummyUserData.user.username}</Text>
                  <Text style={styles.textst}>Email: {dummyUserData.user.email}</Text>
                  <Text style={styles.textst}>Facebook: {dummyUserData.user.facebook}</Text>
                  <Text style={styles.textst}>Full Name: {dummyUserData.user.fullname}</Text>
                </View>
              </View>
              <View style={styles.habitWrap}>
                <Text style={styles.habitSetting}>Habit Setting:</Text>
                <View style={styles.habitProp}>
                  <View style={styles.row}>
                    <Text style={styles.textst}>Notification For All Habits:   </Text>
                    <Switch value={this.state.notification} onValueChange={this._toggleNotification}
                      onTintColor="#00ff00"
                      style={styles.switchSt}
                      thumbTintColor="#0000ff"
                      tintColor="#ff0000"
                    />
                  </View>
                  <View style={styles.row}>
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
    // flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    // flexDirection: 'row',
    // margin: 100,
    marginTop: 10,
    padding:20,
    // borderRadius: 10,
    // alignSelf: 'center',
  },
  headingText: {
    fontFamily: 'Cochin',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  habitSetting: {
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
  row: {
  alignItems: 'center',
  // flex: 1,
  flexDirection: 'row',
  marginBottom: 20,
  },
  textst: {
    fontFamily: 'Georgia-Italic',
    marginBottom: 10,
    fontSize: 15,
  },
  switchSt: {
    marginBottom: 10,
    transform: [{scaleX: .75}, {scaleY: .75}],
  }
});
