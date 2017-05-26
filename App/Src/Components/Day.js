import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
var moment = require('moment');
import { incrementPhotoCount } from './../Actions/PhotoActions';

const Day = ({day, habitProps, onPressItem}) => {
  console.log('day habits', habitProps)
  return (
    <TouchableOpacity style={styles.dayContainer} onPress={() => onPressItem(day, habitProps)}>
      <Text style={styles.dayOfWeekTitle}>{moment(day.date).format("ddd")}</Text>
      <Image
        style={styles.dayContainerImage}
        source={{uri: day.picture}}
      />
    </TouchableOpacity>
  )
}

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

// const mapStateToProps = (state) => ({
//   day:
// })
//
// const mapStateToProps = (state) => {
//   return {
//     habits: getHabits(state.user.userData.habits)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Day)
