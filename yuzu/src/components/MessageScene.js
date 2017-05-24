import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableHighlight, ScrollView, ActivityIndicator, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, MessageSenderDetail, MessageMatchDetail } from './common';
import firebase from 'firebase'

class MessageScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ref: firebase.database().ref(),
      // location: this.props.location,
      location: 'Seattle',
      user: this.props.user,
      match: this.props.match.uid,
      matchUsername: this.props.match.username,
      message: '',
      showKeyboard: false,
      dateFormat: require('dateformat'),
      messagesLoaded: false,
      loading: false, 
      messageList: [],
      // match: '4Ind4pawLnd0rmTPdb5mKhkK4MG3',
      // matchUsername: 'saladsalsa'

     };
  }

  // TO DO:
  //  styling
  //  adding profile to user's messageList when matched-user msgs user
  //  show shared items in chat
  //  message notifications?

  componentDidMount() {
    const { user } = this.state
    this.messageRef = firebase.database().ref('users/' + user + '/messageList/')

    this.messageRef.on('child_added', (snapshot) => {
      this.setState({ messagesLoaded: false })
      
    })

    this.messageRef.on('child_changed', (snapshot) => {
      this.setState({ messagesLoaded: false })
      
    })

  }

  render() {
    const { viewStyle, messageStyle, bottomContainerStyle, backStyle, backTextStyle, inputStyle, usernameStyle, usernameContainerStyle, buttonStyle, buttonTextStyle } = styles

    return (
      <View style={{flex:1}}>
        
        {/*
        // <TouchableHighlight onPress={this.onYuzuPress.bind(this)}>
        //   <View style={{ height: 35, width: 105, position: 'absolute', marginTop: -45, marginLeft: 130 }} />
        // </TouchableHighlight>
        
        <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
          <Image style={menuStyle} source={require('../images/menu.png')} />
        </TouchableHighlight>
        */}

        <View style={viewStyle}>
          <View style={usernameContainerStyle}> 
            <Text style={usernameStyle}>
              {this.state.matchUsername}
            </Text>
          </View>
        </View>

          <TouchableOpacity style={backStyle} onPress={this.onBack.bind(this)}>
            <Text style={backTextStyle}>
              ‹
            </Text>
          </TouchableOpacity>
    
        <TouchableWithoutFeedback onPress={this.hideKeyboard.bind(this)} >
        <ScrollView 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{
              this.scrollView.scrollToEnd({animated: false});
          }}
        >
          <View style={{ marginTop: 7 }}>
          {this.renderMessages()}
          </View>
        </ScrollView>
        </TouchableWithoutFeedback>


        <View style={bottomContainerStyle}>
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
      // </TouchableWithoutFeedback>
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
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingBottom: 250 }}>
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

    var result = []

    messageList.forEach(function(msg) {
      if (msg.sender == user) {
        result.push(<MessageSenderDetail message={msg} />)
      } else {
        result.push(<MessageMatchDetail message={msg} />)        
      }
    })
    
    
    // this.scrollView.scrollToEnd({ animated: false })

    return result

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
    Keyboard.dismiss()
    this.setState({ showKeyboard: false })

    this.props.navigator.push({
      title: this.props.back,
      passProps: {
        user: this.props.user,
        type: 'backward',
        location: this.props.location
      },
    })
  }

  // onMenuPress() {
  //   Keyboard.dismiss()
  //   this.setState({ showKeyboard: false })

  //   this.props.navigator.push({
  //     title: 'Menu',
  //     passProps: {
  //       user: this.props.user,
  //       location: this.props.location,
  //       screen: 'Message',
  //       type: 'menu',
  //     }
  //   })
  // }

  onYuzuPress() {
    Keyboard.dismiss()
    this.setState({ showKeyboard: false })
    this.props.navigator.push({
      title: 'Main',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        type: 'backward'
      }
    })
  }

  // onMessagePress() {
  //   this.props.navigator.push({
  //     title: 'MessageList',
  //     passProps: {
  //       user: this.props.user,
  //       type: 'backward',
  //       location: this.props.location
  //     }
  //   })
  // }

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
    position: 'relative',
    paddingRight: 5,
    flexDirection: 'row'
  },
  bottomContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 2.5,
  },
  backStyle: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 12
  },
  backTextStyle: {
    color: '#89bc4f',
    fontSize: 45
  },
  inputStyle: {
    width: 330,
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    borderWidth: 1,   
    borderRadius: 10,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#404040',
    backgroundColor: 'white'
  },
  messageStyle: {
    width: 28,
    height: 28,
    marginTop: -42,
    marginLeft: 335,
  },
  usernameStyle: { 
    fontSize: 18, 
    color: '#404040',
    paddingTop: 10,
    fontWeight: 'bold',
    marginBottom: 10
  },
  usernameContainerStyle: {   
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
    paddingBottom: 4,
    color: 'white',
    fontSize: 28,
    transform: [{ rotate: '180deg'}]
  }
}




export default MessageScene