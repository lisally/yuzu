import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native';
import { MenuDetail } from './common';
import firebase from 'firebase'

class MenuScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ref: firebase.database().ref(),
        user: this.props.user, 
        location: this.props.location,
        showLocation: this.props.showLocation
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

       {this.renderShowLocation()} 

      {/*<MenuDetail onPress={this.onProfilePress.bind(this)}>
        Profile
      </MenuDetail>

      <MenuDetail onPress={this.onSettingsPress.bind(this)}>
        Settings
      </MenuDetail>

      <MenuDetail onPress={this.onTermsPress.bind(this)}>
        Terms and Conditions
      </MenuDetail>*/}

      <MenuDetail onPress={this.onSignOutPress.bind(this)}>
        Sign Out
      </MenuDetail> 

    </View>
   )
  }

  renderShowLocation() {
    if (this.state.showLocation) {
      return (
      <MenuDetail onPress={this.onChangeLocationtPress.bind(this)}>
        Change Location
      </MenuDetail> 
      )
    }
  }

  onProfilePress() {

  }

  onSettingsPress() {

  }

  onTermsPress() {

  }

  onChangeLocationtPress() {
    this.props.navigator.push({
      title: 'Location',
      passProps: {
        user: this.props.user,
        type: 'forward',
        location: null
      }
    })
  }

  onSignOutPress() {
    const { ref, user, location} = this.state
    ref.child('users/' + user + '/itemList/').once('value', snapshot => {
      if (snapshot.val() != null) {
        snapshot.forEach(function(item) {
          ref.child('matches/' + location + '/' + item.val().Product).once('value', snapshot2 => {
            if (snapshot2.val() != null) {
              var users = snapshot2.val()
              if (users.indexOf(user) != -1) {
                users.splice(users.indexOf(user), 1)
                ref.child('matches/' + location + '/' + item.val().Product + '/').set(users)
              }
            }
          })
        })
        ref.child('users/' + user + '/matchingStatus/').set(false)
        ref.child('users/' + user + '/itemMatchList/').remove()
        ref.child('users/' + user + '/userMatchList/').remove()                        
        firebase.auth().signOut()      
      }
    })    
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
    height: 22,
    marginLeft: -115
  }
};



export default MenuScene