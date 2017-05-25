import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { Modal, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { editHabitDayType, hideModal } from './../Actions/ModalActions'

const EditHabitDayTypeModal = ({day, dispatch}) => {
  console.log('in habit')
  return(<Modal>
    <Text>Habit Modal / {day}</Text>
    <Text onPress={()=> dispatch(hideModal())}>Exit</Text>
  </Modal>)
}

export default connect(
  (state, ownProps) => ({
    day: ownProps.day
  })
)(EditHabitDayTypeModal)
