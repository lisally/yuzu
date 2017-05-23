import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
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
      match: this.props.match,
      message: "",
     };
  }

  // componentDidMount() {

  // }

  render() {
    const { menuStyle, messageStyle, bottomContainerStyle, backTextStyle, inputStyle, usernameStyle, buttonStyle, buttonTextStyle } = styles

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
        
        {/*
        <Text style={usernameStyle}>
          *this.state.match.username
          mochacakes
        </Text>
        <View style={{ alignSelf: 'center', borderColor: '#ddd', borderBottomWidth: 1, paddingTop: 5, width: 300 }} />
        */}

        <ScrollView>
        </ScrollView>


        <View style={bottomContainerStyle}>
          <Text style={backTextStyle} onPress={this.onBack.bind(this)}>
            ‹
          </Text>

          <TextInput
            placeholder="Aa"
            style={inputStyle}
            value={this.state.message}
            onChangeText={message => this.setState({ message })}
          />

          <TouchableOpacity activeOpacity={0.8} onPress={this.onSendMessage.bind(this)}>
            <View style={buttonStyle}>
            <Text style={buttonTextStyle}>
            ‹
            </Text>
            </View>
          </TouchableOpacity>

        </View> 


      </View>


    )
  }

  onSendMessage() {

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
  bottomContainerStyle: {
    flexDirection: 'row',
  },
  backTextStyle: {
    color: '#89bc4f',
    fontSize: 40,
    marginLeft: 10
  },
  inputStyle: {
    width: 300,
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    borderWidth: 1,   
    borderRadius: 10,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 10,
    color: '#404040',
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
  usernameStyle: {
    paddingTop: 5, 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#404040', 
    borderColor: '#ddd', 
    borderBottomWidth: 1,
  },
  buttonStyle: {
    height: 40,
    backgroundColor: '#89bc4f',
    width: 35,
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 28,
    transform: [{ rotate: '90deg'}]
  }
}




export default MessageScene