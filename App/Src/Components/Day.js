import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
var moment = require('moment');
import { incrementPhotoCount } from './../Actions/PhotoActions';

const Day = ({day, allHabits, habitProps, onPressItem}) => {
  console.log('day habits', habitProps)

  let image = day.id === 0 ? <Image style={[styles.dayContainerImage, {opacity: 0.5}]} source={{uri: day.picture}} /> :
    <Image style={[styles.dayContainerImage]} source={{uri: day.picture}} />

  return (
    <TouchableOpacity style={styles.dayContainer} onPress={() => onPressItem(day, allHabits, habitProps)}>
      <Text style={styles.dayOfWeekTitle}>{moment(day.date).format("ddd D")}</Text>
      {image}
      {/* <Image style={styles.dayContainerImage} source={{uri: day.picture}} /> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dayContainer: {
    backgroundColor: '#ecf0f1',
    width: 102,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayContainerImage: {
    // backgroundColor: 'transparent',
    width: 100,
    height: 100,
    // opacity: 0.5,
    // tintColor: 'rgba(220, 116, 116, 0.5)',
  },

  ContainerImage: {
    width: 100,
    height: 100,
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
