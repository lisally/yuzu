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
// import MatchScene from './components/MatchScene'
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
      {/*<View>*/}
        {/*<Header onPress={this.onMenuPress.bind(this)}/>*/}
        <Navigator
          ref={(ref) => this._navigator = ref}
          configureScene={this.configureScene.bind(this)}
          renderScene={this.renderScene.bind(this)}
          initialRoute={{
            //title: 'Main',
            //title: 'Location',
            //title: 'Search',
            //title: 'SignUp',
            //title: 'SignIn',
            //title: 'Menu',
            //title: 'MessageList',
            title: 'Message',
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
            // return <LocationScene {...route.passProps} navigator={navigator} />
            return (
              <View style={{flex:1}}>
                <Header />
                <LocationScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'Main':
            route.passProps.user = this.state.user               
            // return <MainScene {...route.passProps} navigator={navigator} />
            return (
              <View style={{flex:1}}>
                <Header />
                <MainScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'Search':
            route.passProps.user = this.state.user            
            // return <SearchScene {...route.passProps} navigator={navigator} />
            return (
              <View style={{flex:1}}>
                <Header />
                <SearchScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'MessageList':
            route.passProps.user = this.state.user            
            // return <MessageScene {...route.passProps} navigator={navigator} />
            return (
              <View style={{flex:1}}>
                <Header />
                <MessageListScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'Message':
            route.passProps.user = this.state.user            
            // return <MessageScene {...route.passProps} navigator={navigator} />
            return (
              <View style={{flex:1}}>
                <Header />
                <MessageScene {...route.passProps} navigator={navigator} />
              </View>
            )
          // case 'Match':
          //   route.passProps.user = this.state.user               
          //   return (
          //     <View style={{flex:1}}>
          //       <Header />
          //       <MatchScene {...route.passProps} navigator={navigator} />
          //     </View>
          //   )
          /*case 'SignIn':
            // return <SignInScene {...route.passProps} navigator={navigator} />
            return (
              <View style={{flex:1}}>
                <Header onPress={this.onMenuPress.bind(this)}/>
                <SignInScene {...route.passProps} navigator={navigator} />
              </View>
            )
          case 'SignUp':                 
            // return <SignUpScene {...route.passProps} navigator={navigator} />
            return (
              <View style={{flex:1}}>
                <Header onPress={this.onMenuPress.bind(this)}/>
                <SignUpScene {...route.passProps} navigator={navigator} />
              </View>
            )*/
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
