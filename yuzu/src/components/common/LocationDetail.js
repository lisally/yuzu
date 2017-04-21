import React from 'react'
import { View, Text } from 'react-native'

const LocationDetail = ({ location }) => {
    const { name, street, city, state, zipcode, phone } = location
    const { containerStyle, nameStyle} = styles 

    return (
        <View style={containerStyle}>
            <Text style={nameStyle}>{name} Costco</Text>
            <Text>{street}</Text>
            <Text>{city}, {state}</Text>
            <Text>{zipcode}</Text>
            <Text>{phone}</Text>
        </View>
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