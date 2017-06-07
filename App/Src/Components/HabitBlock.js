import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import RecentDays from './RecentDays.js';
import { Button, Icon, H1 } from 'native-base';
const HabitBlock = ({habit, allHabits, onPressPic, onPressNoPic, onPressHabit}) => {
  const habitProps = habit;

  return (
    <View style={styles.habitBlock}>
      <View style={styles.habitName}>
        <Text onPress={() => onPressHabit(habitProps)} style={styles.habitNameTitle}>{habit.name}</Text>
        <Button onPress={() => onPressHabit(habitProps)} style={{paddingLeft: 0, paddingRight: 0, height: 30}}transparent iconLeft><Icon name='ios-glasses-outline' /></Button>
      </View>
      <RecentDays allHabits={allHabits} dates={habit.dates} habitProps={habitProps} onPressNoPic={onPressNoPic} onPressPic={onPressPic}/>
    </View>
  )
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  habitBlock: {
    flexDirection: 'column',
    // alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 0,
  },

  habitName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'salmon',
    width: width,
    height: 30,
  },

  habitNameTitle: {
    color: 'white',
    // fontWeight: 'bold',
    // fontSize: 20
  },
})

export default HabitBlock
