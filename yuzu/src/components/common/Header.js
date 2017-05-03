// Import libraries for making a component
import React from 'react';
import { View, Image } from 'react-native';

// Make a component
const Header = (showImage) => {
  const { viewStyle, imageStyle } = styles;

  return (
    <View style={viewStyle}>
      <Image style={imageStyle} source={require('../../images/header.png')} />
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    paddingTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    position: 'relative',
    paddingRight: 5
  },
  imageStyle: {
    width: 110,
    height: 34
  }
};

// Make the component available to other parts of the app
export { Header };
