import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import { login } from '../Actions/AuthActions.js'

class Login extends Component {
  //LATER - REDUX to get rid of constructor?
  constructor (props) {
    super (props);
    this.state = {
      route: 'Login',
      username: '',
      password: '',
      email: '',
    };
  }

  userLogin (e) {
    e.preventDefault();
    this.state.email ? 
      this.props.onLogin(this.state.username, this.state.password, this.state.email) :
      this.props.onLogin(this.state.username, this.state.password);
  }

  toggleRoute (e) {
    e.preventDefault();
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    this.setState({ email: '' });
  }


  render() {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    let showEmail = this.state.route === 'Login' ? '{{ display: "none" }}' : '{{ display: "block" }}'
    return (
      <ScrollView style = {{padding: 20}}>
        <Text style = {{fontSize: 27}}> {this.state.route}</Text>
        <TextInput
          placeholder='Username'
          autoCapitlize='none'
          autoCorrect={false}
          autoFocus={true}
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })} 
        />
        <TextInput
          style={showEmail}
          placeholder='E-mail'
          autoCapitlize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })} 
        />
        <TextInput
          placeholder='Password'
          autoCapitlize='none'
          autoCorrect={false}
          autoFocus={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })} 
        />
        <View style={{ margin: 6 }} />
        <Button onPress={e => this.userLogin(e)} title={this.state.route} />
        <Text style={{fontSize: 16, color: 'blue'}} onPress={e => this.toggleRoute(e)}>{alt}</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => { dispatch (login(username, password)); },
    onSignup: (username, password, email) => { dispatch (signup(username, password, email)); },
  }
}

export default connect (mapDispatchToProps)(Login);
