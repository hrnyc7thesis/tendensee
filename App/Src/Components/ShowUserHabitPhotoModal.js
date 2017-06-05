import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, Image} from 'react-native';
import { Container, Card, ActionSheet, Text, Button, H1, H3 } from 'native-base';
import { hideModal } from './../Actions/ModalActions';
import Modal from 'react-native-modal';
const moment = require('moment');

const ShowUserHabitPhotoModal = ({photo, dispatch}) => {
  return (
    <Container>
      <Modal transparent={true} visible={true}>
        <Card>
          <View style={styles.card}>
            <View style={{alignItems: 'center'}}>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <H1>{photo.habitName}</H1>
              </View>
              <Text>{moment(photo.date).format("dddd, MMMM Do")}</Text>
              <Image source={{uri: photo.picture}} style={{height: 400, width: 280}} resizeMode='contain'/>
              <View>
                <Button transparent onPress={() => dispatch(hideModal())}>
                  <Text>Cancel</Text>
                </Button>
              </View>
            </View>
          </View>
        </Card>
      </Modal>
    </Container>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 15
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
    photo: ownProps.photo,
  })
)(ShowUserHabitPhotoModal)
