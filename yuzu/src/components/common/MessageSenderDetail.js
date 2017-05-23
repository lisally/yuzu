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
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: '#89bc4f',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5,

  },
  messageStyle: {
    fontSize: 18,
    color: 'white'
  }
}

export { MessageSenderDetail }