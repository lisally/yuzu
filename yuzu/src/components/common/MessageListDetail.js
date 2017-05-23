import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const MessageListDetail = ({ user, onPress }) => {
    const { username } = user
    const { containerStyle, usernameStyle, itemStyle, productStyle, messageStyle } = styles 

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={containerStyle}>
          <Text style={usernameStyle}>{username}</Text>
        </View>
      </TouchableOpacity>
    )
}

const styles = {
  containerStyle: {
    paddingTop: 15,
    paddingBottom: 15,    
    backgroundColor: '#fff',
    flexDirection: 'column',
    position: 'relative',
    alignSelf: 'stretch',
    borderColor: '#ddd',
    borderBottomWidth: 1
  },
  usernameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#404040',
    paddingLeft: 10
  }
}

export { MessageListDetail }