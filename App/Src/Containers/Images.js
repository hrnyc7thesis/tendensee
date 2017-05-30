import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, ScrollView, TextInput, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { Button, Card, Form, Item, Input, H1, H2, H3, CardItem, Body, CheckBox, Icon, Header, Tab, Tabs, TabHeading, Container, Content } from 'native-base';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { ActionCreators } from './../Actions/ActionCreators';
import Friend from './../Components/FriendsListItem';

const { width } = Dimensions.get('window');
const photoWidth = (width - 2 * 10 - 2 * 2 - 4 * 5) / 3;

class Images extends Component {
  constructor (props) {
    super (props);
    console.log('rendering');
    this.state = {
      //Modal
      animationType: 'slide',
      isModalVisible: false,
      isModalTransparent: false,
      //Add friend
      username: '',
      selectedFriends: [],
    }
  }

  _openModal = () => {
    this.setState({ isModalVisible: true });
  }


  _closeModal = () => {
    this.setState({
      username: '',
      isModalVisible: false
    });
  }

  _setUsername(text) {
    this.setState({ username: text });
  }

  _addFriendToList(id) {
    let tempSelectedFriends = this.state.selectedFriends;
    tempSelectedFriends.push(id);
    this.setState({
      selectedFriends: tempSelectedFriends
    });
  }

  _removeFriendFromList(id) {
    let tempSelectedFriends = this.state.selectedFriends;
    tempSelectedFriends.splice(tempSelectedFriends.indexOf(id), 1);
    this.setState({
      selectedFriends: tempSelectedFriends
    });
  }

  onSwipeLeft() {
    Actions.camera();
  }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      // <GestureRecognizer
      //   style={styles.gesture}
      //   onSwipeLeft={() => this.onSwipeLeft()}
      //   config={config}
      // >
        <Container>
          <View style={styles.screenAboveTabs}>
            <View style={styles.topRowContainer}>
              <View>
                <Button dark transparent iconCenter onPress={() => {Actions.camera()}}>
                  <Icon name='arrow-back' />
                </Button>
              </View>
              <View style={styles.userPictureContainer}>
                <Image source={{uri: users[0].user.picture}} style={styles.userImage}/>
              </View>
              <View>
                <Button dark transparent iconCenter>
                  <Icon name='settings' />
                </Button>
              </View>
            </View>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>{users[0].user.username}</Text>
            </View>
            <View style={styles.taglineContainer}>
              <Text style={styles.taglineText}>{users[0].user.quote}</Text>
            </View>
          </View>
         <Tabs>
           <Tab heading={ <TabHeading><Text>Photos</Text></TabHeading>}>
            <ScrollView>
              <View style={styles.habitImages}>
              {sampleImages.map(image => {
                return (
                    <Image source={{uri: image}} style={styles.habitImage}/>
                );
              })}
              </View>
            </ScrollView>
           </Tab>
           <Tab heading={ <TabHeading><Text>Friends</Text></TabHeading>}>
            <View style={styles.friendsTabContainer}>
              <View style={styles.friendSearchFormAndButton}>
                <View style={styles.friendSearchFormContainer}>
                  <TextInput style={styles.textInput} placeholder='Search' value={this.state.searchFriendsForm} onChangeText={(text) => {this._setSearchFriendsText(text)}} />
                </View>
                <View style={styles.addFriendsButtonContainer}>
                  <Button transparent info iconLeft onPress={this._openModal}>
                    <Icon name='add-circle' />
                  </Button>
                </View>
              </View>
              <View style={styles.currentFriendsListContainer}>
                {friends.length === 0 &&
                  <View style={{alignItems: 'center', marginTop: 20}}>
                    <H3 style={{color: '#cccccc'}}>No friends yet :(</H3>
                  </View>
                }
              </View>
              {/* <ScrollView style={styles.currentFriendsListContainer}>
                {
                  users
                  .filter(user => {
                    return user.user.username.toLowerCase().includes(this.state.username.toLowerCase());
                  })
                  .map(user => {
                    return (
                      <Friend key={user.id} user={user} _removeFriendFromList={this._removeFriendFromList.bind(this)} _addFriendToList={this._addFriendToList.bind(this)} />
                    )
                  })
                }
              </ScrollView> */}
            </View>
           </Tab>
         </Tabs>

         <View>
           <Modal
              animationType={this.state.animationType}
              transparent={this.state.transparent}
              visible={this.state.isModalVisible}
              onRequestClose={() => {this._closeModal()}}>
              <Card>
                <View style={styles.card}>
                  <View style={styles.addFriendsHeader}>
                    <H1>Add Friends</H1>
                  </View>
                  <View style={styles.formContainer}>
                    <Form>
                      <Item rounded>
                        <Input placeholder='Search..' value={this.state.username} onChangeText={(text) => {this._setUsername(text)}} />
                      </Item>
                    </Form>
                  </View>
                  <ScrollView style={styles.addFriendsListContainer}>
                    {
                      users
                      .filter(user => {
                        return user.user.username.toLowerCase().includes(this.state.username.toLowerCase());
                      })
                      .map(user => {
                        return (
                          <Friend key={user.id} user={user} _removeFriendFromList={this._removeFriendFromList.bind(this)} _addFriendToList={this._addFriendToList.bind(this)} />
                        )
                      })
                    }
                  </ScrollView>
                  <View style={styles.doneButtonContainer}>
                    <Button transparent onPress={this._closeModal}>
                      <Text style={{color: 'green'}}>DONE</Text>
                    </Button>
                  </View>
                </View>
              </Card>
            </Modal>
          </View>
        </Container>
      // </GestureRecognizer>
    );
  }
};

