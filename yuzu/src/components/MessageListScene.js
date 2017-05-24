import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, TextButton, MessageListDetail } from './common';
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
    const { ref, user } = this.state
    ref.child('users/' + user + '/unseenMessagesStatus/').set(false)
  }

  render() {
    const { viewStyle, messageStyle, backStyle, backTextStyle } = styles

    return (
      <View style={{flex:1}}>
        {/*
        <TouchableHighlight onPress={this.onYuzuPress.bind(this)}>
          <View style={{ height: 35, width: 105, position: 'absolute', marginTop: -45, marginLeft: 130 }} />
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
          <Image style={menuStyle} source={require('../images/menu.png')} />
        </TouchableHighlight>


        <TouchableOpacity style={backStyle} onPress={this.onBack.bind(this)}>
          <Text style={backTextStyle}>
            ‹
          </Text>
        </TouchableOpacity>

        <TouchableHighlight>
          <Image style={messageStyle} source={require('../images/message.png')} />
        </TouchableHighlight>
        */}

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

      ref.child('users/' + user + '/messageList/').once('value', snapshot => {
        if (snapshot.val() != null) {
          snapshot.forEach(function(match) {
            list.push(match.val().profile)
          })
        }
        this.setState({ messageList: list, messageListLoaded: true, loading: false  })
      })

      // ref.child('users/' + user + '/messageList/').once('value', snapshot => {
      //   if (snapshot.val() != null) {
      //     snapshot.forEach(function(match) {
      //       ref.child('users/' + match.key + '/profile/').once('value', snapshot2 => {
      //         list.push({
      //           uid: match.key,
      //           fname: snapshot2.val().fname,
      //           lname: snapshot2.val().lname,
      //           username: snapshot2.val().username
      //         })
              
      //       })
      //     })
      //   }
      // })
    } 

    
    return (
      messageList.map(match =>
        <MessageListDetail onPress={this.onMessagePress.bind(this, match)} user={match} key={match.uid} />
      )
    ) 
    
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

  // onYuzuPress() {
  //   this.props.navigator.push({
  //     title: 'Main',
  //     passProps: {
  //       user: this.props.user,
  //       location: this.props.location,
  //       type: 'backward'
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