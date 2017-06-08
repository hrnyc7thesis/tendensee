import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { Icon } from 'native-base';
// import Icon from 'react-native-vector-icons/Foundation'; //x
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //x
// import Icon from 'react-native-vector-icons/SimpleLineIcons'; // check
var moment = require('moment');
import { incrementPhotoCount } from './../Actions/PhotoActions';
import colors from './../ColorPalette'

const Day = ({day, howMany, habitProps, allHabits, onPressItem}) => {
  const { width } = Dimensions.get('window');

  let imageHeight;
  let imageWidth;
  let evenlySpaced;

  let widthWithSpacers = width - 2 * 10 - 2 * 6 - 2 * 5;

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
  // let image = day.default === true ? <View style={{}}><Image style={[styles.dayContainerImage, {opacity: 0.5, width: imageWidth, height: imageHeight}]} source={{uri: day.picture}} /></View>:
  //   <View><Image style={[styles.dayContainerImage, {opacity: 1, width: imageWidth, height: imageHeight}]} source={{uri: day.picture}} /></View>


  // for icons
  // let image = day.default === true ?
  //   <View style={{backgroundColor: 'lightpink', opacity: 0.5, alignItems: 'center', justifyContent: 'center'}}>
  //     <Image style={[styles.dayContainerImage, {opacity: 0.5, width: imageWidth, height: imageHeight, backgroundColor: 'red'}]}/>
  //     <Icon style={{position: 'absolute', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'transparent', fontSize: 30}} name='emoticon-sad' />
  //   </View>:
  //   <View><Image style={[styles.dayContainerImage, {opacity: 1, width: imageWidth, height: imageHeight}]} source={{uri: day.picture}} /></View>

  let image;
  if (day.default === true) {
    image = <View style={{opacity: 0.5, alignItems: 'center', justifyContent: 'center'}}>
      <Image style={[styles.dayContainerImage, {width: imageWidth, height: imageHeight, backgroundColor: colors.secondary}]}/>
      <Icon style={{color: 'red', position: 'absolute', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'transparent', fontSize: 40}} name='emoticon-sad' />
    </View>
  } else {
    if (day.picture === 'https://s3.us-east-2.amazonaws.com/tgoc99habit/bTyogRbpc.jpg') {
      image = <View style={{opacity: 0.5, alignItems: 'center', justifyContent: 'center'}}>
        <Image style={[styles.dayContainerImage, {opacity: 1, width: imageWidth, height: imageHeight, backgroundColor: '#9CCC65'}]}/>
        <Icon style={{position: 'absolute', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'transparent', fontSize: 50, }} name='check' />
      </View>
    } else {
      image = <View><Image style={[styles.dayContainerImage, {opacity: 1, width: imageWidth, height: imageHeight}]} source={{uri: day.picture}} /></View>
    }
  }

  return (
    <TouchableOpacity style={[styles.dayContainer, {width: imageWidth}]} onPress={() => onPressItem(day, habitProps, allHabits)}>
      {image}
      <Text style={styles.dayOfWeekTitle}>{moment(day.date).format("ddd D")}</Text>
    </TouchableOpacity>
  )
}

const palette = {
  primary: '#0277bd',
  primaryLight: '#58a5f0',
  primaryDark: '#004c8c',
  secondary: '#cfd8dc',
  secondaryLight: '#ffffff',
  secondaryDark: '#9ea7aa',
  primaryText: '#ffffff',
  secondaryText: '#000000',
  background: '#f5f5f6'
}

const styles = StyleSheet.create({
  dayContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',

    marginHorizontal: 2,
    marginVertical: 2,
  },

  dayOfWeekTitle: {
    position: 'absolute',
    color: colors.primary,
    backgroundColor: colors.secondaryLight,
    bottom: 0,
    left: 0,
    paddingHorizontal: 3,
  },

  iconStyle: {
    position: 'absolute',
    backgroundColor: 'red', //b
    left: 20,
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
