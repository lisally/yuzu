import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableHighlight, ScrollView, ActivityIndicator, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
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
      // match: 'Jl7CIpVsG3h4RcZEhGzIS2eryFA2',
      message: '',
      showKeyboard: false,
      dateFormat: require('dateformat'),
      messagesLoaded: false,
      loading: false, 
      messageList: []
     };
  }

  componentDidMount() {
    const { user } = this.state
    this.messageRef = firebase.database().ref('users/' + user + '/messageList/')

    this.messageRef.on('child_added', (snapshot) => {
      console.log('child_added')
      this.setState({ messagesLoaded: false })
      
    })

    this.messageRef.on('child_changed', (snapshot) => {
      console.log('child_changed')
      this.setState({ messagesLoaded: false })
      
    })

  }

  render() {
    const { menuStyle, messageStyle, bottomContainerStyle, backTextStyle, inputStyle, usernameStyle, buttonStyle, buttonTextStyle } = styles

    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard.bind(this)} >
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
          {this.renderMessages()}
        </ScrollView>


        <View style={bottomContainerStyle}>
          <Text style={backTextStyle} onPress={this.onBack.bind(this)}>
            ‹
          </Text>

          <TextInput
            ref={'messageInput'}
            placeholder="Aa"
            style={inputStyle}
            value={this.state.message}
            onChangeText={message => this.setState({ message })}
            onFocus={this.showKeyboard.bind(this)}
            onEndEditing={this.hideKeyboard.bind(this)}
          />

          <TouchableOpacity activeOpacity={0.8} onPress={this.onSendMessage.bind(this)}>
            <View style={buttonStyle}>
            <Text style={buttonTextStyle}>
            ‹
            </Text>
            </View>
          </TouchableOpacity>

        </View> 

        {this.renderShowKeyboard()}
        
      </View>
      </TouchableWithoutFeedback>
    )
  }

  onSendMessage() {
    const { ref, user, match, message, date, dateFormat } = this.state
    Keyboard.dismiss()
    this.setState({ showKeyboard: false, message: '' })
    this.refs['messageInput'].setNativeProps({text: ''});

    if (message.length > 0) {
      var dateString = dateFormat(+new Date, "mmmm dS, h:MM TT")

      var messageObj = {
        sender: user,
        text: message,
        time: dateString
      }

      ref.child('users/' + match + '/messageList/' + user + '/messages/').once('value', snapshot => {
        if (snapshot.val() == null) {
          ref.child('users/' + match + '/messageList/' + user + '/messages/').set([messageObj])
          ref.child('users/' + user + '/messageList/' + match + '/messages/').set([messageObj])        
          
        } else {
          var messages = snapshot.val()
          messages.push(messageObj)
          ref.child('users/' + user + '/messageList/' + match + '/messages/').set(messages)          
          ref.child('users/' + match + '/messageList/' + user + '/messages/').set(messages)
        }
      })
    }
  }

  renderMessages() {
    const { ref, user, match, loading, messagesLoaded, messageList } = this.state

    if (loading) {
      return (
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingTop: 200 }}>
            <ActivityIndicator size='large' />
          </View>
        )
    }

    if (!messagesLoaded) {
      this.setState({ loading: true })
      list = []

      ref.child('users/' + user + '/messageList/' + match + '/messages/').once('value', snapshot => {
        if (snapshot.val() != null) {
          this.setState({ messageList: snapshot.val(), loading: false, messagesLoaded: true })
        } else {
          this.setState({ loading: false, messagesLoaded: true })
        }
        
      })
    }

    return (
      messageList.map(message =>
        <Text>{message.sender}: {message.text}</Text>
      )
    )


  }

  showKeyboard() {
    this.setState({ showKeyboard: true })
  }

  hideKeyboard() {
    this.setState({ showKeyboard: false })    
  }

  renderShowKeyboard() {
    if (this.state.showKeyboard) {
      return <View style={{ height: 258 }} />
    }
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
    backgroundColor: '#F8F8F8',
    paddingTop: 10,
    paddingBottom: 10
  },
  backTextStyle: {
    color: '#89bc4f',
    fontSize: 40,
    marginLeft: 10,
    marginTop: -8
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
    backgroundColor: 'white'
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