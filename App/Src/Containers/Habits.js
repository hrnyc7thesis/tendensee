import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Text, ScrollView, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { Button, Card, Form, Item, Input, H1, H3, CardItem, Body, CheckBox, Icon } from 'native-base';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ActionCreators } from './../Actions/ActionCreators';
import HabitsListContainer from './HabitsListContainer.js';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Actions } from 'react-native-router-flux';

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
      reminderTime: null
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
      notification: this.state.reminderTime
    };
    this.props.addHabit(this.props.user, habit);
    this._closeModal();
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

    const noHabitText = this.props.user.habits.length ? '' : '  Add a new habit to get started!'
    const noHabitStyle = {};
    noHabitStyle.display = this.props.user.habits.length ? 'none' : 'flex';

    return (
      <View style={styles.habitsPageContainer}>
        <GestureRecognizer
          style={styles.container}
          onSwipeRight={() => this.onSwipeRight()}
          onSwipeLeft={() => this.onSwipeLeft()}
          config={config}
        >
          <Text style={[styles.noHabitText, noHabitStyle]}>
            <H3>{noHabitText}</H3>
          </Text>

          <View style={styles.container}>
            <HabitsListContainer />
          </View>

          <View style={styles.addHabitButtonContainer}>
            <Button dark transparent onPress = {() => this._openModal()}>
              <Icon name='add-circle' style={{fontSize: 45}}/>
            </Button>
            <Text>(New habit)</Text>
          </View>
        </GestureRecognizer>

        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.isModalVisible}
          onRequestClose={() => {this._closeModal()}}>
          <Card>
            <View style={styles.card}>
              <CardItem>
                <H1>Add Habit</H1>
              </CardItem>
              <CardItem>
                <H3>Name your habit:</H3>
              </CardItem>
              <CardItem>
                <Body>
                  <View style={styles.formContainer}>
                    <Form>
                      <Item rounded>
                        <Input placeholder='Example: Eat veggies!' value={this.state.habitName} onChangeText={(text) => {this._setHabitName(text)}} />
                      </Item>
                    </Form>
                  </View>
                </Body>
              </CardItem>
              <CardItem>
                <H3>Classify your habit:</H3>
              </CardItem>
              <CardItem>
                <View style={styles.buttonGrid}>
                  <View style={styles.buttonColumn}>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[0]}]}>
                      <Button block onPress={() => {this._selectCategory(0, 'Fitness')}}>
                        <Text style={styles.buttonText}>Fitness</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[1]}]}>
                      <Button block onPress={() => {this._selectCategory(1, 'Mindset')}}>
                        <Text style={styles.buttonText}>Mindset</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[2]}]}>
                      <Button block onPress={() => {this._selectCategory(2, 'Diet')}}>
                        <Text style={styles.buttonText}>Diet</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[3]}]}>
                      <Button block onPress={() => {this._selectCategory(3, 'Time Mgmt.')}}>
                        <Text style={styles.buttonText}>Time Mgmt.</Text>
                      </Button>
                    </View>
                  </View>
                  <View style={styles.buttonColumn}>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[4]}]}>
                      <Button block onPress={() => {this._selectCategory(4, 'Study')}}>
                        <Text style={styles.buttonText}>Study</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[5]}]}>
                      <Button block onPress={() => {this._selectCategory(5, 'Hygiene')}}>
                        <Text style={styles.buttonText}>Hygiene</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[6]}]}>
                      <Button block onPress={() => {this._selectCategory(6, 'Sleeping')}}>
                        <Text style={styles.buttonText}>Sleeping</Text>
                      </Button>
                    </View>
                    <View style={[styles.categoryButton, {opacity: this.state.buttonOpacities[7]}]}>
                      <Button block onPress={() => {this._selectCategory(7, 'Reading')}}>
                        <Text style={styles.buttonText}>Reading</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </CardItem>
              <CardItem>
                <Text>Send reminders?</Text>
                <CheckBox checked={this.state.isReminderChecked} onPress={() => { this.state.isReminderChecked ? this._removeReminder() : this._showTimePicker()}} />
              </CardItem>
              <CardItem>
                <View style={styles.successButton}>
                  <Button block success onPress={() => {this._submitHabit()}}>
                    <Text style={styles.buttonText}>Add</Text>
                  </Button>
                </View>
              </CardItem>
              <CardItem>
                <Button transparent danger iconCenter onPress={this._closeModal}>
                  <Icon name='trash' />
                </Button>
              </CardItem>
            </View>
            <DateTimePicker
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this._handleTimePicked}
              onCancel={this._hideTimePicker}
              mode={'time'}
              titleIOS={'Pick a time'}
            />
          </Card>
        </Modal>

      </View>
    );
  }
};


const styles = StyleSheet.create({
  gesture: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  habitsPageContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  container: {
    flex: -1,
    justifyContent: 'center',
    padding: 20
  },
  addHabitButtonContainer: {
    flex: -1,
    alignSelf: 'center'
  },
  card: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  formContainer: {
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 5
  },
  buttonGrid: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 5
  },
  buttonColumn: {
    flexBasis: 0,
    flexGrow: 1
  },
  categoryButton: {
    margin: 5
  },
  buttonText: {
    color: 'white'
  },
  successButton: {
    flex: 1
  },
  noHabitText : {
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(Habits);
