import React, { PropTypes } from 'react'
import { ScrollView, View } from 'react-native';
import HabitBlock from './HabitBlock.js'
import ModalRoot from './ModalRoot.js'

const HabitsList = ({habits, test}) => (
  <View>
    {habits.map(habit => {
      return <HabitBlock key={habit.id} habit={habit} onPressItem={test}/>
    })}
    <ModalRoot />
  </View>
)

export default HabitsList