const styles = StyleSheet.create({
  screenAboveTabs: {
    backgroundColor: '#F8F8F8'
  },
  topRowContainer: {
    flexDirection: 'row',
    margin: 25,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  userPictureContainer: {
    flex: 1,
    height: 85,
  },
  userImage: {
    flex: 1,
    resizeMode: 'contain',
    marginTop: 20
  },
  usernameContainer: {
    alignSelf: 'center',
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  taglineContainer: {
    alignSelf: 'center',
  },
  taglineText: {
    fontStyle: 'italic',
    fontSize: 10
  },
  habitImages: {
    borderColor: '#f0f0f5',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  habitImage: {
    width: photoWidth,
    height: photoWidth,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
  friendsTabContainer: {
    flex: 1
  },
  friendSearchFormAndButton: {
    flexDirection: 'row',
  },
  friendSearchFormContainer: {
    borderColor: '#f0f0f5',
    borderWidth: 2,
    borderRadius: 30,
    margin: 15,
    marginBottom: 0,
    flex: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
  addFriendsButtonContainer: {
    marginLeft: -10,
    marginTop: 15,
  },
  currentFriendsListContainer: {
    flex: 8,
    borderColor: '#f0f0f5',
    borderWidth: 2,
    borderRadius: 10,
    margin: 15
  },
  card: {
    flex: 1,
    alignItems: 'center',
    margin: 15,
  },
  formContainer: {
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 5,
  },
  addFriendsListContainer: {
    alignSelf: 'stretch',
    flex: 4,
    borderColor: '#f0f0f5',
    borderWidth: 2,
    borderRadius: 10,
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);

const friends = [
];

const users = [
  {
    "user": {
      "id": 1,
      "username": "debnomite",
      "quote": 'Boom!',
      "picture": 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'
    }
  },
  {
    "user": {
      "id": 2,
      "username": "tcoc99",
      "quote": 'Life is like a box of chocolates...',
      "picture": 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'
    }
  },
  {
    "user": {
      "id": 3,
      "username": "gedyman",
      "quote": 'Float like a butterfly sting like a bee.',
      "picture": 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'
    }
  },
  {
      "user": {
        "id": 4,
        "username": "harv",
        "quote": "I cannot pitch",
        "picture": 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'
      }
  },
  {
      "user": {
        "id": 5,
        "username": "billyzane",
        "quote": "I have a child!",
        "picture": 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'
      }
  },
  {
      "user": {
        "id": 6,
        "username": "joeM",
        "quote": "do you want to catch those hands?",
        "picture": 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'
      }
  }
];

const sampleImages = [
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
  'https://www.ballparksofbaseball.com/wp-content/uploads/2016/03/citi_topv2.jpg',
]
