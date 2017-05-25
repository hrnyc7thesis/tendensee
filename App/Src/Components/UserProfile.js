import React, { PropTypes, Component } from 'react'
import { Text, Icon, View, Button, StyleSheet, Alert, Heading, Animated } from 'react-native';
// import { Button } from 'react-native-elements';

const dummyUserData = {
    "user": {
      "fullname": "User object doesn't include name Yet!",
      "id": 101,
      "username": "deb123",
      "email": "debasishbd@outlook.com",
      "facebook": "dave mozumder"
    },
    "habits": [
      {
        "id": 12,
        "name": "exercise",
        "description": "I will workout every other day for next one month, wish me good luck fellas",
        "type": "gym",
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
        "name": "study",
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
// in the future we would need to pass the user object to this profile function as input
//right now just using dummyUserData object in this page;

const Profile = () => (
  <View style={styles.userview}>
    <View style={styles.buttonStyles}>
    <Button
    onPress= {onButtonPress}
    title="Edit Profile"
    />
    </View>
     <Text style={styles.textStyle}>
            Full Name : {dummyUserData.user.fullname}
     </Text>
     <Text style={styles.textStyle}>
            Profile Name : {dummyUserData.user.username}
     </Text>
     <Text style={styles.textStyle}>
            Email : {dummyUserData.user.email}
     </Text>
      {/* <Heading>$250.00</Heading> */}
  </View>
)

const styles = StyleSheet.create({
  userview: {
    backgroundColor: 'skyblue',
    flex: 0.5,
    // alignItems: "center",
  },
  buttonStyles:{
    // backgroundColor: '#2E9298',
    // borderRadius: 10,
    // padding: 5,
    // shadowColor: '#000000',
  //   shadowOffset: {
  //   width: 0,
  //   height: 3
  // },
  shadowRadius: 10,
  shadowOpacity: 0.25
  },
  textStyle:{
    padding: 4,
  }
});

export default Profile
