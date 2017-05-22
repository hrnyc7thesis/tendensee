import React, { PropTypes } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import HabitBlock from './HabitBlock.js'

const HabitsList = ({habits}) => (
  <View>
    {habits.map(habit => {
        // return <Text>{habit.name}</Text>
        return <HabitBlock key={habit.id} habit={habit}/>
      }
    )}
  </View>
)

export default HabitsList
