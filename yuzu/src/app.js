import React, { Component } from 'react';
import { ScrollView, View, Navigator } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Input } from './components/common';
import SignInScene from './components/SignInScene';
import LocationScene from './components/LocationScene';
import MainScene from './components/MainScene'
import SearchScene from './components/SearchScene'
import SignUpScene from './components/SignUpScene'
import MenuScene from './components/MenuScene'
import MessageListScene from './components/MessageListScene'
import MessageScene from './components/MessageScene'



// Yuzu Colors
// #557123
// #f6c501
// #89bc4f
// #dddee2
// avenir

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: null, header: null, user: null, menu: false };
  }

  componentWillMount() {
    console.disableYellowBox = true;
    firebase.initializeApp({
      apiKey: "AIzaSyCvtsgKNrudXHeGX2Rb-iq9OHUJwORwGo4",
      authDomain: "yuzume-acb17.firebaseapp.com",
      databaseURL: "https://yuzume-acb17.firebaseio.com",
      projectId: "yuzume-acb17",
      storageBucket: "yuzume-acb17.appspot.com",
      messagingSenderId: "1037747366460"
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
        <Navigator
          ref={(ref) => this._navigator = ref}
          configureScene={this.configureScene.bind(this)}
          renderScene={this.renderScene.bind(this)}
          initialRoute={{
            //title: 'Main',
            title: 'Location',
            //title: 'Search',
            //title: 'SignUp',
            //title: 'SignIn',
            //title: 'Menu',
            //title: 'MessageList',
            //title: 'Message',
            passProps: {
              user: this.state.user,
              type: 'forward'
            }
          }}
        />
      </View>
    );
  }

  renderScene(route, navigator) {
    switch(this.state.loggedIn) {
      // Logged in
      case true:
        switch(route.title) {
          case 'Menu':
            route.passProps.user = this.state.user
            return <MenuScene {...route.passProps} navigator={navigator} />   
          case 'Location':
            route.passProps.user = this.state.user
            return (
              <View style={{flex:1}}>
                <LocationScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'Main':
            route.passProps.user = this.state.user               
            return (
              <View style={{flex:1}}>
                <Header />
                <MainScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'Search':
            route.passProps.user = this.state.user            
            return (
              <View style={{flex:1}}>
                <SearchScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'MessageList':
            route.passProps.user = this.state.user            
            return (
              <View style={{flex:1}}>
                <MessageListScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'Message':
            route.passProps.user = this.state.user            
            return (
              <View style={{flex:1}}>
                <MessageScene {...route.passProps} navigator={navigator} />
              </View>
            )
          default:
            return <Spinner size="large"/>;
        }
      
      // Not logged in
      case false:     
        switch(route.title) {
          case 'SignIn':                   
            return <SignInScene {...route.passProps} navigator={navigator} />;
          case 'SignUp':                       
            return <SignUpScene {...route.passProps} navigator={navigator} />;
          default: 
            return <SignInScene {...route.passProps} navigator={navigator} />;
        }

      // Loading 
      default: 
        return <Spinner size="large"/>;
    }
  }

  configureScene(route, routeStack) {
    if (route.passProps.type == 'backward') {
      return Navigator.SceneConfigs.PushFromLeft
    } else if (route.passProps.type == 'forward') {
      return Navigator.SceneConfigs.PushFromRight
    } else if (route.passProps.type == 'menu') {
      return Navigator.SceneConfigs.SwipeFromLeft
    }
    // } else if (route.passProps.type == 'match') {
    //   return Navigator.SceneConfigs.FloatFromBottom
    //   // return Navgiator.SceneConfigs.FloatFromBottomAndroid      
    // } else if (route.passProps.type == 'matchBack') {
    //   return Navigator.SceneConfigs.VerticalDownSwipeJump      
    // }
  }
}

export default App;
