import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const SearchDetail = ({ item, onPress }) => {
    const { Product, Price, Quantity, Size, Measure } = item
    const { containerStyle, nameStyle} = styles 

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text>{Product}</Text>
            <Text>${Price} - ({Quantity}) {Size} {Measure}</Text>
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

export { SearchDetail }