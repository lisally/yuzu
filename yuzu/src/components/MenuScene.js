import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native';
// import { Drawer } from 'native-base'
import { MenuDetail } from './common';
import firebase from 'firebase'

class MenuScene extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        user: this.props.user
     };
}

  render() {
    return (
    <View>
      <View style={styles.viewStyle}>
        <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
          <Image style={styles.menuStyle} source={require('../images/menu.png')} />
        </TouchableHighlight>
        <Image style={styles.imageStyle} source={require('../images/header.png')} />
      </View>

      <MenuDetail onPress={this.onProfilePress.bind(this)}>
        Profile
      </MenuDetail>

      <MenuDetail onPress={this.onSettingsPress.bind(this)}>
        Settings
      </MenuDetail>

      <MenuDetail onPress={this.onTermsPress.bind(this)}>
        Terms and Conditions
      </MenuDetail>

      <MenuDetail onPress={this.onSignOutPress.bind(this)}>
        Sign Out
      </MenuDetail> 

    </View>
   )
  }

  onProfilePress() {

  }

  onSettingsPress() {

  }

  onTermsPress() {

  }

  onSignOutPress() {
    firebase.database().ref('matches/' + this.props.location + '/' + this.props.user + '/').remove()
    firebase.database().ref('users/' + this.props.user + '/matchingStatus/').set({ matching: false })
    firebase.auth().signOut()
    // firebase.database().ref('matches/' + this.props.location + '/' + this.props.user + '/').remove()    

    this.props.navigator.push({
      title: 'SignIn',
      passProps: {
        user: null,
        type: 'backward'
      }
    })
  }

  onMenuPress() {
    this.props.navigator.push({
      title: this.props.screen,
      passProps: {
        user: this.props.user,
        location: this.props.location,
        type: 'forward'
      }
    })
  }

}

const styles = {
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
    flexDirection: 'row'
  },
  imageStyle: {
    width: 110,
    height: 34
  },
  menuStyle: {
    width: 22,
    height: 20,
    marginLeft: -115
  }
};



export default MenuScene