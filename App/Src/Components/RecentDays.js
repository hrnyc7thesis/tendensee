import React, { PropTypes } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native';
import Day from './Day.js';
var moment = require('moment');

const getDates = (startDate, stopDate) => {
  let dates = [];
  let curDate = startDate;
  while (curDate <= stopDate) {
    dates.push([moment(curDate).format('YYYY-MM-DD'),0])
    curDate = moment(curDate).add(1, 'days');
  }
  return dates;
}

const RecentDays = ({dates, habitProps, onPressItem}) => {
  // TODO: Refactor so not sorting everytime, save it beforehand
  // let descendingDates = [];
  // if (dates.length) {
  //
  // } else {
  //   descendingDates.push('<Text>""</Text>');
  // }
  // dates.length ? dates.sort((a,b) => new Date(b.date) - new Date(a.date))
  //
  // return(
  //   <ScrollView horizontal style={styles.recentDaysContainer}>
  //     {descendingDates.forEach(day)}
  //   </ScrollView>
  // )

  let dateStrings = habitProps.dates.map(d => [moment(d.date).format('YYYY-MM-DD'), d])
  let startDate = new moment(habitProps.start_date);
  let today = new moment();

  let allDates = getDates(startDate, today);

  // console.log('### all dates (pre)', allDates)
  // console.log('@@@ date strings', dateStrings);

  allDates = allDates.sort((a,b) => new Date(b[0].toString()) - new Date(a[0].toString()) ).map(d=> {
    console.log('>>> inside d', d)
    console.log('datestring', dateStrings)
    let justDates = dateStrings.map(d => d[0]);
    let indexDate = justDates.indexOf(d[0].toString());
    if (indexDate > -1) {
    // if(justDates.includes(d[0].toString())) {
      let day = {
        id: dateStrings[indexDate][1].date,
        date: dateStrings[indexDate][1].date,
        // date: d[0].toString(),
        picture: dateStrings[indexDate][1].picture,//'https://thumb1.shutterstock.com/display_pic_with_logo/3679397/381480943/stock-photo-motivational-quote-on-glitter-abstract-background-381480943.jpg',
      }

      return <Day day={day} habitProps={habitProps} onPressItem={onPressItem}/>
    } else {
      let day = {
        id: 0,
        date: d[0].toString(),
        picture: 'https://thumb1.shutterstock.com/display_pic_with_logo/162265/276671360/stock-photo-motivational-quote-to-create-future-on-nature-abstract-background-276671360.jpg',
      }
      return <Day day={day} habitProps={habitProps} onPressItem={onPressItem}/>

    }
  });

  console.log('### all dates for habit', habitProps.name, allDates)

  // allDates.sort((a,b) => new Date(b.date) - new Date(a.date))

  let days = dates.length ? dates.sort((a,b) => new Date(b.date) - new Date(a.date)).map((day) => {
    let today = moment(day.date)
    if (day.id === 106) {
      // return <Text>''</Text>
      let day = {
        id: 0,
        date: "2017-06-01T04:00:00.000Z",
        picture: 'https://thumb1.shutterstock.com/display_pic_with_logo/3679397/381480943/stock-photo-motivational-quote-on-glitter-abstract-background-381480943.jpg',
      }
      return <Day day={day} habitProps={habitProps} />
    } else {
      return <Day key={day.id} day={day} habitProps={habitProps} onPressItem={onPressItem} />
    }
  }) : <Text>''</Text>



  return(
    <ScrollView horizontal style={styles.recentDaysContainer}>
      {/* {days} */}
      { allDates }
    </ScrollView>
  )


  // return(
  //   <ScrollView horizontal style={styles.recentDaysContainer}>
  //     {dates.length ? dates.sort((a,b) => new Date(b.date) - new Date(a.date)).map((day) => {
  //       let today = moment(day.date)
  //
  //       return <Day key={day.id} day={day} habitProps={habitProps} onPressItem={onPressItem} />
  //     }) : <Text>''</Text>}
  //   </ScrollView>
  // )
}

const styles = StyleSheet.create({
  recentDaysContainer: {
    flexDirection: 'row',
  }
});

export default RecentDays
