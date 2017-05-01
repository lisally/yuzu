import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner, TextButton } from './common';

class LoginScene extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', error: '', loading: false, hasAccount: true, password2: '', option: 'Sign up' };
  }
  
  render() {
    return (
      <View style={styles.viewStyle}>
      {/*<Card>*/}
        <CardSection>
          <Input
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

        {this.renderSignUp()}
        {this.renderError()}
        {this.renderSignIn()}
        {this.renderOption()}
      </View>
    );
  }

  renderOption() {
    if (this.state.hasAccount) {
      return (
        <TextButton onPress={this.signUp.bind(this)}>
          {this.state.option}
        </TextButton>
      )
    }
    return (
      <TextButton onPress={this.signIn.bind(this)}>
          {this.state.option}
      </TextButton>
    ) 
  }

  renderSignIn() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    if (this.state.hasAccount) {
      return (
        <Button onPress={this.onSignInPress.bind(this)}>
          Sign in
        </Button>
      );
    } 

    return (
      <Button onPress={this.onSignUpPress.bind(this)}>
        Sign up
      </Button>
    )
  }

  renderSignUp() {
    if (!this.state.hasAccount) {
      return (
        <CardSection>
          <Input
            secureTextEntry
            placeholder="re-enter password"
            label="Re-enter"
            value={this.state.password2}
            onChangeText={password2 => this.setState({ password2 })}
          />
        </CardSection>
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

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onSignUpPress() {
    if (this.state.password == this.state.password2) {
      const { email, password } = this.state;
      this.setState({ error: '', loading: true, password2: '' });

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onSignUpFail.bind(this))
          console.log(this.state.hasAccount)
    } else {
      this.onSignUpFail()
    }
  }

  signIn() {
    this.setState({ hasAccount: true, option: 'Sign up', error: '' })
  }

  signUp() {
    this.setState({ hasAccount: false, option: 'Sign in', error: ''  })
  }

  onLoginFail() {
    this.setState({ error: "                    Sign in failed. \nPlease check your email and password.", loading: false });
  }

  onSignUpFail() {
    this.setState({ error: 'Please check that your passwords match.', loading: false })
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
      hasAccount: true
    })

    this.props.navigator.push({
      title: 'Location',
      passProps: this.props
    })

  }

}

const styles = {
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
  },

  viewStyle: {
        // flex:1,
        // flexDirection:'row',
        // alignItems:'stretch',
        // justifyContent:'center'
  }
};

export default LoginScene;