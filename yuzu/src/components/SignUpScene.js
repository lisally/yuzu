import React, { Component } from 'react';
import { Text, View, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner, TextButton } from './common';

class SignUpScene extends Component {
  constructor(props) {
    super(props)
    this.state = { ref: firebase.database().ref(), fname: '', lname: '', username: '', email: '', password: '', password2: '', error: '', loading: false,};
    
  }

  render() {    
    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View>  
          <View style={styles.viewStyle}>
            <Image style={styles.imageStyle} source={require('../images/header.png')} />
          </View>
          <CardSection>
            <Input
              placeholder="spongebob"
              label="First Name"
              value={this.state.fname}
              onChangeText={fname => this.setState({ fname })}
            />
          </CardSection>

          <CardSection>
            <Input
              placeholder="squarepants"
              label="Last Name"
              value={this.state.lname}
              onChangeText={lname => this.setState({ lname })}
            />
          </CardSection>

          <CardSection>
            <Input
              placeholder="squidward"
              label="Username"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            />
          </CardSection>

          <CardSection>
            <Input
              keyboardType='email-address'
              placeholder="spongebob@mail.com"
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

          <CardSection>
            <Input
              secureTextEntry
              placeholder="password"
              label="Re-enter"
              value={this.state.password2}
              onChangeText={password2 => this.setState({ password2 })}
            />
          </CardSection>

          {this.renderSignUp()}
          {this.renderError()}
          {this.renderSignIn()}
      </View>
      </TouchableWithoutFeedback>
    );
  }

  renderSignIn() {
    if (!this.state.loading) {
      return (
        <View style={{paddingTop: 6, justifyContent: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: '#404040',}}>Already have an account?</Text>
          <Text style={{fontSize: 16, color: '#89bc4f',}} onPress={this.onSignInPress.bind(this)}> Sign in </Text>
        </View>
      )
    }
  }

  renderSignUp() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onSignUpPress.bind(this)}>
        Sign up
      </Button>
    )
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
    this.props.navigator.push({
      title: 'SignIn',
      passProps: {
        user: this.props.user, 
        type: 'backward'
      }
    })
  }

  onSignUpPress() {
    Keyboard.dismiss()

    if (this.state.password == this.state.password2) {
      const { email, password } = this.state;
      this.setState({ error: '', loading: true, password2: '' });

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onSignUpSuccess.bind(this)) 
        .catch((error) => {
          switch(error.code) {
            case 'auth/email-already-in-use':
              this.setState({ error: "Email address already in use", loading: false })
              return
            case 'auth/invalid-email':
              this.setState({ error: "Invalid email address", loading: false })
              return                       
            case 'auth/weak-password':
              this.setState({ error: error.message, loading: false })
              return              
          }
        })
    } else {
      this.onSignUpFail()
    }
  }

  onSignUpFail() {
    this.setState({ error: 'Please check that your passwords match.', loading: false })
  }

  onSignUpSuccess(user) {  
    firebase.database().ref('users/' + user.uid + '/profile/')
      .set({
        username: this.state.username,
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        uid: user.uid
      })

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
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    paddingTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    position: 'relative',
    paddingRight: 5,
  },
  imageStyle: {
    width: 110,
    height: 34
  }
};

export default SignUpScene;