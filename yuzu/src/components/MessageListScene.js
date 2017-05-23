import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail, MatchDetail } from './common';
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

  // componentDidMount() {

  // }

  render() {
    const { menuStyle, backStyle, backTextStyle } = styles

    return (
      <View style={{flex:1}}>
        <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
          <Image style={menuStyle} source={require('../images/menu.png')} />
        </TouchableHighlight>
      
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
    } 

    return (
      messageList.map(user =>
        // <ItemDetail onPress={this.onDeletePress.bind(this, item)} item={item} key={item.Product} />
        <Text>{ user.username }</Text>
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
  }
}




export default MessageListScene