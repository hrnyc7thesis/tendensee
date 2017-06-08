import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, ScrollView, TextInput, Dimensions, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { Button, Card, Form, Item, Input, H1, H2, H3, CardItem, Body, CheckBox, Icon, Tab, Tabs, TabHeading, Container } from 'native-base';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { ActionCreators } from './../Actions/ActionCreators';
import Friend from './../Components/FriendsListItem';
import UserView from './../Components/UserView';
import Camera from './Camera';
import Swiper from 'react-native-swiper';
import colors from './../ColorPalette';


class Images extends Component {
  constructor (props) {
    super (props);
    this.state = {
      animationType: 'slide',
      isModalVisible: false,
      isModalTransparent: true,
      searchedUsername: '',
      selectedFriends: [],
    }
  }

  componentWillMount () {
    this.props.getVisibleUser(this.props.user);
  }

  _changeVisibleUser = (id) => {
    this.props.getVisibleUser(this.props.user, id);
  }

  _deleteFriend = (id) => {
    this.props.deleteFriendAndUpdate(this.props.user, id);
    this.props.fetchUser(this.props.user.token);
  }

  _openModal = () => {
    this.setState({ isModalVisible: true });
  }

  _closeModal = () => {
    if (this.state.selectedFriends.length > 0) {
      this.props.addFriendsAndUpdate(this.props.user, this.state.selectedFriends);
      this.props.fetchUser(this.props.user.token);
    }
    this.setState({
      searchedUsername: '',
      selectedFriends: [],
      isModalVisible: false
    });
  }

  _setSearchedUsername = (text) => {
    this.setState({ searchedUsername: text });
  }

  _addFriendToList = (id) => {
    this.setState({
      selectedFriends: this.state.selectedFriends.concat(id)
    });
  }

  _removeFriendFromList = (id) => {
    this.setState({
      selectedFriends: this.state.selectedFriends.filter((f) => f !== id)
    });
  }

  _showUserHabitPhoto = (photo) => {
    this.props.showUserHabitPhoto(photo);
  }

  onSwipeLeft() {
    Actions.camera();
  }

  render() {

    let isSelf = false;
    if (this.props.visibleUser.user) {
      isSelf = (this.props.user.user.id === this.props.visibleUser.user.id) ? true : false;
    }

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    const images = this.props.visibleUser.habits ?
    this.props.visibleUser.habits.reduce((acc, habit) => {
      return acc.concat(habit.dates.reduce((acc, date) => {
        return acc.concat(date.picture);
      }, []));
    }, [])
    : [];

    let photos = [];
    let habits = this.props.visibleUser.habits;
    if (habits) {
      habits.forEach(habit => {
        habit.dates.forEach(day => {
          photos.push({picture: day.picture, date: day.date, habitName: habit.name, habitType: habit.type})
        })
      })
    } else {
      photos = [];
    }

    return (
      <Swiper loop={false} showsPagination={false} showsButtons={false}>
        <Container>
          <StatusBar hidden={true} />
          <UserView
            isSelf={isSelf}
            self={this.props.user}
            user={this.props.visibleUser}
            friends={this.props.visibleUserFriends}
            allUsers={this.props.allUsers}
            openModal={this._openModal.bind(this)}
            deleteFriend={this._deleteFriend.bind(this)}
            images={photos}
            // images={images}
            // changeVisibleUser={this._changeVisibleUser.bind(this)}
            changeVisibleUser={this._changeVisibleUser.bind(this)}
            closeModal={this._closeModal.bind(this)}
            onPressPhoto={this._showUserHabitPhoto.bind(this)}
          />
          <View style={styles.buttonsContainer}>
            <View style={{borderRadius: 25, borderBottomWidth: 3, borderBottomColor: 'white', paddingBottom: 2}}>
              <Button transparent onPress={() => {Actions.images()}}>
                <Icon style={{fontSize: 50, color: 'white', opacity: 1}} name="person" />
              </Button>
            </View>
            <Button transparent onPress={() => Actions.camera()}>
              <Icon style={{fontSize: 40, color: 'white', marginLeft: 0, marginBottom: -5}} name="radio-button-on" />
            </Button>
            <Button transparent onPress={() => {Actions.habits()}}>
              <Icon style={{fontSize: 40, color: 'white'}} name="list" />
            </Button>
          </View>

          <View>
            <Modal
              animationType={this.state.animationType}
              transparent={false}
              visible={this.state.isModalVisible}
              onRequestClose={() => {this._closeModal()}}
              style={styles.modal}>
              {/* <Card> */}
                <View style={styles.card}>
                  <View>
                    <H1 style={{color: colors.secondaryText, fontWeight: 'bold', marginBottom: 5}}>Add Friends</H1>
                  </View>
                  <View style={styles.formContainer}>
                    <Form style={{marginLeft: 0}}>
                      <Item regular style={{marginLeft: 5, marginRight: 5, backgroundColor: colors.primaryText}}>
                        <Input placeholder='Search..' value={this.state.searchedUsername} onChangeText={(text) => {this._setSearchedUsername(text)}} />
                      </Item>
                    </Form>
                  </View>
                  <ScrollView style={styles.addFriendsListContainer}>
                    {this.props.visibleUserFriends ? (
                      this.props.allUsers
                      .filter(user => {
                        return !this.props.visibleUserFriends.includes(user.id);
                      })
                       .filter(user => {
                        return user.username.toLowerCase().includes(this.state.searchedUsername.toLowerCase());
                      })
                      .map(user => {
                        return (
                          <Friend key={user.id}
                            isModalVisible={true}
                            user={user}
                            changeVisibleUser={this._changeVisibleUser.bind(this)}
                            removeFriendFromList={this._removeFriendFromList.bind(this)}
                            addFriendToList={this._addFriendToList.bind(this)}
                            closeModal={this._closeModal.bind(this)}
                          />
                        )
                      })
                    ) : (
                      null
                    )}
                  </ScrollView>
                  <View>
                    <Button transparent onPress={() => {this._closeModal()}}>
                      <Text style={styles.closeModalButton}>DONE</Text>
                    </Button>
                  </View>
                </View>
              {/* </Card> */}
            </Modal>
          </View>
        </Container>
        <Camera />
      </Swiper>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    flex: 1,
    padding: 15,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'space-around',
  },
  modal: {
    backgroundColor: colors.secondaryDark,
    margin: 0,
  },
  // modal: {
  //   borderWidth: 2,
  //   borderColor: 'black',
  //   borderRadius: 15,
  //   flex: 0,
  //   alignItems: 'center',
  //   marginTop: 'auto',
  //   marginBottom: 'auto',
  //   justifyContent: 'space-around',
  //   backgroundColor: 'white'
  // },
  formContainer: {
    flex: 0,
    alignSelf: 'stretch',
    margin: 0,
    marginTop: 5,
    paddingLeft: 0,
    borderRadius: 1,
    borderColor: colors.secondaryDark,
  },
  addFriendsListContainer: {
    alignSelf: 'stretch',
    flex: 0,
    // borderColor: '#f0f0f5',
    // borderWidth: 2,
  },
  closeModalButton: {
    color: colors.primary,
  },
  gesture: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  buttonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
    borderRadius: 0,
    alignSelf: 'stretch',
    backgroundColor: colors.primaryDark,
    paddingTop: 5,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userData,
    visibleUser: state.visibleUser.visibleUserData,
    visibleUserFriends: state.visibleUser.visibleUserData.friends,
    allUsers: state.user.userData.allUsers,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);
