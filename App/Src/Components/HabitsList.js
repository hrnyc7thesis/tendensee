import React, { PropTypes } from 'react'
import { ScrollView, View, Text } from 'react-native';
import HabitBlock from './HabitBlock.js'
import ModalRoot from './ModalRoot.js'

const HabitsList = ({habits, editHabitDay, onPressHabit, editPast}) => {

  return(
    <ScrollView>
      {habits ? habits.map(habit => {
        return <HabitBlock 
          key={habit.id}
          allHabits={habits}
          habit={habit}
          onPressHabit={onPressHabit}
          onPressNoPic={editPast}
          onPressPic={editHabitDay}
        />
      }):<Text>''</Text>}
      <ModalRoot />
    </ScrollView>
  )
}

export default HabitsList
