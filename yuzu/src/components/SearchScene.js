import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, ListView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, ItemDetail, TextButton } from './common';
import firebase from 'firebase'

class SearchScene extends Component {
  constructor(props) {
    super(props)
    // this.state = { location: this.props.location, user: 'this.props.user', searchResult: [] };
    this.state = { location: 'Seattle', user: 'GtzTKaVt3UNORfO9v04eRqFtjvf2', searchResult: [] };  
  }



  render() {
    const { containerStyle, inputStyle, cameraStyle } = styles;
    return (
      <View>
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

        {this.onRenderResult()}

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
            if (result.length < 12) {
              result.push(item)
            } else {
              break;
            }
          }
        }
        this.setState({ searchResult: result })
      })
    } else {
      this.setState({ searchResult: [] })
    }
  }

  onRenderResult() {
    const { searchResult } = this.state
    if (typeof(searchResult) != 'undefined' && searchResult.length > 0) {
      return (
        searchResult.map(item =>
          <ItemDetail onPress={this.onItemPress.bind(this, item)} item={item} key={item.Product} />
        )
      )
    }
  }

  onItemPress(item) {
    this.setState({ searchResult: [] })
    this._input.clear()
    firebase.database().ref('users/' + this.state.user + '/itemList').push(item)
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