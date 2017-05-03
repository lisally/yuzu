import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const ItemDetail = ({ item, onPress }) => {
    const { Product, Price, Quantity, Size, Measure, Category } = item
    const { containerStyle, nameStyle, clearStyle, clearTextStyle, textStyle, productStyle, priceStyle } = styles 

    return (
      <View>
        <View style={containerStyle}>
          <Text style={productStyle}>{Product}</Text>
          <Text style={priceStyle}>Price: ${Price} </Text>
          <Text style={textStyle}>Quantity: {Quantity} × {Size} {Measure}</Text>
          <Text style={textStyle}>Category: {Category}</Text>
        </View>
        <View style={clearStyle} >
           <TouchableOpacity onPress={onPress}>
            <Text style={clearTextStyle}>
              ×
            </Text>
          </TouchableOpacity>
          </View>
      </View>
    )
}

const styles = {
  productStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#404040'
  },
  priceStyle: {
    color: '#404040'
    
  },
  containerStyle: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative',
    width: 320,
    alignSelf: 'center'
  },
  clearStyle: {
    marginTop: -14,
    marginLeft: 330,
    position: 'absolute'
  },
  clearTextStyle: {
    alignSelf: 'center',
    color: '#89bc4f',
    fontSize: 26,
    paddingTop: 10,
    paddingBottom: 10
  },
  textStyle: {
    color: '#404040'
  }
}

export { ItemDetail }