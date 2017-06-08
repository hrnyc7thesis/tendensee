import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
var moment = require('moment');
import { incrementPhotoCount } from './../Actions/PhotoActions';

const Day = ({day, howMany, habitProps, allHabits, onPressItem}) => {
  const { width } = Dimensions.get('window');

  let imageHeight;
  let imageWidth;
  let evenlySpaced;

  let widthWithSpacers = width - 2 * 10 - 2 * 2;

  if (allHabits.length === 1 && howMany >= 1 && howMany <= 2) {
    evenlySpaced = widthWithSpacers / howMany;
  } else if (allHabits.length === 1 && howMany >= 3 && howMany <= 6) {
    evenlySpaced = widthWithSpacers / 2;
  } else if (allHabits.length === 2) {
    evenlySpaced = widthWithSpacers / 2;
  } else {
    evenlySpaced = widthWithSpacers / 3;
  }

  imageHeight = evenlySpaced;
  imageWidth = evenlySpaced;

  // To add red/green tint: style={{backgroundColor: 'lightpink', opacity: 0.75}}
  let image = day.default === true ? <View style={{}}><Image style={[styles.dayContainerImage, {opacity: 0.5, width: imageWidth, height: imageHeight}]} source={{uri: day.picture}} /></View>:
    <View><Image style={[styles.dayContainerImage, {opacity: 1, width: imageWidth, height: imageHeight}]} source={{uri: day.picture}} /></View>

  return (
    <TouchableOpacity style={[styles.dayContainer, {width: imageWidth}]} onPress={() => onPressItem(day, habitProps, allHabits)}>
      {image}
      <Text style={styles.dayOfWeekTitle}>{moment(day.date).format("ddd D")}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dayContainer: {
    // backgroundColor: '#ecf0f1',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',

    marginHorizontal: 2,
  },

  dayOfWeekTitle: {
      position: 'absolute',
      // backgroundColor: 'red',
      bottom: 0,
      left: 0,
  },

  dayContainerImage: {
    // backgroundColor: 'transparent',
    width: 100,
    height: 100,

    // borderColor: 'white',//'#f0f0f5',
    // borderWidth: 2,
    // borderRadius: 10,

    // opacity: 0.5,
    // tintColor: 'rgba(220, 116, 116, 0.5)',
  },
})

export default Day
