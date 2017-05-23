import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const MessageSenderDetail = ({ message }) => {
    const { text, sender, time } = message
    const { containerStyle, messageStyle } = styles 


    // if ( ) {

    // }

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
    marginLeft: 150, 
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: '#89bc4f',
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  messageStyle: {
    fontSize: 16,
    color: 'white'
  }
}

export { MessageSenderDetail }