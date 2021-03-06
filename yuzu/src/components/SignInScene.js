import React, { Component } from 'react';
import { Text, View, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner, TextButton } from './common';

class SignInScene extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', error: '', loading: false, };
  
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View>  
        <View style={{alignItems: 'center', paddingTop: 60, paddingBottom: 40, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
          <Image style={{height: 180, width: 140}} source={require('../images/logo.png')} />
        </View>

        <View>
          <CardSection>
            <Input
              keyboardType='email-address'
              placeholder="user@mail.com"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>

          {this.renderSignIn()}
          {this.renderError()}
          {this.renderSignUp()}

        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }

  renderSignIn() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onSignInPress.bind(this)}>
        Sign in
      </Button>
    );
  }

  renderSignUp() {
    if (!this.state.loading) {
      return (
        <View style={{paddingTop: 6, justifyContent: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: '#404040',}}>Don't have an account?</Text>
          <Text style={{fontSize: 16, color: '#89bc4f',}} onPress={this.onSignUpPress.bind(this)}> Sign up </Text>
        </View>
      )
    }
  }

  renderError() {
    if (this.state.error != '') {
      return (
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
      )
    }
  }

  onSignInPress() {
    const { email, password } = this.state;
    Keyboard.dismiss()

    if (email.length > 0 && password.length > 0) {
      this.setState({ error: '', loading: true });
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onSignInSuccess.bind(this))
        .catch(error => {
          switch(error.code) {
            case 'auth/invalid-email':
              this.setState({ error: "Invalid email address", loading: false })
              return
            case 'auth/user-not-found':
              this.setState({ error: "Email address not found", loading: false })
              return              
            case 'auth/wrong-password':
              this.setState({ error: "Incorrect password", loading: false })
              return              
            case 'auth/user-disabled':
              this.setState({ error: "Account disabled", loading: false })
              return              
          }
        })
    }
  }

  onSignUpPress() {
    this.props.navigator.push({
      title: 'SignUp',
      passProps: {
        user: this.props.user,
        type: 'forward'
      }
    })
  }

  onSignInSuccess(user) {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    })

    this.props.navigator.push({
      title: 'Location',
      passProps: {
        user: user.uid,
        type: 'forward'
      }
    })
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red',
    marginTop: 4,
  },
};

export default SignInScene;