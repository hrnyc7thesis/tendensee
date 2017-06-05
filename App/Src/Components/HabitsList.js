import React, { PropTypes } from 'react'
import { ScrollView, View, Text } from 'react-native';
import HabitBlock from './HabitBlock';
import ModalRoot from './ModalRoot';
import SingleHabitList from './SingleHabitList';
var moment = require('moment');

const HabitsList = ({habits, editHabitDay, onPressHabit, editPast}) => {
  let singleHabit = [];
  let toComplete = [];
  let alreadyCompleted = [];

  let toShow;
  if (habits.length > 1) {
    // toShow = <ScrollView>
    //       { toComplete.map(habit => {
    //         return <HabitBlock
    //           key={habit.id}
    //           allHabits={habits}
    //           habit={habit}
    //           onPressHabit={onPressHabit}
    //           onPressNoPic={editPast}
    //           onPressPic={editHabitDay}
    //         />
    //       })}
    //       { alreadyCompleted.map(habit => {
    //         return <HabitBlock
    //           key={habit.id}
    //           allHabits={habits}
    //           habit={habit}
    //           onPressHabit={onPressHabit}
    //           onPressNoPic={editPast}
    //           onPressPic={editHabitDay}
    //         />
    //       })}
    //       <ModalRoot />
    //     </ScrollView>
  }

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
      {/* { habits.length === 1 &&
        habits.map(habit => {
        return <SingleHabitList
          key={habit.id}
          allHabits={habits}
          habit={habit}
          onPressHabit={onPressHabit}
          onPressNoPic={editPast}
          onPressPic={editHabitDay}
        />
      })
      } */}
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
