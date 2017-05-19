import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const MatchDetail = ({ match, onPress }) => {
    const { list, username, count } = match
    const { containerStyle, usernameStyle, itemStyle, productStyle, messageStyle } = styles 

    return (
      <View>
        <View style={containerStyle}>
          <Text style={usernameStyle}>{username}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#404040', position: 'absolute', alignSelf: 'flex-end', marginTop: 12, paddingRight: 18 }}>
            ({count}) Matches
          </Text>
          
          {list.map(item =>
            <View style={{paddingLeft: 5, paddingRight: 5, paddingBottom: 2}}>
              <View style={{ borderColor: '#ddd', borderTopWidth: 0.5, paddingTop: 5, }} />
              
              <Text style={productStyle}>{item.Product}</Text>
          
              <Text style={itemStyle}>Price: {item.Price}</Text>
             
              <Text style={itemStyle}>Quantity: {item.Quantity} × {item.Size} {item.Measure}</Text> 

              <View style={{ paddingTop: 5 }} />
              
            </View>
          )}

           {/*<TouchableOpacity onPress={onPress}>*/}
        </View>
        <TouchableOpacity>  
          <View style={messageStyle}>        
            <Text style={{ color: 'white', fontSize: 20 }}>
              Message
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
}

const styles = {
  containerStyle: {
    // borderBottomWidth: 0.5,
    // borderTopWidth: 0.5,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // borderColor: '#ddd',
    position: 'relative',
    width: 355,
    alignSelf: 'center',
  },
  usernameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#404040',
    paddingBottom: 5,
    paddingLeft: 5
  },
  itemStyle: {
    fontSize: 12,
    color: '#404040'
  },
  productStyle: {
    fontSize: 12,
    color: '#89bc4f',
    fontWeight: 'bold',
  },
  messageStyle: {
    alignItems: 'center',
    backgroundColor: '#f6c501',
    height: 40,
    justifyContent: 'center',
    width: 355,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -5
  }

}

export { MatchDetail }