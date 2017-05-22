import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Day from './Day.js';

const RecentDays = ({dates}) => (
  <ScrollView horizontal style={styles.recentDaysContainer}>
    {dates.map((day) => {
        return <Day key={day.id} day={day}/>
      }
    )}
  </ScrollView>
)

const styles = StyleSheet.create({
  recentDaysContainer: {
    flexDirection: 'row',
  }
});

export default RecentDays
