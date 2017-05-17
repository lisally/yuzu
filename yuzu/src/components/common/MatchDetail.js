import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const MatchDetail = ({ match, onPress }) => {
    const { matchList, username, count } = match
    const { containerStyle, usernameStyle, itemStyle, messageStyle } = styles 

    return (
      <View>
        <View style={containerStyle}>
          <Text style={usernameStyle}>{username} ({count})</Text>
        
          {matchList.map(item =>
            <View style={{paddingLeft: 5, paddingRight: 5, paddingBottom: 2}}>
            <Text style={itemStyle}>Item: {item.Product}</Text>
            <Text style={itemStyle}>Price: {item.Price}</Text>            
            <Text style={itemStyle}>Quantity: {item.Quantity} × {item.Size} {item.Measure}</Text>            
            {/*<Text style={itemStyle}>{item.Quantity}</Text>*/}
            </View>
          )}

           {/*<TouchableOpacity onPress={onPress}>*/}
        </View>
        <View style={messageStyle}>
          <TouchableOpacity>             
            <Text style={{ color: 'white', fontSize: 20 }}>
              Message
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 10
  },
  usernameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#404040',
    paddingBottom: 5,
    paddingLeft: 5
  },
  itemStyle: {
    fontSize: 12,
    color: '#404040'
  },
  messageStyle: {
    alignItems: 'center',
    backgroundColor: '#f6c501',
    height: 40,
    justifyContent: 'center',
    width: 355,
    alignSelf: 'center',
  }

}

export { MatchDetail }