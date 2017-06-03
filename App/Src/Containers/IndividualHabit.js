import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Switch, Text, ScrollView, View, StyleSheet, Dimensions, Image } from 'react-native';
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
      isModalTransparent: true,
      // Habit
      habitName: this.props.habitProps.name,
      habitType: this.props.habitProps.type,
      isReminderChecked: this.props.habitProps.notification ? true : false,
      reminderTime: this.props.habitProps.notification,
      private: this.props.habitProps.private,

    }
  }


  _openModal = () => {
    this.setState({ isModalVisible: true });
  }

  _updateHabit = (time) => {
    this._handleTimePicked(time);
    if(time === null) this._removeReminder();
    let habit = {
      id: this.props.habitProps.id,
      name: this.state.habitName,
      type: this.state.habitCategory,
      notification: time,
      private: this.state.private
    };
    this.props.updateHabit(this.props.user, habit);
    // this._closeModal();
  }

  _setHabitName(text) {
    this.setState({habitName: text});
  }

  _closeModal = () => {
    this.setState({ isModalVisible: false });
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

  getDates = (startDate, stopDate) => {
    let dates = [];
    let curDate = startDate;
    while (curDate <= stopDate) {
      dates.push([moment(curDate).format('YYYY-MM-DD'),0])
      curDate = moment(curDate).add(1, 'days');
    }
    return dates;
  }

  render() {
    console.log('dates:', this.props.habitProps.dates)
    let dateStrings = this.props.habitProps.dates.map(d => moment(d.date).format('YYYY-MM-DD'))
    let startDate = new moment(this.props.habitProps.start_date);
    let today = new moment();
    let totalDays = today.diff(startDate, 'days');
    console.log('startd, today, totald', startDate, today, totalDays);

    let allDates = this.getDates(startDate, today);
    allDates = allDates.map(d=> {
      if(dateStrings.includes(d[0].toString())) {
        return [d[0], 1]
      } else {
        return d
      }
    });
    console.log(allDates);
    let weeklyAvg = Math.round((this.props.habitProps.dates.length/totalDays)*7);
    let longestStreak = 0;
    let habitScore = 0;
    allDates.reduce((acc, d, idx) => {
        if((acc + d[1]) > longestStreak) {
          longestStreak = acc + d[1];
        }
        d[1] === 0 ? habitScore-- : habitScore++;
        habitScore = habitScore<0 ? 0 : habitScore;
        d[1] === 0 ? d.push(0) : d.push(acc + d[1]);
        d.push(habitScore);
        return d[1] === 0 ? 0 : acc + d[1];
    }, 0)

    // Add day or days depending on if its one day or not
    let currentStreak = allDates[allDates.length-1][2] > allDates[allDates.length-2][2] ? allDates[allDates.length-1][2] : allDates[allDates.length-2][2];
    currentStreak = currentStreak === 1 ? currentStreak + ' day' : currentStreak + ' days';
    longestStreak = longestStreak === 1 ? longestStreak + ' day' : longestStreak + ' days';
    weeklyAvg = weeklyAvg === 1 ? weeklyAvg + ' day' : weeklyAvg + ' days';

    //ALL DATES NOW INCLUDES CURRENT STREAK AT ANY DAY (at index 2) & habit score (at index 3)
    console.log('ad', allDates);
    let streakChartData = allDates.map(d=> {
      return { "x": moment(d[0]).format('DD'), "y": d[2] }
    })
    let habitScoreChartData = allDates.map(d=> {
      return { "x": moment(d[0]).format('DD'), "y": d[3] }
    })
    let chartData = [streakChartData, habitScoreChartData];
    console.log('charstata', chartData)

    let images = this.props.habitProps.dates ? this.props.habitProps.dates.map(d=> d.picture): ['No Pictures Yet']
    if(images.length>6){
      images = images.slice(0,9);
      showButton = {display:'flex'}
    } else {showButton = {display:'none'}}

    return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <View style={styles.topRowContainer}>
            <Button dark transparent iconCenter onPress={() => {Actions.pop()}}>
              <Icon name='arrow-back' />
            </Button>
            <Button style={{alignSelf: 'flex-end'}} dark transparent iconCenter onPress={() => {this._openModal()}}>
              <Icon name='settings' />
            </Button>
          </View>
        </View>
        <View style={styles.header}>
          <H1>{this.state.habitName}</H1>
        </View>
        <View style={styles.header}>
          <H3>{this.state.habitType}</H3>
        </View>
        <View style={styles.reminder}>
          <Text></Text>
          <Text></Text>
          <View style={styles.reminderIcon}>
            <Icon name='notifications'/>
            <CheckBox checked={this.state.isReminderChecked} onPress={() => { this.state.isReminderChecked ? this._updateHabit(null) : this._showTimePicker()}} />
          </View>
          <View>
            <Text onPress={() => { this.state.isReminderChecked ? '' : this._showTimePicker()}} style={{backgroundColor:'#ADD8E6', padding:6}}>{this.state.reminderTime ? moment(new moment(this.state.reminderTime,'HH:mm:ss')).format("h:mmA") : 'Activate?' }</Text>
          </View>
          <Text></Text>
          <Text></Text>
        </View>
        <Card>
          <View style={[styles.stats, {paddingTop:10}]}>
            <Text>Success Rate: </Text>
            <Text>{this.props.habitProps.dates.length}/{totalDays} ({Math.floor(this.props.habitProps.dates.length/totalDays*100)}%)</Text>
          </View>
          <View style={styles.stats}>
            <Text>Average Per Week: </Text>
            <Text>{weeklyAvg}</Text>
          </View>
          <View style={styles.stats}>
            <Text>Current Streak: </Text>
            <Text>{currentStreak}</Text>
          </View>
          <View style={styles.stats}>
            <Text>Longest Streak: </Text>
            <Text>{longestStreak}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.habitImages}>
            {images.map((image, idx) => {
              return (
                  <Image key={idx} source={{uri: image}} style={styles.habitImage}/>
              );
            })}
            </View>
          </View>
          <Button light block style={showButton}>
            <Text>All {this.state.habitName} Images</Text>
          </Button>
        </Card>
        <View style={styles.header}>
          <H3>Habit Chart</H3>
        </View>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._updateHabit}
          onCancel={this._hideTimePicker}
          mode={'time'}
          titleIOS={'Daiy Reminder Time'}
        />
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.isModalVisible}
          onRequestClose={() => {this._closeModal()}}>
          <Card>
            <View style={styles.card}>
              <CardItem>
                <H1>Edit Habit</H1>
              </CardItem>
              <CardItem>
                <Body>
                  <View style={styles.formContainer}>
                    <Form>
                      <Text>Habit Name</Text>
                      <Item rounded>
                        <Input value={this.state.habitName} onChangeText={(text) => {this._setHabitName(text)}} />
                      </Item>
                    </Form>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 30}}>
                      <Text>Private?</Text>
                      <Switch value={this.state.isReminderChecked} onPress={() => { this.state.isReminderChecked ? this._removeReminder() : this._showTimePicker()}} />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontWeight: 'bold', color:'red'}}>Delete</Text>
                      <Icon name='trash' onPress = {() => Alert.alert(
                        'Delete Habit',
                        'Are you sure you want to delete this Habit?',
                        [
                          {text: 'Cancel', onPress: () => console.log('Canceled Habit Delete!')},
                          {text: 'OK', onPress: () => console.log('CREATE HABIT DELETE ROUTE')},
                        ]
                      )} />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                      <Button transparent onPress={() => this._closeModal()}>
                        <Text>Cancel</Text>
                      </Button>
                    </View>
                  </View>
                </Body>
              </CardItem>
            </View>
          </Card>
        </Modal>
      </View>
    </ScrollView>
    )
  }
}
const { width } = Dimensions.get('window');
const photoWidth = (width - 2 * 10 - 2 * 2 - 4 * 5) / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  formContainer: {
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 5
  },
  header: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#F8F8F8',
  },
  topHeader: {
    alignSelf: 'stretch',
    backgroundColor: '#F8F8F8',
  },
  reminder: {
    flexDirection: 'row',
    height:30,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'seashell',
  },
  reminderIcon: {
    flexDirection: 'row',
    height:30,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  stats: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  habitImages: {
    borderColor: '#f0f0f5',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topRowContainer: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
    justifyContent: 'space-between',
  },
  habitImage: {
    width: photoWidth,
    height: photoWidth,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
})


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualHabit);
