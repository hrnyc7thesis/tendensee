import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './../Actions/ActionCreators';
import HabitsListContainer from './HabitsListContainer.js';

let Habits = () => {
  console.log('render habits container')
  return (
    <View style={styles.container}>
      <HabitsListContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Habits

// class Habits extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Your Habss!
//         </Text>
//         <HabitContainer text={'he'}/>
//       </View>
//     );
//   }
// };

// class Habits extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Your Habss!
//         </Text>
//         <HabitContainer text={'he'}/>
//       </View>
//     );
//   }
// };
