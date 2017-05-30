import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Switch, Text, ScrollView, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { Container, Content, Button, Card, Form, Item, Header, Input, H1, H3, CardItem, Body, CheckBox, Icon } from 'native-base';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ActionCreators } from './../Actions/ActionCreators';
import HabitsListContainer from './HabitsListContainer.js';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Actions } from 'react-native-router-flux';
const moment = require ('moment')

class IndividualHabit extends Component {
  
  constructor (props) {
    super (props);
    this.state = {
      //Modal
      animationType: 'slide',
      isModalVisible: false,
      isModalTransparent: false,
      // Habit
      habitName: 'Habit Name',
      habitType: 'Habit Type',
      isReminderChecked: false,
      reminderTime: null,

    }
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

  render() {

    return (
      <View style={styles.container}>
        <View style={[styles.header, {paddingTop:30}]}>
          <H3>{this.state.habitName}</H3>
        </View>
        <View style={styles.header}>
          <Text>{this.state.habitType}</Text>
        </View>
        <View style={styles.reminder}>
          <View style={styles.reminder}>
            <H3>Reminder: </H3>
            <Button info onPress={() => { this.state.isReminderChecked ? this._removeReminder() : this._showTimePicker()}}>
              <Text>{this.state.reminderTime ? moment(this.state.reminderTime).format("h:mmA") : 'Inactive' }</Text>
            </Button>
          </View>
          <View>
            <Text>Private:</Text>
            <Switch value={this.state.isReminderChecked} onPress={() => { this.state.isReminderChecked ? this._removeReminder() : this._showTimePicker()}} />
          </View>
        </View>
        <Card>
          <View style={[styles.stats, {paddingTop:10}]}>
            <Text>Success Rate: </Text>
            <Text>7/10 (70%)</Text>
          </View>
          <View style={styles.stats}>
            <Text>Average Per Week: </Text>
            <Text>5 days</Text>
          </View>
          <View style={styles.stats}>
            <Text>Current Streak: </Text>
            <Text>0 days</Text>
          </View>
          <View style={styles.stats}>
            <Text>Longest Streak: </Text>
            <Text>0 days</Text>
          </View>

        </Card>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
          mode={'time'}
          titleIOS={'Daiy Reminder Time'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'grey',
  },
  reminder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'seashell',
  },
  stats: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualHabit);
