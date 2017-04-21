import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Input, TextButton } from './components/common';
import LoginForm from './components/LoginForm';
import Location from './components/Location'
// import Search from './components/Search'

class App extends Component {
  state = { loggedIn: null, header: '' };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA2KHwa9wuVMqojjgq9vKWVRDzTitzTND0",
      authDomain: "yuzu-f1238.firebaseapp.com",
      databaseURL: "https://yuzu-f1238.firebaseio.com",
      projectId: "yuzu-f1238",
      storageBucket: "yuzu-f1238.appspot.com",
      messagingSenderId: "293647243508"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, header: "Set Location" });
      } else {
        this.setState({ loggedIn: false, header: "Sign in" });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <ScrollView>
            <Location />

            <TextButton onPress={() => firebase.auth().signOut()}>
              Sign Out
            </TextButton>
          </ScrollView>
        )
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large"/>;
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Header headerText={this.state.header} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
