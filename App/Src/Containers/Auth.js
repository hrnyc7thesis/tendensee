import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { Button, Card, Form, Item, Input, H1, H3, CardItem, Body, CheckBox, Icon } from 'native-base';
import { auth } from '../Actions/AuthActions.js';
import { addHabit } from '../Actions/HabitActions.js';
import { Actions } from 'react-native-router-flux';

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

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  userLogin () {
    this.props.onLogin(this.state.username, this.state.password, this.state.email, this.state.route);
  }

  toggleRoute () {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    this.setState({ email: '' });
  }

  render() {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    let showEmail = { display: this.state.route === 'Login' ? 'none' : 'flex'};
    let emailMargin = { margin: this.state.route === 'Login' ? 0 : 6 };
    return (
      <View style={styles.container}>
      <View style = {{ margin: 10 }} />
        <Card>
          <View style={styles.card}>
            <CardItem>
              <H1>{this.state.route}</H1>
            </CardItem>
            <CardItem>
              <Body>
                <View style={styles.formContainer}>
                  <Form>
                    <Item rounded>
                      <Input 
                        placeholder='   Username'
                        autoCapitalize='none'
                        value={this.state.username}
                        onChangeText={(text) => this.setState({ username: text })}
                      />
                    </Item>
                    <View style = { emailMargin } />
                    <Item rounded style={showEmail}>
                      <Input
                        placeholder='   E-mail'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                      />
                    </Item>
                    <View style = {{ margin: 6 }} />
                    <Item rounded>
                      <Input
                        autoCapitalize='none'
                        placeholder='   Password'
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                      />
                    </Item>
                  </Form>
                  <View style={styles.successButton}>
                    <Button block success onPress={e => this.userLogin()}>
                      <Text style={styles.buttonText}>{this.state.route}</Text>
                    </Button>
                  </View>
                  <View style={styles.successButton}>
                    <Button block warning onPress={e => this.toggleRoute()}>
                      <Text style={styles.buttonText}>Rather {alt} than {this.state.route}?</Text>
                    </Button>
                  </View>                  
                </View>
              </Body>
            </CardItem>
          </View>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  formContainer: {
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 5
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
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
    isLoggedIn: state.auth.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password, email, route) => { dispatch (auth(username, password, email, route)); },
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth);
