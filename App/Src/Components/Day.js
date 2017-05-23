import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Day = ({day}) => (
  <TouchableOpacity style={styles.dayContainer}>
    <Text style={styles.dayOfWeekTitle}></Text>
    <Image
      style={styles.dayContainerImage}
      source={{uri: day.picture}}
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  dayContainer: {
    backgroundColor: '#ecf0f1',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayContainerImage: {
    width: 70,
    height: 70,
  },
})

export default Day
