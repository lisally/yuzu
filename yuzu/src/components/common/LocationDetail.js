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
    // margin: 10,
    fontSize: 14,
    fontWeight: 'bold'
    // flexDirection: 'column',
    // alignItems: 'stretch',
    // justifyContent: 'space-between',
    // flex: 1
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#ddd',
    position: 'relative'
    // flex: 1
  }
}

export { LocationDetail }