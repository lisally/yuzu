import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
// import { Drawer } from 'native-base'
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    this.state = { location: this.props.location };
  }

  render() {
    console.log(this.props)
    return (
      // <Drawer>
        <Card>
          <CardSection>
            <Text>HELLO</Text>
          </CardSection>
        </Card>
      // </Drawer>
   )   
  }

}



export default MainScene