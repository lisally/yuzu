import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail, MatchDetail } from './common';
import firebase from 'firebase'

class MessageScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ref: firebase.database().ref(),
      // location: this.props.location,
      location: 'Seattle',
      user: this.props.user, 
     };
  }

  // componentDidMount() {

  // }

  render() {
    const { menuStyle, messageStyle, backStyle, backTextStyle } = styles

    return (
      <View style={{flex:1}}>
        <TouchableHighlight onPress={this.onYuzuPress.bind(this)}>
          <View style={{ height: 35, width: 105, position: 'absolute', marginTop: -45, marginLeft: 130 }} />
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
          <Image style={menuStyle} source={require('../images/menu.png')} />
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onMessagePress.bind(this)}>
          <Image style={messageStyle} source={require('../images/message.png')} />
        </TouchableHighlight>
      
        <ScrollView>
        </ScrollView>


        <View style={backStyle}>
          <Text style={backTextStyle} onPress={this.onBack.bind(this)}>
            ‹
          </Text>
        </View> 


      </View>


    )
  }


  onBack() {
    this.props.navigator.push({
      title: this.props.back,
      passProps: {
        user: this.props.user,
        type: 'backward',
        location: this.props.location
      },
    })
  }

  onMenuPress() {
    this.props.navigator.push({
      title: 'Menu',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        screen: 'Message',
        type: 'menu'
      }
    })
  }

  onYuzuPress() {
    this.props.navigator.push({
      title: 'Main',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        type: 'backward'
      }
    })
  }

  onMessagePress() {
    this.props.navigator.push({
      title: 'MessageList',
      passProps: {
        user: this.props.user,
        type: 'backward',
        location: this.props.location
      }
    })
  }

}

const styles = {
  backStyle: {
    marginLeft: 10
  },
  backTextStyle: {
    color: '#89bc4f',
    fontSize: 40
  },
  menuStyle: {
    width: 22,
    height: 20,
    marginTop: -38,
    marginLeft: 14
  },
  messageStyle: {
    width: 28,
    height: 28,
    marginTop: -42,
    marginLeft: 335  
  },
}




export default MessageScene