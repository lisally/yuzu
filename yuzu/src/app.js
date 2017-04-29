import React, { Component } from 'react';
import { ScrollView, View, Navigator } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Input, TextButton } from './components/common';
import LoginScene from './components/LoginScene';
import LocationScene from './components/LocationScene';

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
        this.setState({ loggedIn: false, header: "Yuzu" });
      }
    });
  }

  render() {
    
    return (
      
      <View style={{flex:1}}>
        <Header headerText={this.state.header} />
        {this.renderContent()}
      </View>
    );
  }  

  // renderScene(route, navigator) {
  //   if (route.name == 'Login') {
  //     return <LoginScene navigator={navigator} {...route.passProps} />
  //   }
  //   if (route.name == 'Location') {
  //     return <LocationScene navigator={navigator} {...route.passProps} />
  //   }

  //   return <Spinner size="large" />
  // }

  // _navigate() {
  //   this.props.navigator.push({
  //     name: 'Login'
  //   })
  // }

renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <ScrollView>
            <LocationScene />

            <TextButton onPress={() => firebase.auth().signOut()}>
              Sign Out
            </TextButton>
          </ScrollView>
        )
      case false:
        return <LoginScene />;
      default:
        return <Spinner size="large"/>;
    }
  }

}

export default App;
