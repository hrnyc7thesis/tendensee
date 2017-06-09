import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Text, ScrollView, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { Button, Card, Form, Item, Input, H1, H3, CardItem, Body, CheckBox, Icon } from 'native-base';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ActionCreators } from './../Actions/ActionCreators';
import HabitsListContainer from './HabitsListContainer.js';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import Camera from './Camera';
import BackNav from '../Components/BackNav';
import AddNav from '../Components/AddNav';
import TitleNav from '../Components/TitleNav';
import NavigationBar from 'react-native-navbar';



class Habits extends Component {

  constructor (props) {
    super (props);
    this.state = {
      //Modal
      animationType: 'slide',
      isModalVisible: false,
      isModalTransparent: false,
      //Add Habit
      habitName: '',
      habitCategory: '',
      buttonOpacities: [.5, .5, .5, .5, .5, .5, .5, .5, .5],
      isReminderChecked: false,
      reminderTime: null,
      isPrivate: false
    }
  }

  _openModal = () => {
    this.setState({ isModalVisible: true });
  }

  _showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  }

  _hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  }

  _handleTimePicked = (time) => {
    this._hideTimePicker();
    this.setState({ isReminderChecked: true, reminderTime: time});
  }

  _removeReminder = () => {
    this.setState({ isReminderChecked: false, reminderTime: null });
  }

  _closeModal = () => {
    this.setState({
      habitName: '',
      habitCategory: '',
      buttonOpacities: [.5, .5, .5, .5, .5, .5, .5, .5, .5],
      isReminderChecked: false,
      reminderTime: null,
      isModalVisible: false
    });
  }

  _submitHabit = () => {
    let habit = {
      name: this.state.habitName,
      type: this.state.habitCategory,
      notification: this.state.reminderTime,
    };
    if (habit.type) {
      console.log('habit.type',habit.type)
      this.props.addHabit(this.props.user, habit);
      this._closeModal();
    } else {
      Alert.alert('Please select one category!')
    }
  }

  _selectCategory(id, category) {
  let highlights = [.5, .5, .5, .5, .5, .5, .5, .5];
  highlights[id] = 1;
  this.setState({buttonOpacities: highlights, habitCategory: category});
}

  _setHabitName(text) {
    this.setState({habitName: text});
  }

  onSwipeRight() {
    this.props.user.habits.length ? Actions.camera() : Alert.alert('Please Add a Habit to Access the Camera!');
  }

  onSwipeLeft() {
    // Actions.individualHabit();
  }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    const colors = {
              primary: '#0277bd',
              secondary: '#58a5f0',
              primaryDark: '#004c8c',
              secondary: '#cfd8dc',
              secondaryLight: '#ffffff',
              secondaryDark: '#9ea7aa',
              primaryText: '#ffffff',
              secondaryText: '#000000',
              background: '#f5f5f6'
            }

    const noHabitText = this.props.user.habits.length ? '' : 'Add a new habit to get started!'
    const noHabitStyle = {};
    noHabitStyle.display = this.props.user.habits.length ? 'none' : 'flex';

    let toDiplay;
    if (this.props.user.habits.length) {
      toDisplay = <View style={styles.container}>
        <HabitsListContainer />
      </View>
    } else {
      toDisplay = <View style={[styles.noHabitText, noHabitStyle]}>
        <H3>{noHabitText}</H3>
      </View>
    }

    return (

      <Swiper index={1} loadMinimal={true} loadMinimalSize={0} loop={false} showsPagination={false} showsButtons={false}>
      <Camera />
      <View style={styles.habitsPageContainer}>
      <StatusBar hidden={true} />
        <NavigationBar
          statusBar={{hidden:true}}
          tintColor={colors.primaryDark}
          title={<TitleNav
                        title={'tenden|see'}
                        style={{ fontWeight: 'bold', marginTop:4, fontSize: 18, color: colors.primaryText }}
                      />}
          leftButton={<BackNav
                        style={{ marginLeft: 14, marginTop:6, color: colors.primaryText }}
                        onPress={() => {Actions.camera()}}
                      />}
          rightButton={<AddNav
                        style={{ marginRight: 14, marginTop:6, color: colors.primaryText }}
                        onPress={() => {this._openModal()}}
                      />}
        />
        <View style={{flex:1}}>

          {toDisplay}
          {/* <View style={[styles.noHabitText, noHabitStyle]}>
            <H3>{noHabitText}</H3>
          </View>

          <View style={styles.container}>
            <HabitsListContainer />
          </View> */}

          {/* <View style={styles.addHabitButtonContainer}>
            <Button dark transparent onPress = {() => this._openModal()}>
              <Icon name='add-circle' style={{fontSize: 45}}/>
            </Button>
            <Text>(New habit)</Text>
          </View> */}

        </View>

        <Modal
          animationType={this.state.animationType}
          transparent={true}
          visible={this.state.isModalVisible}
          style={styles.modal}
          onRequestClose={() => {this._closeModal()}}>
              <View style={{alignItems: 'center', backgroundColor: colors.primaryDark}}>
                <H1 style={{fontWeight: 'bold', color: colors.primaryText}}>Add Habit</H1>
              </View>
              <View style={styles.formContainer}>
                <Form>
                  <Item regular>
                    <Input placeholder='Name:' style={{marginLeft: 10}} value={this.state.habitName} onChangeText={(text) => {this._setHabitName(text)}} />
                  </Item>
                </Form>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.buttonGrid}>
                  <View style={styles.buttonColumn}>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[0]}]}>
                      <Button style={{backgroundColor: colors.secondaryDark}} full onPress={() => {this._selectCategory(0, 'Fitness')}}>
                        <Text style={styles.buttonText}>Fitness</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[1]}]}>
                      <Button style={{backgroundColor: colors.secondaryDark}} full onPress={() => {this._selectCategory(1, 'Mindset')}}>
                        <Text style={styles.buttonText}>Mindset</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[2]}]}>
                      <Button style={{backgroundColor: colors.secondaryDark}} full onPress={() => {this._selectCategory(2, 'Diet')}}>
                        <Text style={styles.buttonText}>Diet</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[3]}]}>
                      <Button style={{backgroundColor: colors.secondaryDark}} full onPress={() => {this._selectCategory(3, 'Time Mgmt.')}}>
                        <Text style={styles.buttonText}>Time Mgmt.</Text>
                      </Button>
                    </View>
                  </View>
                  <View style={styles.buttonColumn}>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[4]}]}>
                      <Button style={{backgroundColor: colors.secondaryDark}} full onPress={() => {this._selectCategory(4, 'Study')}}>
                        <Text style={styles.buttonText}>Study</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[5]}]}>
                      <Button style={{backgroundColor: colors.secondaryDark}} full onPress={() => {this._selectCategory(5, 'Hygiene')}}>
                        <Text style={styles.buttonText}>Hygiene</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[6]}]}>
                      <Button style={{backgroundColor: colors.secondaryDark}} full onPress={() => {this._selectCategory(6, 'Sleeping')}}>
                        <Text style={styles.buttonText}>Sleeping</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[7]}]}>
                      <Button style={{backgroundColor: colors.secondaryDark}} full onPress={() => {this._selectCategory(7, 'Reading')}}>
                        <Text style={styles.buttonText}>Reading</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              <View style={{alignItems: 'center', marginTop: 15, flexDirection: 'row'}}>
                <Text style={styles.reminderText}>Send reminders?</Text>
                <CheckBox checked={this.state.isReminderChecked} onPress={() => { this.state.isReminderChecked ? this._removeReminder() : this._showTimePicker()}} />
              </View>
              <View style={{alignItems: 'stretch', marginTop: 15}}>
                  <Button style={{backgroundColor: colors.primary, width: 300}} full onPress={() => {this._submitHabit()}}>
                    <Text style={{color: colors.primaryText}}>Add</Text>
                  </Button>
              </View>
              <View style={{marginLeft:0, marginRight: 0, marginTop: 10}}>
                <Button transparent danger iconCenter onPress={this._closeModal}>
                  <Icon style={{color: colors.secondaryDark}} name='trash' />
                </Button>
              </View>
            </View>
            <DateTimePicker
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this._handleTimePicked}
              onCancel={this._hideTimePicker}
              mode={'time'}
              titleIOS={'Pick a time'}
            />
        </Modal>

        {/* <View style={styles.buttonsContainer}>
          <Button transparent onPress={() => {Actions.images()}}>
            <Icon style={{fontSize: 60, color: 'white'}} name="person" />
          </Button>
          <Button transparent onPress={() => Actions.camera()}>
            <Icon style={{fontSize: 60, color: 'white'}} name="radio-button-on" />
          </Button>
          <View style={{borderRadius: 25, borderBottomWidth: 2, borderBottomColor: '#4d4dff'}}>
            <Button transparent onPress={() => {Actions.habits()}}>
              <Icon style={{fontSize: 80, color: 'gray', opacity: 1}} name="list" />
            </Button>
          </View>
        </View> */}

      </View>
    </Swiper>
    );
  }
};

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  buttonsContainer: {
    borderRadius: 25,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(220, 220, 220, 0.8)',
    padding: 0,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gesture: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  habitsPageContainer: {
    flex: 1,
    // backgroundColor: colors.primary,
    justifyContent: 'flex-start'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0, //30, changed based on header
    // width: width,
    height: 700,
    alignSelf: 'center'
  },
  addHabitButtonContainer: {
    flex: -1,
    alignSelf: 'center'
  },
  card: {
    width: 400,
    backgroundColor: '#80dfff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formContainer: {
    flex: 0,
    alignSelf: 'stretch',
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonGrid: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch'
  },
  buttonColumn: {
    flexBasis: 0,
    flexGrow: 1
  },
  categoryButton: {
    alignSelf: 'stretch',
    margin: 5
  },
  buttonText: {
    color: colors.secondaryText,
    fontWeight: 'bold'
  },
  reminderText: {
    fontWeight: 'bold'
  },
  successButton: {
    flex: 1,
    alignSelf: 'stretch'
  },
  modal: {
    borderWidth: 2,
    borderColor: colors.primaryDark,
    flex: 0,
    alignItems: 'stretch',
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  noHabitText : {
    // marginTop: 300,
    position: 'relative',
    top: height / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userData,
    routes: state.routes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Habits);
