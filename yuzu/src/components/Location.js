import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, LocationDetail } from './common';
import firebase from 'firebase'

class Location extends Component {
  state = { zipcode: '', loading: false, locationData: [] };

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Zipcode"
            placeholder="12345"
            value={this.state.zipcode}
            onChangeText={zipcode => this.setState({ zipcode })}
          />
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>
          {this.renderLocation()}

      </Card>
    );
  }

  renderButton() {    
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Search
      </Button>
    );
  }

  onButtonPress() {
    /* HANDLE LOGIC FOR SEARCHING ZIPCODE HERE */
    // const { zipcode } = this.state;
    this.setState({ loading: true });
    firebase.database().ref('location').once('value')
      .then(snapshot => this.setState({ locationData: snapshot.val(), loading: false }))
  }
  
  renderLocation() {
    const { locationData } = this.state
    if (typeof(locationData) != 'undefined' && locationData.length > 0) {
      return (
        locationData.map(location =>
          <LocationDetail key={location.name} location={location} />
        )
      )
    }
  }
}

export default Location