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

  componentWillMount() {
    this.props.getFriends(this.props.user);
  }

  _deleteFriend = (id) => {
    this.props.deleteFriendAndUpdate(this.props.user, id);
  }

  _openModal = () => {
    this.setState({ isModalVisible: true });
  }


  _closeModal = () => {
    if (this.state.selectedFriends.length > 0) {
      this.props.addFriendsAndUpdate(this.props.user, this.state.selectedFriends);
    }
    this.setState({
      username: '',
      selectedFriends: [],
      isModalVisible: false
    });
  }

  _setUsername(text) {
    this.setState({ username: text });
  }

  _addFriendToList(id) {
    this.setState({
      selectedFriends: this.state.selectedFriends.concat(id)
    });
  }

  _removeFriendFromList(id) {
    this.setState({
      selectedFriends: this.state.selectedFriends.filter((f) => f !== id)
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

    const images = this.props.user.habits.reduce((acc, habit) => {
      return acc.concat(habit.dates.reduce((acc, date) => {
        return acc.concat(date.picture);
      }, []));
    }, []);

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
                <Button dark transparent iconCenter onPress={() => {Actions.setting()}}>
                  <Icon name='settings' />
                </Button>
              </View>
              <View style={styles.userPictureContainer}>
                <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'}} style={styles.userImage}/>
              </View>
              <View>
                <Button dark transparent iconCenter onPress={() => {Actions.camera()}}>
                  <Icon name='arrow-forward' />
                </Button>
              </View>
            </View>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>{this.props.user.user.username}</Text>
            </View>
            <View style={styles.taglineContainer}>
              <Text style={styles.taglineText}>{this.props.user.user.tagline}</Text>
            </View>
          </View>
         <Tabs>
           <Tab heading={ <TabHeading><Text>Photos</Text></TabHeading>}>
            <ScrollView>
              <View style={styles.habitImages}>
              {images.map(image => {
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
              <ScrollView style={styles.currentFriendsListContainer}>
                {this.props.friends.length === 0 ?
                  <View style={{alignItems: 'center', marginTop: 20}}>
                    <H3 style={{color: '#cccccc'}}>No friends yet :(</H3>
                  </View>
                :
                  this.props.allUsers
                  .filter(user => {
                    return this.props.friends.includes(user.id);
                  })
                  .filter(user => {
                    return user.username.toLowerCase().includes(this.state.username.toLowerCase());
                  })
                  .map(user => {
                    return (
                      <Friend key={user.id} isModalVisible={false} user={user} deleteFriend={this._deleteFriend.bind(this)} _addFriendToList={this._addFriendToList.bind(this)} />
                    )
                  })
                }
              </ScrollView>
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
                      this.props.allUsers
                      .filter(user => {
                        return !this.props.friends.includes(user.id);
                      })
                      .filter(user => {
                        return user.username.toLowerCase().includes(this.state.username.toLowerCase());
                      })
                      .map(user => {
                        return (
                          <Friend key={user.id} isModalVisible={true} user={user} _removeFriendFromList={this._removeFriendFromList.bind(this)} _addFriendToList={this._addFriendToList.bind(this)} />
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
    user: state.user.userData,
    allUsers: state.friends.allUsers,
    friends: state.friends.friends,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);
