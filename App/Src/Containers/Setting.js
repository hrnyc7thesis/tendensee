import React, { Component } from 'react';
import { ScrollView, Alert, View, Image } from 'react-native';
import { Container, Tab, Tabs, TabHeading, Card, CardItem, logo, Text, Header, Title, Switch, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Thumbnail } from 'native-base';

const dummyUserData = {
    "user": {
      "fullname": "User object doesn't include name Yet!",
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
  trueSwitchIsOn: true,
  falseSwitchIsOn: false,
};
    render() {
        return (
            <Container>
            <Header hasTabs/>
            <Tabs>
              {/* This is for profile setting*/}
                <Tab heading={ <TabHeading><Icon name="person" /><Text>Profile</Text></TabHeading>}>
                <Content>
                  <Right>
                    <Thumbnail size={80} source={{uri: 'https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg'}} />
                    <Text>{dummyUserData.user.username}</Text>
                 </Right>
                    <Button transparent style={{backgroundColor: '#8686CA'}} onPress={onButtonPress} small dark iconLeft>
                      <Icon name='settings'/>
                      <Text>Edit</Text>
                   </Button>
                   <Text>Full Name : {dummyUserData.user.fullname}</Text>
                   <Text>Profile Name : {dummyUserData.user.username}</Text>
                   <Text>Email : {dummyUserData.user.email}</Text>
                </Content>
                </Tab>

                {/*The following code is habit setting*/}

                <Tab heading={ <TabHeading><Text>Habits</Text></TabHeading>}>
                  {dummyUserData.habits.map(habit => {
                    return (
                      <Card >
                      <CardItem>
                        <Left>
                           <Body>
                            <Text>{habit.name}</Text>
                            <Text note>Lets Improve Another Day!</Text>
                          </Body>
                        </Left>
                        <Right>
                         <Switch value={true} />
                        </Right>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-s/04/b9/12/9a/fairfield-inn-suite-rdu.jpg'}}/>
                        </CardItem>
                        <CardItem>
                            <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text>12 Likes</Text>
                            </Button>
                            <Button transparent>
                                <Icon active name="chatbubbles" />
                                <Text>4 Comments</Text>
                            </Button>
                            <Text>11h ago</Text>
                      </CardItem>
                  </Card>)
                })}
                </Tab>
            </Tabs>
            </Container>
        );
    }
}
<Right>
   <Switch value={true} />
</Right>
