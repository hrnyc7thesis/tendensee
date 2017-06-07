import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { Button, Card, Form, Item, Input, H1, CardItem, Body } from 'native-base';
import { auth } from '../Actions/AuthActions.js';
import { addHabit } from '../Actions/HabitActions.js';
import { Actions } from 'react-native-router-flux';
import { facebookLogin } from '../Actions/FacebookActions';
import Login from '../Components/Login.js';
import { bindActionCreators } from 'redux';


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

class Auth extends Component {

  componentWillMount() {
    console.log('in auth com, loggedin?', this.props.auth.isLoggedIn)

  }
  constructor (props) {
    super (props);
    this.state = {
      route: 'SignUp',
      username: '',
      password: '',
      email: '',
    };
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  onFacebookLoginPressed() {
    this.props.actions.facebookLogin();
    console.log(this.props);
  }

  disabledButton() {
    this.state.username.length < 3 ? Alert.alert('Username must be at least 3 characters') : Alert.alert('Password must be at least 6 characters');
  }

  userLogin () {
    this.props.onLogin(this.state.username, this.state.password, this.state.email, this.state.route);
  }

  toggleRoute () {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    this.setState({ email: '' });
  }

  render() {
    let enableAuth = this.state.username.length >= 3 && this.state.password.length >=6 ? "" : 'disabled'
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    let showLogin = { display: this.state.route === 'Login' ? 'none' : 'flex'};
    let showEmail = { display: this.state.route === 'Login' ? 'none' : 'flex'};
    let emailMargin = { margin: this.state.route === 'Login' ? 0 : 6 };
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <H1 style={{fontWeight:'bold'}}>tenden|see</H1>
          </View>
          <View style={styles.formContainer}>
            <Form>
              <Item>
                <Input 
                  placeholder='   Username'
                  autoCapitalize='none'
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                />
              </Item>
              <View style = { emailMargin } />
              <Item style={showEmail}>
                <Input
                  placeholder='   E-mail'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  value={this.state.email}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </Item>
              <View style = {{ margin: 6 }} />
              <Item>
                <Input
                  secureTextEntry={true}
                  color='white'
                  autoCapitalize='none'
                  placeholder='   Password'
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </Item>
            </Form>
            <View style={styles.successButton}>
            {true || this.state.username.length >= 3 && this.state.password.length >=6 ? // GET RID OF TRUE TO MAKE WORK
              <Button block success onPress={() => this.userLogin()}>
                <Text style={styles.buttonText}>{this.state.route}</Text>
              </Button> : 
              <Button block warning onPress={() => this.disabledButton()}>
                <Text style={styles.buttonText}>{this.state.route}</Text>
              </Button>}
            </View>
            <View style={styles.successButton}>
              <Login {...this.props} onFacebookLoginPressed={this.onFacebookLoginPressed.bind(this)} />
            </View>
            <View>
              <Button transparent onPress={e => this.toggleRoute()}>
                <Text style={[showLogin, {alignSelf: 'center', color:'white'}]}> Already Have an Account? Login</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1fb7e9',
    marginTop: 40
  },
  formContainer: {
    alignSelf: 'stretch',
    margin:30
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#1fb7e9',
  },
  successButton: {
    marginTop: 12
  },
  buttonText: {
    color: 'white'
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    user: state.user.userData,
    authenticating: state.auth.authenticating,
    authToken: state.auth.authToken,
    authError: state.auth.authError,
    loginText: state.auth.loginText,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password, email, route) => { dispatch (auth(username, password, email, route)); },
    actions: bindActionCreators({ facebookLogin }, dispatch),

  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);
