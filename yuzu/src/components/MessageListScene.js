import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, TextButton, MessageListDetail, MessageListNotificationDetail } from './common';
import firebase from 'firebase'

class MessageListScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ref: firebase.database().ref(),
      // location: this.props.location,
      location: 'Seattle',
      user: this.props.user,
      loading: false,
      messageListLoaded: false,
      messageList: []

     };
  }
  
  // TO DO:
  //  add more info to list items (last message time, last message?)

  componentDidMount() {
    const { user } = this.state

    this.messageRef = firebase.database().ref('users/' + user + '/messageList/')

    this.messageRef.on('child_added', (snapshot) => {
      this.setState({ messageListLoaded: false })
    })
    this.messageRef.on('child_changed', (snapshot) => {
      this.setState({ messageListLoaded: false })
    })
  }

  render() {
    const { viewStyle, messageStyle, backStyle, backTextStyle } = styles

    return (
      <View style={{flex:1}}>

        <View style={viewStyle}>
          <Text style={messageStyle}>
            Messages
          </Text>
        </View>

          <TouchableOpacity style={backStyle} onPress={this.onBack.bind(this)}>
            <Text style={backTextStyle}>
              ‹
            </Text>
          </TouchableOpacity>

        <ScrollView>
          {this.renderMessageList()}
        </ScrollView>


        <View style={backStyle}>
          <Text style={backTextStyle} onPress={this.onBack.bind(this)}>
            ‹
          </Text>
        </View> 
      </View>
    )
  }

  renderMessageList() {
    const { ref, user, location, loading, messageListLoaded, messageList } = this.state

    if (loading) {
      return <View><Spinner size="small" /></View>
    }

    if (!messageListLoaded) {
      this.setState({ loading: true })
      list = []

      ref.child('users/' + user + '/messageProfileList/').once('value', snapshot => {
        if (snapshot.val() != null) {
          snapshot.forEach(function(match) {
            if (match.val().profile != null) {
              var matchObj = match.val().profile
              ref.child('users/' + user + '/messageList/' + matchObj.uid + '/messages/').once('value', snapshot2 => {
                if (snapshot2.val() != null) {
                  matchObj['text'] = snapshot2.val()[snapshot2.val().length - 1].text
                  matchObj['time'] = snapshot2.val()[snapshot2.val().length - 1].time
                  matchObj['date'] = snapshot2.val()[snapshot2.val().length - 1].date                  
                  if (matchObj['text'].length > 50) {
                    matchObj['text'] = matchObj['text'].substring(0, 50) + '...'
                  }          
                }
                ref.child('users/' + user + '/messageProfileList/' + matchObj.uid + '/profile/').set(matchObj)
              })
            }
          })
          ref.child('users/' + user + '/messageProfileList/').once('value', snapshot => {
            if (snapshot.val() != null) {
              snapshot.forEach(function(match) {
                if (match.val().profile != null) {
                  list.push(match.val().profile)
                }
              })
            }

            list.sort(function(a,b){
              return new Date(b.date) - new Date(a.date);
            });


            this.setState({ messageList: list, messageListLoaded: true, loading: false  })
          })
        } else {
          this.setState({ messageListLoaded: true, loading: false  })
        }
      })
    } 

    result = []

    for (var i in messageList) {
      var match = messageList[i]
      if (!match.seen) {
        result.push(
          <MessageListNotificationDetail onPress={this.onMessagePress.bind(this,match)} user={match} key={match.uid} />
        )
      } else {
        result.push(
          <MessageListDetail onPress={this.onMessagePress.bind(this,match)} user={match} key={match.uid} />
        )
      }
    }

    return result
    
  }

  onBack() {
    this.props.navigator.push({
      title: 'Main',
      passProps: {
        user: this.props.user,
        type: 'backward',
        location: this.props.location
      }
    })
  }

  onMessagePress(match) {
    const { ref, user } = this.state
    ref.child('users/' + user + '/messageProfileList/' + match.uid + '/messaging/').set(true)
    this.props.navigator.push({
      title: 'Message',
      passProps: {
        user: this.props.user,
        type: 'forward',
        location: this.props.location,
        match: match,
        back: 'MessageList'
      }
    })
  }

  onMenuPress() {
    this.props.navigator.push({
      title: 'Menu',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        screen: 'MessageList',
        type: 'menu'
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
    position: 'relative',
    flexDirection: 'row'
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
  messageStyle: { 
    fontSize: 18, 
    color: '#404040',
    paddingTop: 10,
    fontWeight: 'bold',
    marginBottom: 10
  },
}




export default MessageListScene