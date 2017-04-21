import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const TextButton = ({ onPress, children }) => {
  const { textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#89bc4f',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  }
};

export { TextButton };
