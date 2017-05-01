import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const ItemDetail = ({ item, onPress }) => {
    const { name, street, city, state, zipcode, phone } = location
    const { containerStyle, nameStyle} = styles 

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text>{item.Product}</Text>
            <Text>${item.Price} - ({item.Quantity}) {item.Size} {item.Measure}</Text>
        </TouchableOpacity>
    )
}

const styles = {
  nameStyle: {
    fontSize: 14,
    fontWeight: 'bold'
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
  }
}

export { ItemDetail }