import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const MenuDetail = ( {children, onPress }) => {
    const { nameStyle, containerStyle } = styles 

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
          <Text style={{nameStyle}}>
            {children}
          </Text>
        </TouchableOpacity>
    )
}

const styles = {
  nameStyle: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#404040'
  },
  containerStyle: {
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 10,
    borderColor: '#ddd',
    position: 'relative',
    paddingTop: 16,
    paddingBottom: 16
  }
}

export { MenuDetail }