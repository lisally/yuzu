import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const MessageMatchDetail = ({ message }) => {
    const { text, sender, time } = message
    const { containerStyle, messageStyle } = styles 


    return (
      <View style={containerStyle}>
        <Text style={messageStyle}>{text}</Text>
      </View>
    )
}

const styles = {
  containerStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 130, 
    marginLeft: 10,
    marginBottom: 5,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: '#f2f2f2',
    alignSelf: 'flex-start',
    alignItems: 'center'
  },
  messageStyle: {
    fontSize: 16,
    color: '#404040'
  }
}

export { MessageMatchDetail }