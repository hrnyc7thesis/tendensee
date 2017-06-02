import React, { PropTypes } from 'react'
import { ScrollView, View, Text } from 'react-native';
import HabitBlock from './HabitBlock.js'
import ModalRoot from './ModalRoot.js'
var moment = require('moment');

const HabitsList = ({habits, test, onPressHabit}) => {
  let toComplete = [];
  let alreadyCompleted = [];

  habits.forEach(habit => {
    let toCategorize = habit.dates.sort((a,b) => new Date(b.date) - new Date(a.date))
    // let mostRecentDayIndex = toCategorize.dates.length - 2;
    let mostRecentDay;
    console.log('<<<', toCategorize);

    mostRecentDay = toCategorize[1]
    console.log('###', mostRecentDay)
    if (mostRecentDay) {
      let recentDay = moment(mostRecentDay.date).format('YYYY-MM-DD');
      let toMatch = moment().subtract(2, 'days').format('YYYY-MM-DD');

      console.log('>>>', recentDay, toMatch);
      if (recentDay === toMatch) {
        alreadyCompleted.push(habit);
      } else {
        toComplete.push(habit);
      }
    }

  })

  console.log('!!!', alreadyCompleted)

  return(
    <ScrollView>
      <Text>alreadyCompleted</Text>
      { alreadyCompleted.map(habit => {
        return <HabitBlock key={habit.id} allHabits={habits} habit={habit} onPressHabit={onPressHabit} onPressItem={test}/>
      })}
      <Text>toComplete</Text>
      { toComplete.map(habit => {
        return <HabitBlock key={habit.id} allHabits={habits} habit={habit} onPressHabit={onPressHabit} onPressItem={test}/>
      })}
      <ModalRoot />
    </ScrollView>
  )

  // return(
  //   <ScrollView>
  //     {habits ? habits.map(habit => {
  //       return <HabitBlock key={habit.id} allHabits={habits} habit={habit} onPressHabit={onPressHabit} onPressItem={test}/>
  //     }):<Text>''</Text>}
  //     <ModalRoot />
  //   </ScrollView>
  // )
}

export default HabitsList
