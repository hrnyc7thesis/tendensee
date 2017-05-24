import React, { PropTypes } from 'react'
import { Modal, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { editHabitDayType } from './../Actions'

const EditHabitDayTypeModal = ({day, dispatch}) => (
  <Modal>
    <Text>Habit Modal</Text>
  </Modal>
)

export default connect(
  (state, ownProps) => ({
    day: state.photoCount
  })
)(EditHabitDayTypeModal)
