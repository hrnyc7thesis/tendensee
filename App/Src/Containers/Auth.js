import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, StyleSheet, Button, Modal } from 'react-native';
import { auth } from '../Actions/AuthActions.js'
import { addHabit } from '../Actions/HabitActions.js'

class Auth extends Component {
  //LATER - REDUX to get rid of constructor?
  constructor (props) {
    super (props);
    this.state = {
      route: 'SignUp',
      username: '',
      password: '',
      email: '',
      //MODAL >
        animationType: 'none',
        modalVisible: false,
        transparent: false,
        // LATER ADD OTHER PROPS TO HABIT!
        habitName: '',
        habitType: ''
    };
  }

  userLogin (e) {
    e.preventDefault();
    this.props.onLogin(this.state.username, this.state.password, this.state.email, this.state.route);
    this._setModalVisible(true);
  }

  addHabit (e) {
    e.preventDefault();
    let habit = {name: this.state.habitName, type: this.state.habitType}
    this.props.onAddHabit(this.props.userData, habit);
    this._setModalVisible(false);
  }

  toggleRoute (e) {
    e.preventDefault();
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    this.setState({ email: '' });
  }

  _setModalVisible (visible) {
    this.setState({modalVisible: visible});
  };

  _setAnimationType (type) {
    this.setState({animationType: type});
  };



  render() {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    let showEmail = styles.textInput;
    showEmail.display = this.state.route === 'Login' ? 'none' : 'flex';
    return (
      <View>
        <View style={styles.container}>
          <Text style = {{fontSize: 27}}> {this.state.route}</Text>
          <View style = {{ margin: 7 }} />
          <TextInput
            style={styles.textInput}
            placeholder='Username'
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={true}
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })} />
          <View style = {{ margin: 7 }} />
          <TextInput
            style={showEmail}
            placeholder='E-mail'
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={true}
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })} />
          <View style = {{ margin: 7 }} />
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={true}
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })} />
          <View style = {{ margin: 7 }} />
          <Button onPress={e => this.userLogin(e)} title={this.state.route} />
          <Text style={{fontSize: 16, color: 'blue'}} onPress={e => this.toggleRoute(e)}>{alt}</Text>
          <View style = {{ margin: 7 }} />
        </View>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
          >
          <View style={styles.container}>
            <Text>Enter New Habit: </Text>
            <TextInput
              style={styles.textInput}
              placeholder='Habit'
              autoCapitalize='none'
              autoCorrect={false}
              autoFocus={true}
              value={this.state.habit}
              onChangeText={(text) => this.setState({ habitName:text, habitType: text})} />
            <Button onPress={e => this.addHabit(e)} title='Add New Habit' />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  wraps: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
      height: 80,
      fontSize: 30,
      backgroundColor: '#FFF',
      display: 'flex',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userData: state.user.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password, email, route) => { dispatch (auth(username, password, email, route)); },
    onAddHabit: (userData, habit) => { dispatch (addHabit(userData, habit)); },
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);

