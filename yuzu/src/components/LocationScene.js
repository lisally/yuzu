import React, { Component } from 'react';
import { Text, View, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton } from './common';
import firebase from 'firebase'

class LocationScene extends Component {
  constructor(props) {
    super(props)
    this.state = { zipcode: '', loading: false, locationData: [], location: '' };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View style={{flex:1}}>
        <CardSection>
          <Input
            label="Zipcode"
            placeholder="12345"
            value={this.state.zipcode}
            onChangeText={zipcode => this.setState({ zipcode })}
          />
        </CardSection>

        {this.renderSearch()}

        <ScrollView>
          {this.renderLocation()}
        </ScrollView>

        <TextButton onPress={() => firebase.auth().signOut()
          .then(() => {this.props.navigator.push({
            title: 'SignIn',
            passProps: this.props,
            type: 'backward'
          })
        })}>
          Sign Out
        </TextButton>
      </View>
      </TouchableWithoutFeedback>
    );
  }

  renderSearch() {    
    if (this.state.loading) {
      return <View><Spinner size="small" /></View>;
    }
    return (
      <Button onPress={this.onSearchPress.bind(this)}>
        Search
      </Button>
    );
  }

  onSearchPress() {
    /* HANDLE LOGIC FOR SEARCHING ZIPCODE HERE */
    // const { zipcode } = this.state;
    Keyboard.dismiss()
    this.setState({ loading: true });
    firebase.database().ref('locations').once('value')
      .then(snapshot => this.setState({ locationData: snapshot.val(), loading: false }))
  }
  
  renderLocation() {
    const { locationData } = this.state
    if (typeof(locationData) != 'undefined' && locationData.length > 0) {
      return (
        locationData.map(location =>
          <LocationDetail onPress={this.onLocationPress.bind(this, location)} key={location.name} location={location} />
        )
      )
    }
  }

  onLocationPress(location) {
    this.props.navigator.push({
      title: 'Main',
      passProps: {
        user: this.props.user,
        location: location.name,
        type: 'forward'
      }
    })
  }
}



export default LocationScene