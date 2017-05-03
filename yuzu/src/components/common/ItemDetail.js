import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const ItemDetail = ({ item, onPress }) => {
    const { Product, Price, Quantity, Size, Measure, Category } = item
    const { containerStyle, nameStyle, clearStyle, textStyle, productStyle, priceStyle } = styles 

    return (
      <View>
        <View style={containerStyle}>
          <Text style={productStyle}>{Product}</Text>
          <Text style={priceStyle}>Price: ${Price} </Text>
          <Text>Quantity: {Quantity} × {Size} {Measure}</Text>
          <Text>Category: {Category}</Text>
        </View>
        <View style={clearStyle} >
           <TouchableOpacity onPress={onPress}>
            <Text style={textStyle}>
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
    // color: '#89bc4f'
  },
  priceStyle: {
    // fontSize: 14,
    // color: '#89bc4f',
    
  },
  containerStyle: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // alignItems: 'center',
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
  textStyle: {
    alignSelf: 'center',
    color: '#89bc4f',
    fontSize: 26,
    paddingTop: 10,
    paddingBottom: 10
  }
}

export { ItemDetail }