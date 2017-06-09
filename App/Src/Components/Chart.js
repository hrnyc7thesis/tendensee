import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chart from 'react-native-chart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chartStyle: {
    width: 250,
    height: 250,
  },
});


class HabitChart extends Component {
  constructor (props) {
    super (props);
  }

  render() {
    console.log('in chart', this.props.data)
    return (
      <View style={styles.container}>
        <Chart
          style={styles.chartStyle}
          data={this.props.data}
          verticalGridStep={1}
          type="line"
         />
      </View>
    );
  }
}

export default HabitChart;