import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { Alert, Picker, ActionSheetIOS, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, H3 } from 'native-base';
import { editHabitDayType, hideModal } from './../Actions/ModalActions';
import { updateDay, deleteDay } from './../Actions/DayActions';
import Modal from 'react-native-modal';
var moment = require('moment');

const EditHabitDayTypeModal = ({day, allHabits, habitProps, dispatch}) => {

  // Link up from database of different habits, should be habit names
  let BUTTONS = allHabits.map(h => h.name).concat(['Delete', 'Cancel'])
  let DESTRUCTIVE_INDEX = BUTTONS.length-2;
  let CANCEL_INDEX = BUTTONS.length-1;
  console.log('day', day)
  console.log('habitprops.id', habitProps.id)

  let habitIds = allHabits.map(h => h.id);
  let otherHabitDates = allHabits.map(h => h.dates)
  const swapDate = (index) => {
    let result;
    console.log('otherHabitDates', otherHabitDates)
    console.log('otherHabitDates[index]', otherHabitDates[index])
    otherHabitDates[index].forEach((d, idx) => {
      console.log('two dates:', d.date, day.date)
      if(d.date === day.date) result = allHabits[index].dates[idx];
    })
    if (result) result.id_habits = habitProps.id;
    return result;
  }

  return (
    <Modal transparent={true} visible={true}>
      <Card>
        <View style={styles.card}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <H3> Edit Habit Date </H3>
            </View>
            <Text>{moment(day.date).format("dddd, MMMM Do")}</Text>
            <Text>{habitProps.name}</Text>
            <Image source={{uri: day.picture}} style={{height: 400, width: 400}} resizeMode='contain'/>
            <View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
              <Button style={{marginRight: 10}} onPress={() => ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: 'Edit Habit Date Details'
                },
                (buttonIndex) => {
                  if(buttonIndex === DESTRUCTIVE_INDEX) {
                    dispatch(deleteDay(day))
                    Alert.alert(`Photo Deleted from ${BUTTONS[buttonIndex]}`,'', [{ text: "OK", onPress: () => dispatch(hideModal())}]);
                  } else if(buttonIndex !== CANCEL_INDEX) {
                    let swap = swapDate(buttonIndex)
                    dispatch(updateDay({id: day.id, id_habits:habitIds[buttonIndex], swap, }))
                    let alertTitle = swap ? `Photo swapped from ${habitProps.name} to ${BUTTONS[buttonIndex]}!` : `Photo moved to ${BUTTONS[buttonIndex]}!`;
                    Alert.alert(alertTitle,'', [{ text: "OK", onPress: () => dispatch(hideModal())}])
                  } else {
                    dispatch(hideModal());
                  }
                }
                )}>
                <Text>{habitProps.name}</Text>
              </Button>
            </View>
            <View>
              <Button transparent onPress={() => dispatch(hideModal())}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </View>
      </Card>
    </Modal>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 15
  },

  habitName: {
    width: 70,
    alignItems: 'center',
  },

  habitNameTitle: {
    color: 'white',
  },
})

export default connect(
  (state, ownProps) => ({
    day: ownProps.day,
    habitProps: ownProps.habitProps,
  })
)(EditHabitDayTypeModal)
