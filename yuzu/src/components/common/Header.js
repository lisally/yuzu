// Import libraries for making a component
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

// Make a component
const Header = () => {
  const { viewStyle, imageStyle, menuStyle } = styles;

  return (
    // <View>
      // <View>
        // <TouchableOpacity>
          // <Image style={menuStyle} source={require('../../images/menu.png')} />
        // </TouchableOpacity>
      // </View>
      <View style={viewStyle}>
        {/*<TouchableOpacity onPress={onPress}>
          <Image style={menuStyle} source={require('../../images/menu.png')} />
        </TouchableOpacity>*/}
        <Image style={imageStyle} source={require('../../images/header.png')} />
      </View>
    // </View>
  )

  
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
    paddingRight: 5,
    flexDirection: 'row'
  },
  imageStyle: {
    width: 110,
    height: 34
  },
  menuStyle: {
    width: 18,
    height: 18,
    marginLeft: -115
  }
};

// Make the component available to other parts of the app
export { Header };
