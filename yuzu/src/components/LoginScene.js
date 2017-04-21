import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner, TextButton } from './common';

class LoginScene extends Component {
  state = { email: '', password: '', error: '', loading: false, hasAccount: true, password2: '', option: 'Sign up' };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }
  

  onLoginFail() {
    if (this.state.hasAccount) {
      this.setState({ error: "                    Sign in failed. \nPlease check your email and password.", loading: false });
    } else {
      this.setState({ error: 'Please check that your passwords match.'})
    }
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
      hasAccount: true
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    if (this.state.hasAccount) {
      return (
        <Button onPress={this.onButtonPress.bind(this)}>
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

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      {/*</Card>*/}

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

  onSignUpPress() {
    if (this.state.password == this.state.password2) {
      const { email, password } = this.state;
      this.setState({ error: '', loading: true, password2: '', hasAccount: true });

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
    } else {
      this.onLoginFail()
    }
  }
  
  signIn() {
    this.setState({ hasAccount: true, option: 'Sign up'})
  }

  signUp() {
    this.setState({ hasAccount: false, option: 'Sign in' })
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