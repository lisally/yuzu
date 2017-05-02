import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, SearchDetail, TextButton } from './common';
import firebase from 'firebase'

class SearchScene extends Component {
  constructor(props) {
    super(props)
    // this.state = { location: this.props.location, user: 'this.props.user', searchResult: [] };
    this.state = { 
      location: 'Seattle', 
      user: 'GtzTKaVt3UNORfO9v04eRqFtjvf2', 
      searchResult: [], 
      itemAdded: false,
      // fadeIn: new Animated.Value(0),
      // fadeOut: new Animated.Value(0)
    };  
  }

  render() {
    const { containerStyle, inputStyle, cameraStyle } = styles;
    return (
      <View style={{flex:1}}>
      <CardSection>
          <View style={containerStyle}>
          <TextInput 
            ref={(ref) => this._input = ref}
            placeholder="Search"
            autoCorrect={false}
            style={inputStyle}
            //value={this.state.search}
            onChangeText={this.onSearch.bind(this)}
          />
          <Text style={cameraStyle}>
            Camera
          </Text>
          </View>
        </CardSection>

        <ScrollView>

        {this.renderResult()}

        {/*{this.renderFadeIn()}*/}
        {/*{this.renderFadeOut()}*/}

        </ScrollView>

        <View>
          <TextButton onPress={this.onBack.bind(this)}>
            Back
          </TextButton>
        </View>

      </View>
    )
  }

  onSearch(search) {
    var result = []
    var count = 0
    if (search.length > 0) {
      firebase.database().ref('products').on('value', snapshot => {
        for (var item of snapshot.val()) {
          if (item.Product.toLowerCase().startsWith(search.toLowerCase())) {
            if (result.length < 20) {
              result.push(item)
            } else {
              break;
            }
          }
        }
        this.setState({ searchResult: result})
      })
    } else {
      this.setState({ searchResult: [] })
    }
  }

  renderResult() {
    const { searchResult } = this.state
    if (typeof(searchResult) != 'undefined' && searchResult.length > 0) {
      return (
        searchResult.map(item =>
          <SearchDetail onPress={this.onItemPress.bind(this, item)} item={item} key={item.Product} />
        )
      )
    }
  }

  /*renderFadeIn() {
    if (this.state.itemAdded) {
      Animated.timing(                            
        this.state.fadeIn,                      
        {
          toValue: 1,                         
        }
      ).start();

      return (
        <Animated.View        
          style={{
            opacity: this.state.fadeIn,
          }}
        >
          <Text>
            Item Added!
          </Text>
        </Animated.View>
      )
    }
  }

  renderFadeOut() {
    if (this.state.itemAdded) {
      Animated.timing(                            
        this.state.fadeOut,                      
        {
          toValue: 1,                         
        }
      ).start();

      return (
        <Animated.View        
          style={{
            opacity: this.state.fadeIn,
          }}
        >
          <Text style={{color:'red'}}>
            Item Added!
          </Text>
        </Animated.View>
      )
    }
  }*/

  onItemPress(item) {
    this.setState({ searchResult: [] })
    this._input.clear()
    firebase.database().ref('users/' + this.state.user + '/itemList').push(item)
    this.setState({ itemAdded: true })
    // this.setState({ itemAdded: false })
  }

  onBack() {
    this.props.navigator.push({
      title: 'Main',
      passProps: this.props,
      type: 'backward'
    })
  }


}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  containerStyle: {
    height: 38,
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cameraStyle: {
    fontSize: 18,
    color: '#000',
  }
}


export default SearchScene