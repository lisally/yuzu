import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const LocationDetail = ({ location, onPress }) => {
    const { name, street, city, state, zipcode, phone } = location
    const { containerStyle, nameStyle} = styles 

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text style={nameStyle}>{name} Costco</Text>
            <Text style={{color: '#404040'}}>{street}</Text>
            <Text style={{color: '#404040'}}>{city}, {state}</Text>
            <Text style={{color: '#404040'}}>{zipcode}</Text>
            <Text style={{color: '#404040'}}>{phone}</Text>
        </TouchableOpacity>
    )
}

const styles = {
  nameStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#404040'
  },
  containerStyle: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#ddd',
    position: 'relative'
  }
}

export { LocationDetail }