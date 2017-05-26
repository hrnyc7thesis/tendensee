import React, { PropTypes } from 'react'
import { ScrollView, View, Text } from 'react-native';
import HabitBlock from './HabitBlock.js'
import ModalRoot from './ModalRoot.js'

const HabitsList = ({habits, test}) => {
  if (!habits) {
    return(
      <View>
        <Text>Add some habits!</Text>
      </View>
    )
  }
  return(
    <View>
      {habits.map(habit => {
        return <HabitBlock key={habit.id} habit={habit} onPressItem={test}/>
      })}
      <ModalRoot />
    </View>
  )
}

export default HabitsList
