import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
var moment = require('moment');
import { incrementPhotoCount } from './../Actions/PhotoActions';

const Day = ({day, habitProps, allHabits, onPressItem}) => {
  const { width } = Dimensions.get('window');

  let imageHeight;
  let imageWidth;
  let onlyHabit = allHabits[0].dates;
  console.log(onlyHabit)
  if (allHabits.length === 1 && onlyHabit >= 1 && onlyHabit <= 3) {
    let evenlySpaced = (width) / onlyHabit;
    imageHeight = evenlySpaced;
    imageWidth = evenlySpaced;
  } else {
    let evenlySpaced = (width) / 3;
    imageHeight = evenlySpaced
    imageWidth = evenlySpaced
  }

  // To add red/green tint: style={{backgroundColor: 'lightpink', opacity: 0.75}}
  let image = day.id === 0 ? <View style={{}}><Image style={[styles.dayContainerImage, {opacity: 0.5, width: imageWidth, height: imageHeight}]} source={{uri: day.picture}} /></View>:
    <Image style={[styles.dayContainerImage, {width: imageWidth, height: imageHeight}]} source={{uri: day.picture}} />

  return (
    <TouchableOpacity style={[styles.dayContainer, {width: imageWidth}]} onPress={() => onPressItem(day, habitProps, allHabits)}>
      <Text style={styles.dayOfWeekTitle}>{moment(day.date).format("ddd D")}</Text>
      {image}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dayContainer: {
    backgroundColor: '#ecf0f1',
    width: 100,
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
