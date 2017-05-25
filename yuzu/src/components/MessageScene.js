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
      match: this.props.match,
      message: '',
      showKeyboard: false,
      dateFormat: require('dateformat'),
      messagesLoaded: false,
      loading: false, 
      messageList: [],
      userProfile: {},
      // removeNotifications: false
      // match: '4Ind4pawLnd0rmTPdb5mKhkK4MG3',
      // matchUsername: 'saladsalsa'

     };
  }

  // TO DO:
  //  adding profile to user's messageList when matched-user msgs user
  //  show shared items in chat
  //  message notifications?

  componentDidMount() {
    const { ref, user, match } = this.state

    ref.child('/users/' + user + '/profile/').once('value', snapshot => {
      this.setState({ userProfile: {
        fname: snapshot.val().fname,
        lname: snapshot.val().lname,
        username: snapshot.val().username,
        uid: user
      }})
    })

    // ref.child('users/' + user + '/messaging/').once('value', snapshot => {
    //   if (snapshot.val() != null) {
    //     this.setState({ removeNotifications: snapshot.val() })
    //   }
    // })

    // ref.child('users/' + user + '/unseenMessageList/').once('value', snapshot => {
    //   if (snapshot.val() != null) {
    //       var messageNotifications = snapshot.val()
    //       if (messageNotifications.indexOf(match.uid) != -1) {
    //         messageNotifications.splice(messageNotifications .indexOf(match.uid), 1)
    //           ref.child('users/' + user + '/unseenMessageList/').set(messageNotifications)              
    //       }
    //     }
    // })

    this.messageRef = firebase.database().ref('users/' + user + '/messageList/')
    this.messageRef.on('child_added', (snapshot) => {
      this.setState({ messagesLoaded: false })
    })
    this.messageRef.on('child_changed', (snapshot) => {
      this.setState({ messagesLoaded: false })
    })

  }

  render() {
    const { viewStyle, messageStyle, bottomContainerStyle, backStyle, backTextStyle, inputStyle, usernameStyle, buttonStyle, buttonTextStyle } = styles

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
          <Text style={usernameStyle}>
            {this.state.match.username}
          </Text>
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
            if (contentHeight > 540) {
              this.scrollView.scrollToEnd({animated: false});
            }
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
    )
  }

  renderNotifications() {
    // const { ref, user, match, } = this.state
    // ref.child('users/' + user + '/unseenMessageList/').once('value', snapshot => {
    //   if (snapshot.val() != null) {
    //       var messageNotifications = snapshot.val()
    //       if (messageNotifications.indexOf(match.uid) != -1) {
    //         messageNotifications.splice(messageNotifications .indexOf(match.uid), 1)
    //           ref.child('users/' + user + '/unseenMessageList/').set(messageNotifications)              
    //       }
    //     }
    // })
  }

  onSendMessage() {
    const { ref, user, match, message, date, dateFormat, userProfile } = this.state
    Keyboard.dismiss()
    this.setState({ showKeyboard: false, message: '' })
    this.refs['messageInput'].setNativeProps({text: ''});

    if (message.length > 0) {
      var dateString = dateFormat(+new Date, "mmmm dS, h:MM TT")
      dateString = dateString.split(',')[1].trim()

      var messageObj = {
        sender: user,
        text: message,
        time: dateString
      }

      ref.child('users/' + match.uid + '/unseenMessageList/').once('value', snapshot => {
        if (snapshot.val() == null) {
          ref.child('users/' + match.uid + '/unseenMessageList/').set([user])     
        } else {
          var messageNotifications = snapshot.val()
          if (messageNotifications.indexOf(user) == -1) {
            messageNotifications.push(user)       
            ref.child('users/' + match.uid + '/unseenMessageList/').set(messageNotifications)
          }
        }
      })

      ref.child('users/' + match.uid + '/messageList/' + user + '/messages/').once('value', snapshot => {
        if (snapshot.val() == null) {
          ref.child('users/' + match.uid + '/messageList/' + user + '/messages/').set([messageObj])
          ref.child('users/' + user + '/messageList/' + match.uid + '/messages/').set([messageObj])        
        } else {
          var messages = snapshot.val()
          messages.push(messageObj)
          ref.child('users/' + user + '/messageList/' + match.uid + '/messages/').set(messages)          
          ref.child('users/' + match.uid + '/messageList/' + user + '/messages/').set(messages)
        }
      })

      ref.child('users/' + user + '/messageList/' + match.uid + '/profile/').once('value', snapshot => {
        if (snapshot.val() == null) {
          ref.child('users/' + user + '/messageList/' + match.uid + '/profile/').set({
            fname: match.fname,
            lname: match.lname,
            username: match.username,
            uid: match.uid
          })
          ref.child('users/' + match.uid + '/messageList/' + user + '/profile/').set(userProfile)
        }
      })
    }
  }

  renderMessages() {
    const { ref, user, match, loading, messagesLoaded, messageList, removeNotifications } = this.state

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

      ref.child('users/' + user + '/messageList/' + match.uid + '/messages/').once('value', snapshot => {
        if (snapshot.val() != null) {
          this.setState({ messageList: snapshot.val(), loading: false, messagesLoaded: true })
        } else {
          this.setState({ loading: false, messagesLoaded: true })
        }
      })

      // if (removeNotifications) {

      ref.child('users/' + user + '/messaging/').once('value', snapshot => {
        if (snapshot.val() != null) {
          if (snapshot.val() == true) {
            ref.child('users/' + user + '/unseenMessageList/').once('value', snapshot => {
              if (snapshot.val() != null) {
                var messageNotifications = snapshot.val()
                if (messageNotifications.indexOf(match.uid) != -1) {
                  messageNotifications.splice(messageNotifications.indexOf(match.uid), 1)
                    ref.child('users/' + user + '/unseenMessageList/').set(messageNotifications)              
                }
              }
            })
          }
        }
      })
        // ref.child('users/' + user + '/unseenMessageList/').once('value', snapshot => {
        //   if (snapshot.val() != null) {
        //     var messageNotifications = snapshot.val()
        //     if (messageNotifications.indexOf(match.uid) != -1) {
        //       messageNotifications.splice(messageNotifications.indexOf(match.uid), 1)
        //         ref.child('users/' + user + '/unseenMessageList/').set(messageNotifications)              
        //     }
        //   }
        // })
      // }

      // ref.child('users/' + match.uid + '/unseenMessageList/').once('value', snapshot => {
      //   if (snapshot.val() != null) {
      //     var messageNotifications = snapshot.val()
      //     if (messageNotifications.indexOf(user) != -1) {
      //       messageNotifications.splice(messageNotifications.indexOf(user), 1)
      //         ref.child('users/' + match.uid + '/unseenMessageList/').set(messageNotifications)              
      //     }
      //   }
      // })
    }

    var result = []

    messageList.forEach(function(msg) {
      if (msg.sender == user) {
        result.push(<MessageSenderDetail message={msg} />)
      } else {
        result.push(<MessageMatchDetail message={msg} />)        
      }
    })
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
    this.state.ref.child('users/' + this.state.user + '/messaging/').set(false)
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