import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const SearchDetail = ({ item, onPress }) => {
    const { Product, Price, Quantity, Size, Measure } = item
    const { containerStyle, nameStyle} = styles 

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text style={{color: '#404040'}}>{Product}</Text>
            <Text style={{color: '#404040'}}>${Price} - {Quantity} × {Size} {Measure}</Text>
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
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#ddd',
    position: 'relative',
    paddingTop: 7,
    paddingBottom: 7
  }
}

export { SearchDetail }