import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const LocationDetail = ({ location, onPress }) => {
    const { name, street, city, state, zipcode, phone } = location
    const { containerStyle, nameStyle} = styles 

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text style={nameStyle}>{name} Costco</Text>
            <Text>{street}</Text>
            <Text>{city}, {state}</Text>
            <Text>{zipcode}</Text>
            <Text>{phone}</Text>
        </TouchableOpacity>
    )
}

const styles = {
  nameStyle: {
    fontSize: 14,
    fontWeight: 'bold'
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