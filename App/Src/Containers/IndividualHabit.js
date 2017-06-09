import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Switch, Text, ScrollView, View, StyleSheet, Dimensions, Image, TouchableHighlight, StatusBar, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { Container, Content, Button, Card, Form, Item, Header, Input, H1, H2, H3, CardItem, Body, CheckBox, Icon, ActionSheet } from 'native-base';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ActionCreators } from './../Actions/ActionCreators';
import HabitsListContainer from './HabitsListContainer.js';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Actions, ActionConst } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import SettingsNav from '../Components/SettingsNav';
import BackNav from '../Components/BackNav';
import TitleNav from '../Components/TitleNav';
import ModalRoot from '../Components/ModalRoot';



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
      id: this.props.habitProps.id,
      habitName: this.props.habitProps.name,
      habitType: this.props.habitProps.type,
      isReminderChecked: this.props.habitProps.notification ? true : false,
      reminderTime: this.props.habitProps.notification,
      private: this.props.habitProps.private,
      dates: this.props.habitProps.dates
    }
  }


  _openModal = () => {
    this.setState({ isModalVisible: true });
  }

  _updateHabit = (time) => {
    this._handleTimePicked(time);
    if(time === null) this._removeReminder();
    let habit = {
      id: this.state.id,
      name: this.state.habitName,
      type: this.state.habitCategory,
      notification: time,
      private: this.state.private
    };
    this.props.updateHabit(this.props.user, habit);
    // this._closeModal();
  }

  _updateHabitPrivate = (bool) => {
    let habit = {
      id: this.state.id,
      private: bool
    };
    this.props.updateHabit(this.props.user, habit);
    // this._closeModal();
  }

  _setHabitName(text) {
    this.setState({habitName: text});
  }

  _setPrivate() {
    this.state.private ? Alert.alert('Habit hidden from other users') : Alert.alert('Habit will display to other users')
    this._updateHabitPrivate(!this.state.private);
    this.setState({private: !this.state.private});
    console.log(this.state.private)
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

  _showActionSheet() {
    BUTTONS = ['Fitness', 'Diet', 'Study', 'etc.'].concat(['Cancel']);
    CANCEL_INDEX = BUTTONS.length - 1;
    ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      title: 'Edit Habit Type',
    },
    (buttonIndex) => {
      if (buttonIndex !== CANCEL_INDEX) {
        let putData = Object.assign({}, {id: this.state.id}, {
          type: BUTTONS[buttonIndex]
        });
        this.setState({habitType:BUTTONS[buttonIndex]})
        console.log('old type, new type', putData)
        this.props.updateHabit(this.props.user, putData);
        this._closeModal();
      }
    });
  }

  render() {
    let photos = [];
    let dates = this.props.habitProps.dates;
    if (dates) {
      dates.forEach(day => {
        photos.push({picture: day.picture, date: day.date, habitName: this.state.habitName, habitType: this.state.habitType})
      })
    } else {
      photos = [];
    }

    let dateStrings = this.props.habitProps.dates.sort((a,b) => new Date(a.date.toString()) - new Date(b.date.toString())).map(d => moment(d.date).format('YYYY-MM-DD'));
    console.log('dates:', this.props.habitProps.dates)
    console.log('datesrings:', dateStrings)
    let startDate = new moment(this.props.habitProps.start_date);
    let today = new moment();
    let totalDays = Math.max(today.diff(startDate, 'days'), this.props.habitProps.dates.length, 1);
    console.log('startd, today, totald', startDate, today, totalDays);

    let allDates = this.getDates(startDate, today);
    allDates = allDates.map(d=> {
      console.log()
      if(dateStrings.includes(d[0].toString())) {
        return [d[0], 1]
      } else {
        return d
      }
    });
    console.log('ad', allDates);
    let weeklyAvg = Math.round((this.props.habitProps.dates.length/totalDays)*7) || 0;
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
    let currentStreak;
    if(allDates[allDates.length-1] && allDates[allDates.length-2]){
      currentStreak = allDates[allDates.length-1][2] > allDates[allDates.length-2][2] ? allDates[allDates.length-1][2] : allDates[allDates.length-2][2];
    } else {
      currentStreak = allDates[allDates.length-1][2];
    }
    currentStreak = currentStreak === 1 ? currentStreak + ' day' : currentStreak + ' days';
    longestStreak = longestStreak === 1 ? longestStreak + ' day' : longestStreak + ' days';
    weeklyAvg = weeklyAvg === 1 ? weeklyAvg + ' day' : weeklyAvg + ' days';

    //ALL DATES NOW INCLUDES CURRENT STREAK AT ANY DAY (at index 2) & habit score (at index 3)
    console.log('ad', allDates);
    let streakChartData = allDates.map(d=> {
      return [moment(d[0]).format('DD'), d[2]]
    })
    let habitScoreChartData = allDates.map(d=> {
      return [moment(d[0]).format('DD'), d[3]]
    })
    let chartData = [streakChartData, habitScoreChartData];
    console.log('charstata', chartData)

    let images = this.props.habitProps.dates ? this.props.habitProps.dates.map(d=> d.picture): ['No Pictures Yet']
    if(images.length>6){
      images = images.slice(0,9);
      showButton = {display:'flex'}
    } else {showButton = {display:'none'}}

          const colors = {
              primary: '#0277bd',
              primaryLight: '#58a5f0',
              primaryDark: '#004c8c',
              secondary: '#cfd8dc',
              secondaryLight: '#ffffff',
              secondaryDark: '#9ea7aa',
              primaryText: '#ffffff',
              secondaryText: '#000000',
              background: '#f5f5f6'
            }
    return (

        <View style={styles.container}>
          <StatusBar hidden={true} />
          <NavigationBar
            statusBar={{hidden:true}}
            tintColor={colors.primaryDark}
            title={<TitleNav
                          title={this.state.habitName}
                          style={{ fontWeight: 'bold', marginTop:4, fontSize: 18, color: colors.primaryText, }}
                        />}
            leftButton={<BackNav
                          style={{ marginLeft: 14, marginTop:6, color: colors.primaryText }}
                          onPress={() => {Actions.habits()}}
                        />}
            rightButton={<SettingsNav
                          style={{ marginRight: 14, marginTop:6, color: colors.primaryText }}
                          onPress={() => {this._openModal()}}
                        />}
          />
          <ScrollView>
            <View>
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
                {/* {images.map((image, idx) => {
                  return (
                      <Image key={idx} source={{uri: image}} style={styles.habitImage}/>
                  );
                })} */}
                {photos.map(image => {
                  return (
                    <TouchableOpacity onPress={() => this.props.showUserHabitPhoto(image)}>
                      <Image source={{uri: image.picture}} style={styles.habitImage}/>
                    </TouchableOpacity>
                  )
                })}
                </View>
              </View>
              <ModalRoot />
              {/*<Button light block style={showButton}>
                <Text>All {this.state.habitName} Images</Text>
              </Button>*/}
            </View>
            {/* <View style={styles.header}>
              <H3>Habit Chart</H3>
            </View> */}
            <DateTimePicker
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this._updateHabit}
              onCancel={this._hideTimePicker}
              mode={'time'}
              titleIOS={'Daiy Reminder Time'}
            />
            <Container>
              <Modal
                animationType={this.state.animationType}
                transparent={true}
                visible={this.state.isModalVisible}
                style={styles.modal}
                onRequestClose={() => {this._closeModal()}}>
                  <View style={{backgroundColor: colors.primaryDark, alignSelf: 'stretch', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    {/* <Button style={{}} dark transparent iconLeft> */}
                      {/* <Icon style={{color: colors.primary}} name='close' /> */}
                    {/* </Button> */}
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 1, flexGrow: 2, alignItems: 'center', marginRight: 25}}>
                      <H1 style={{fontWeight: 'bold', color: colors.primaryText}}>Edit Habit</H1>
                    </View>
                    <View style={{flex: 1, marginRight: -25}}>
                    <Button dark transparent iconRight onPress={() => this._closeModal()}>
                      <Icon style={{color: colors.primaryText}} name='close' />
                    </Button>
                    </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, margin: 10, marginBottom: 0}}>
                      <H2 style={{fontWeight: 'bold'}}>Name:</H2>
                    </View>
                    <View style={{flex: 1, alignSelf: 'stretch', margin: 10, marginBottom: 0}}>
                      <Form>
                        <Item regular>
                          <Input value={this.state.habitName} onChangeText={(text) => {this._setHabitName(text)}} />
                        </Item>
                      </Form>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, margin: 10, marginBottom: 0}}>
                      <H2 style={{fontWeight: 'bold'}}>Type:</H2>
                    </View>
                    <View style={{flex: 1, margin: 10, marginBottom: 0}}>
                      <Button full underlayColor='gray' style={{backgroundColor: colors.secondaryDark}} onPress={() => this._showActionSheet()}>
                        <Text style={{color: colors.secondaryText}}>{this.state.habitType}</Text>
                      </Button>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, margin: 10, marginBottom: 10}}>
                      <H2 style={{fontWeight: 'bold'}}>Private:</H2>
                    </View>
                    <View style={{flex: 1, margin: 10, marginBottom: 10}}>
                      <Switch value={this.state.private} onValueChange={() => {this._setPrivate()}} />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <View style={{flex: 1, margin: 10, marginBottom: 10}}>
                      <H3 style={{fontWeight: 'bold', color:'red'}} name='trash' onPress = {() => Alert.alert(
                        'Delete Habit',
                        'Are you sure you want to delete this Habit and all related photos?',
                        [
                          {text: 'Cancel', onPress: () => console.log('Canceled Habit Delete!')},
                          {text: 'OK', onPress: () => {
                            this.props.deleteHabit(this.props.user, this.state.id)
                            this._closeModal();
                            Actions.habits({type: ActionConst.RESET});
                          }},
                        ]
                      )}>Delete</H3>
                    </View>
                    <View style={{flex: 1, margin: 10, marginBottom: 10, alignItems: 'center'}}>
                      <Button full style={{backgroundColor: colors.primary}} onPress={() => {this._updateHabit(); this._closeModal();}}>
                        <Text style={{color: colors.primaryText}}>Update</Text>
                      </Button>
                    </View>
                  </View>
              </Modal>
            </Container>
          </ScrollView>
        </View>
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
  modal: {
    borderWidth: 1,
    borderColor: colors.primaryDark,
    flex: 0,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'space-around',
    backgroundColor: 'white'
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
    flex:1,
    justifyContent: 'flex-start',
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
