import React, { PropTypes } from 'react'
import { ScrollView, View, Text } from 'react-native';
import HabitBlock from './HabitBlock.js'
import ModalRoot from './ModalRoot.js'
var moment = require('moment');

const HabitsList = ({habits, editHabitDay, onPressHabit, editPast}) => {
  let toComplete = [];
  let alreadyCompleted = [];

  habits.forEach(habit => {
    console.log('inside habits')
    let toCategorize = habit.dates.sort((a,b) => new Date(b.date) - new Date(a.date))
    let lastLoggedDay = toCategorize[0]

    if (lastLoggedDay) {
      let lastLogged = moment(lastLoggedDay.date).format('YYYY-MM-DD');
      let today = moment().format('YYYY-MM-DD');

      if (lastLogged === today) {
        alreadyCompleted.push(habit);
      } else {
        toComplete.push(habit);
      }
    } else {
      toComplete.push(habit);
    }
  })

  return(
    <ScrollView>
      { toComplete.map(habit => {
        return <HabitBlock
          key={habit.id}
          allHabits={habits}
          habit={habit}
          onPressHabit={onPressHabit}
          onPressNoPic={editPast}
          onPressPic={editHabitDay}
        />
      })}
      { alreadyCompleted.map(habit => {
        return <HabitBlock
          key={habit.id}
          allHabits={habits}
          habit={habit}
          onPressHabit={onPressHabit}
          onPressNoPic={editPast}
          onPressPic={editHabitDay}
        />
      })}
      <ModalRoot />
    </ScrollView>
  )
}

export default HabitsList
