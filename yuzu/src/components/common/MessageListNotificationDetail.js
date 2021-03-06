import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const MessageListNotificationDetail = ({ user, onPress }) => {
    const { username, time, text } = user
    const { containerStyle, usernameStyle, timeStyle, textStyle } = styles 

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={containerStyle}>
          <Text style={usernameStyle}>{username}</Text>
          <Text style={timeStyle}>{time}</Text>
          <Text style={textStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
}

const styles = {
  containerStyle: {
    paddingTop: 15,
    paddingBottom: 15,    
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  usernameStyle: {
    fontSize: 18,
    color: '#404040',
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  timeStyle: {
    color: '#404040',
    fontSize: 16,
    alignSelf: 'flex-end',
    marginTop: -20,
    paddingRight: 10,
    fontWeight: 'bold'
  },
  textStyle: {
    paddingLeft: 10,
    paddingTop: 5,
    color: '#404040',
    fontWeight: 'bold'
    
  }
}

export { MessageListNotificationDetail }