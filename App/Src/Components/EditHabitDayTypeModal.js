import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { Picker, ActionSheetIOS, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';
import { editHabitDayType, hideModal } from './../Actions/ModalActions'
import Modal from 'react-native-modal';
var moment = require('moment');

const EditHabitDayTypeModal = ({day, habitProps, dispatch}) => {

  // Link up from database of different habits, should be habit names
  let BUTTONS = ['Exercise', 'Nutrition', 'Mindset', 'Time Mgmt', 'Cancel']; //populate from state
  var DESTRUCTIVE_INDEX = 3;
  var CANCEL_INDEX = 4;

  return (
    <Modal transparent={true} visible={true}>
      <Card>
        <View style={styles.card}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text>{moment(day.date).format("dddd, MMMM Do")}</Text>
            <Text>{habitProps.type}</Text>
            <Image source={{uri: day.picture}} style={{height: 400, width: 400}} resizeMode='contain'/>
            <View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
              <Button style={{marginRight: 10}} onPress={() => ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: 'Update Habit Type'
                },
                (buttonIndex) => {
                  dispatch(hideModal())
                }
                )}>
                <Text>{habitProps.type}</Text>
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

})

export default connect(
  (state, ownProps) => ({
    day: ownProps.day,
    habitProps: ownProps.habitProps,
  })
)(EditHabitDayTypeModal)
