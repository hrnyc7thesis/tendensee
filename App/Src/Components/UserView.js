import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { Container , Button, Icon, Tabs, Tab, TabHeading, H1, H2, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Friend from './FriendsListItem';

const { width } = Dimensions.get('window');
const photoWidth = (width - 2 * 10 - 2 * 2 - 4 * 5) / 3;

class UserView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFriendsText: '',
    }
  }

  _setSearchFriendsText = (text) => {
    this.setState({ searchFriendsText: text });
  }

  _changeVisibleUser = () => {
    this.props.changeVisibleUser(this.props.self.user.id);
  }

  render() {
    return (
      <Container>
        <View style={styles.screenAboveTabs}>
          <View style={styles.topRowContainer}>
            <View style={styles.leftButtonContainer}>
              {this.props.isSelf ? (
                <Button style={{alignSelf: 'flex-start'}} dark transparent iconCenter onPress={() => {Actions.setting()}}>
                  <Icon name='settings' />
                </Button>
              ) : (
                <Button dark transparent iconCenter onPress={() => {this._changeVisibleUser()}}>
                  <Icon name='arrow-back' />
                </Button>
              )}
            </View>
            <View style={styles.userPictureContainer}>
              <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/back-to-the-future/512/marty-mcfly-512.png'}} style={styles.userImage}/>
            </View>
            <View style={styles.rightButtonContainer}>
              {this.props.isSelf ? (
                <Button style={{alignSelf: 'flex-end'}} dark transparent iconCenter onPress={() => {Actions.camera()}}>
                  <Icon name='arrow-forward' />
                </Button>
              ) : (
                <Button dark transparent iconCenter></Button>
              )}
            </View>
          </View>
          <View style={styles.usernameContainer}>
            <Text style={styles.usernameText}>{this.props.user.user ? this.props.user.user.username : null}</Text>
          </View>
          <View style={styles.taglineContainer}>
            <Text style={styles.taglineText}>{this.props.user.user ? this.props.user.user.tagline : null}</Text>
          </View>
        </View>
        <Tabs>
         <Tab heading={ <TabHeading><Text>Photos</Text></TabHeading>}>
          <ScrollView>
            <View style={styles.habitImages}>
            {this.props.images.length === 0 ? (
              <View style={styles.noImagesView}>
                <H3 style={{color: '#cccccc', flex: 1, alignSelf: 'center'}}>No images :/</H3>
              </View>
            ) : (
              this.props.images.map(image => {
                return (<Image source={{uri: image}} style={styles.habitImage}/>)
              })
            )}
            </View>
          </ScrollView>
         </Tab>
         <Tab heading={ <TabHeading><Text>Friends</Text></TabHeading>}>
          <View style={styles.friendsTabContainer}>
            {this.props.isSelf && (
              <View style={styles.friendSearchFormAndButton}>
                <View style={styles.friendSearchFormContainer}>
                  <TextInput style={styles.textInput} placeholder='Search' value={this.state.searchFriendsText} onChangeText={(text) => {this._setSearchFriendsText(text)}} />
                </View>
                <View style={styles.addFriendsButtonContainer}>
                    <Button transparent info iconLeft onPress={() => {this.props.openModal()}}>
                      <Icon name='add-circle' />
                    </Button>
                </View>
              </View>
            )}
            <ScrollView style={styles.currentFriendsListContainer}>
              {this.props.friends ? (
                this.props.friends.length === 0 ? (
                  <View style={styles.noFriendsView}>
                    <H3 style={{color: '#cccccc'}}>No friends yet :(</H3>
                  </View>
                ) : (
                  this.props.allUsers
                  .filter(user => {
                    return this.props.friends.includes(user.id);
                  })
                  .filter(user => {
                    return user.username.toLowerCase().includes(this.state.searchFriendsText.toLowerCase());
                  })
                  .map(user => {
                    return (
                      <Friend key={user.id} isModalVisible={false} user={user} changeVisibleUser={this.props.changeVisibleUser} deleteFriend={this.props.deleteFriend} isSelf={this.props.isSelf} closeModal={this.props.closeModal}/>
                    )
                  })
                )
              ) : (
                null
              )}
            </ScrollView>
          </View>
         </Tab>
        </Tabs>
      </Container>
    )
  }
}

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
  leftButtonContainer: {
    flex: 1
  },
  userPictureContainer: {
    flex: 1,
    height: 85,
  },
  rightButtonContainer: {
    flex: 1
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
  noImagesView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 30,
    flex: 1
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
  noFriendsView: {
    alignItems: 'center',
    marginTop: 20
  },
})

export default UserView;
