import React, { PropTypes } from 'react'
import { View } from 'react-native';
import HabitBlock from './HabitBlock.js'

const HabitsList = ({habits, test}) => (
  <View>
    {habits.map(habit => {
      return <HabitBlock key={habit.id} habit={habit} onPressItem={test}/>
    })}
  </View>
)

export default HabitsList
