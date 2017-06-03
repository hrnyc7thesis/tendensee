import React, { PropTypes } from 'react'
import { ScrollView, View, Text } from 'react-native';
import HabitBlock from './HabitBlock.js'
import ModalRoot from './ModalRoot.js'
var moment = require('moment');

const HabitsList = ({habits, test, onPressHabit}) => {
  let toComplete = [];
  let alreadyCompleted = [];

  habits.forEach(habit => {
    console.log('inside habits')
    let toCategorize = habit.dates.sort((a,b) => new Date(b.date) - new Date(a.date))
    let lastLoggedDay = toCategorize[0]

    console.log('lastLoggedDay', lastLoggedDay, habit.name)

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
        return <HabitBlock key={habit.id} allHabits={habits} habit={habit} onPressHabit={onPressHabit} onPressItem={test}/>
      })}
      { alreadyCompleted.map(habit => {
        return <HabitBlock key={habit.id} allHabits={habits} habit={habit} onPressHabit={onPressHabit} onPressItem={test}/>
      })}
      <ModalRoot />
    </ScrollView>
  )
}

export default HabitsList
