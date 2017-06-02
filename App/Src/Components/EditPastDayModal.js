import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { Alert, Picker, ActionSheetIOS, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, H1, H3 } from 'native-base';
import { editPastDay, hideModal } from './../Actions/ModalActions';
import { updateDay, deleteDay } from './../Actions/DayActions';
import { sendPhoto } from './../Actions/PhotoActions';
import Modal from 'react-native-modal';
import { Actions, ActionConst } from 'react-native-router-flux';
const moment = require('moment');
import { AsyncStorage } from 'react-native'


const EditPastDayModal = ({day, habitProps, dispatch}) => {

  // Link up from database of different habits, should be habit names
  let data = {
    user: {id:habitProps.id_users},
    habits: [],
    token:''
  }

  
  return (
    <Modal style={styles.container} transparent={true} visible={true}>
      <Card>
          <View style={{alignItems: 'center', flex: 1}}>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <H1>{habitProps.name}</H1>
            </View>
            <Text>Mark Completed</Text>
            <Text>{moment(day.date).format("dddd, MMMM Do")}</Text>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Button block style={{marginTop: 10, marginBottom: 10}} onPress={() => {
                dispatch(hideModal());
                Actions.camera({type: ActionConst.RESET, day, habitProps});
              }}>
                <Text>Take Photo</Text>
              </Button>
              <Button block style={{marginTop: 10, marginBottom: 10}} onPress={() => {
                console.log(data);
                dispatch(hideModal());
                dispatch(sendPhoto(data, day, habitProps));
              }}>
                <Text>No Photo</Text>
              </Button>
            </View>
            <View>
              <Button transparent onPress={() => dispatch(hideModal())}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
      </Card>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'center',
  },
  card: {
    margin: 15,
    flex: .5,
  },
  habitName: {
    width: 70,
    alignItems: 'center',
  },
  habitNameTitle: {
    color: 'white',
  },
})

export default connect(
  (state, ownProps) => ({
    day: ownProps.day,
    habitProps: ownProps.habitProps,
  })
)(EditPastDayModal)
