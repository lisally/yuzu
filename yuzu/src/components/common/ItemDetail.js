import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const ItemDetail = ({ item, onPress }) => {
    const { Product, Price, Quantity, Size, Measure, Category } = item
    const { containerStyle, nameStyle, clearStyle, clearTextStyle, textStyle, productStyle, priceStyle } = styles 

    return (
      <View>
        <View style={containerStyle}>
          <Text style={productStyle}>{Product}</Text>
          <Text style={textStyle}>Quantity: {Quantity} × {Size} {Measure}</Text>
          <Text style={textStyle}>Category: {Category}</Text>
          <Text style={priceStyle}>${Price} </Text>          
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
    fontSize: 14.5,
    fontWeight: 'bold',
    // color: '#89bc4f',
    color: '#404040',
    marginRight: 110
  },
  priceStyle: {
    color: '#404040',
    alignSelf: 'flex-end',
    position: 'relative',
    fontSize: 18,
    marginTop: -20
  },
  containerStyle: {
    borderTopWidth: 0.5,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative',
    width: 350,
    alignSelf: 'center',
  },
  clearStyle: {
    marginTop: -10,
    marginLeft: 345,
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
    color: '#404040',
  }
}

export { ItemDetail }