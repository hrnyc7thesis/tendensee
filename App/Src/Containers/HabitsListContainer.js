import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './../Actions/ActionCreators';
import HabitsList from './../Components/HabitsList.js';
import { incrementPhotoCount } from './../Actions/PhotoActions';
import { editHabitDayType } from './../Actions/ModalActions';
import { Actions } from 'react-native-router-flux';

const getHabits = (habits) => {
  return habits;
}

const mapStateToProps = (state) => {
  return {
    habits: getHabits(state.user.userData.habits)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressHabit: (habitProps) => {
      Actions.individualHabit({habitProps})
    },
    test: (day, habitProps) => {
      day ? dispatch(editHabitDayType(day, habitProps)) : ''
    }
  }
}

const HabitsListContainer = connect(mapStateToProps, mapDispatchToProps)(HabitsList)

export default HabitsListContainer
