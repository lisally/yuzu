import React, { Component } from 'react';
import { Text, View, ScrollView, Keyboard, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
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
           <View style={styles.viewStyle}>
            <Text style={styles.locationStyle}>
              Select Location
            </Text>
          </View>
          <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
            <Image style={styles.menuStyle} source={require('../images/menu.png')} />
          </TouchableHighlight>
          
          <CardSection>
            <Input
              label="Zipcode"
              placeholder="98105"
              value={this.state.zipcode}
              onChangeText={zipcode => this.setState({ zipcode })}
            />
          </CardSection>

          {this.renderSearch()}

          <ScrollView>
            {this.renderLocation()}
          </ScrollView>
          
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
    this.setState({ location: location.name})
    this.props.navigator.push({
      title: 'Main',
      passProps: {
        user: this.props.user,
        location: location.name,
        type: 'forward'
      }
    })
  }

  onMenuPress() {
    this.props.navigator.push({
      title: 'Menu',
      passProps: {
        user: this.props.user,
        location: this.state.location,
        screen: 'Location',
        type: 'menu',
        showLocation: false
      }
    })
  }
}

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
    position: 'relative',
    flexDirection: 'row'
  },
   locationStyle: { 
    fontSize: 18, 
    color: '#404040',
    paddingTop: 10,
    fontWeight: 'bold',
    marginBottom: 10
  },
  menuStyle: {
    width: 22,
    height: 22,
    marginTop: -38,
    marginLeft: 14
  }
};


export default LocationScene