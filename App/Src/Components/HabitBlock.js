import React, { PropTypes } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import RecentDays from './RecentDays.js'

const HabitBlock = ({habit, onPressItem}) => (
  <View style={styles.habitBlock}>
    <View style={styles.habitName}>
      <Text style={styles.habitNameTitle}>{habit.name}</Text>
    </View>
    <RecentDays dates={habit.dates} onPressItem={onPressItem}/>
  </View>
)

const styles = StyleSheet.create({
  habitBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },

  habitName: {
    width: 70,
    alignItems: 'center',
  },

  habitNameTitle: {
    color: 'white',
  },
})

export default HabitBlock
