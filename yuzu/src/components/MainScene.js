import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
// import { Drawer } from 'native-base'
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    this.state = { location: this.props.location };
  }

  render() {
    const { buttonStyle, buttonTextStyle, buttonContainerStyle } = styles;
    console.log(this.props)
    return (

    <Card>
      <View style={buttonContainerStyle}>
      <TouchableOpacity onPress={this.onAdd.bind(this)} style={buttonStyle}>
        <Text style={buttonTextStyle}>
          +
        </Text>
      </TouchableOpacity>
      </View>

      <ScrollView>
        
      </ScrollView>

      {/*<Button onPress={this.onMatch.bind(this)}>
        Find Matches
      </Button>*/}

    </Card>

   )   
  }

  onAdd() {
    this.props.navigator.push({
      title: 'Search',
      passProps: this.props
    })
  }

  onMatch() {
  }

}

const styles = {
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 32
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#f6c501',
    borderRadius: 5
  },
    buttonContainerStyle: {
    padding: 20,
    margin: -10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
}




export default MainScene