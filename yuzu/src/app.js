import React, { Component } from 'react';
import { ScrollView, View, Navigator } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Input } from './components/common';
import LoginScene from './components/LoginScene';
import LocationScene from './components/LocationScene';
import MainScene from './components/MainScene'
import SearchScene from './components/SearchScene'

// Yuzu Colors
// #557123
// #f6c501
// #89bc4f
// #dddee2


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: null, header: null, user: null };
  }
  componentWillMount() {
    console.disableYellowBox = true;
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
        this.setState({ loggedIn: true, user: user.uid });
      } else {
        this.setState({ loggedIn: false, user: null });
      }
    });
  }


  render() {
    return (
      <View style={{flex:1}}>
        <Header image={false} />
        <Navigator
          ref={(ref) => this._navigator = ref}
          configureScene={this.configureScene.bind(this)}
          renderScene={this.renderScene.bind(this)}
          initialRoute={{
            title: 'Main',
            //title: 'Location',
            //title: 'Search',
            passProps: {
              user: this.state.user,
            },
            type: 'forward'

          }}
        />
      </View>
    );
  }  

  renderScene(route, navigator) {
    switch(this.state.loggedIn) {
      case true:
        switch(route.title) {
          case 'Location':
            route.passProps.user = this.state.user
            return (
                // <View>
                  // <Header />
                  <LocationScene {...route.passProps} navigator={navigator} />
                // </View>
            )
          case 'Login':
            return <LoginScene {...route.passProps} navigator={navigator} />
          case 'Main':
            return (
              // <View>
                // <Header />
                <MainScene {...route.passProps} navigator={navigator} />
              // </View>
            )
          case 'Search':
            return (
              // <View>
                // <Header />
                <SearchScene {...route.passProps} navigator={navigator} />
              // </View>
            )
          default:
            return <Spinner size="large"/>;
        }
      case false:
        return <LoginScene {...route.passProps} navigator={navigator} />;
      default: 
        return <Spinner size="large"/>;
    }
  }

  configureScene(route, routeStack) {
    if (route.type == 'backward') {
      return Navigator.SceneConfigs.SwipeFromLeft
    } else {
      return Navigator.SceneConfigs.PushFromRight
    }
  }


}

export default App;
