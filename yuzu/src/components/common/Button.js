import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle, containerStyle } = styles;

  return (

    <View style={containerStyle}>
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#f6c501',
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#f6c501',
    // marginLeft: 5,
    // marginRight: 5
    paddingTop: 3,
    paddingBottom: 3
  },
  containerStyle: {
    // paddingTop: 5,
    // paddingBottom: 5,
    // paddingLeft: 20,
    // paddingRight: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  }
};

export { Button };
