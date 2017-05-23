import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './../Actions/ActionCreators';
import HabitsList from './../Components/HabitsList.js';

const getHabits = (habits) => {
  return habits;
}

const mapStateToProps = (state) => {
  return {
    habits: getHabits(state.user.userData.habits)
  }
}

const HabitsListContainer = connect(mapStateToProps)(HabitsList)

export default HabitsListContainer
