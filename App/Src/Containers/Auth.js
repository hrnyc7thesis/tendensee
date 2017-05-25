import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { auth } from '../Actions/AuthActions.js'

class Auth extends Component {
  //LATER - REDUX to get rid of constructor?
  constructor (props) {
    super (props);
    this.state = {
      route: 'SignUp',
      username: '',
      password: '',
      email: '',
    };
  }

  userLogin (e) {
    e.preventDefault();
    this.props.onLogin(this.state.username, this.state.password, this.state.email, this.state.route);
  }

  toggleRoute (e) {
    e.preventDefault();
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    this.setState({ email: '' });
  }



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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password, email, route) => { dispatch (auth(username, password, email, route)); },
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);
