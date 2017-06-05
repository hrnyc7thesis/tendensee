import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, ScrollView, TextInput, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { Button, Card, Form, Item, Input, H1, H2, H3, CardItem, Body, CheckBox, Icon, Tab, Tabs, TabHeading, Container } from 'native-base';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { ActionCreators } from './../Actions/ActionCreators';
import Friend from './../Components/FriendsListItem';
import UserView from './../Components/UserView';

class Images extends Component {
  constructor (props) {
    super (props);
    this.state = {
      animationType: 'slide',
      isModalVisible: false,
      isModalTransparent: false,
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

    return (
      // <GestureRecognizer
      //   style={styles.gesture}
      //   onSwipeLeft={() => this.onSwipeLeft()}
      //   config={config}
      // >
        <Container>
          <UserView
            isSelf={isSelf}
            self={this.props.user}
            user={this.props.visibleUser}
            friends={this.props.visibleUserFriends}
            allUsers={this.props.allUsers}
            openModal={this._openModal.bind(this)}
            deleteFriend={this._deleteFriend.bind(this)}
            images={images}
            changeVisibleUser={this._changeVisibleUser.bind(this)}
            changeVisibleUser={this._changeVisibleUser.bind(this)}
            closeModal={this._closeModal.bind(this)}
          />

          <View>
            <Modal
              animationType={this.state.animationType}
              transparent={this.state.transparent}
              visible={this.state.isModalVisible}
              onRequestClose={() => {this._closeModal()}}>
              <Card>
                <View style={styles.card}>
                  <View>
                    <H1>Add Friends</H1>
                  </View>
                  <View style={styles.formContainer}>
                    <Form>
                      <Item rounded>
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
              </Card>
            </Modal>
          </View>
        </Container>
      // </GestureRecognizer>
    );
  }
};

const styles = StyleSheet.create({
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
  },
  closeModalButton: {
    color: 'green',
  }
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
