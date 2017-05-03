import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, Keyboard, Animated } from 'react-native';
import { Button, CardSection, Input, Spinner, SearchDetail, TextButton } from './common';
import firebase from 'firebase'

class SearchScene extends Component {
  constructor(props) {
    super(props)
    // this.state = { location: this.props.location, user: 'this.props.user', searchResult: [], loading: false };
    this.state = { 
      location: 'Seattle', 
      user: 'GtzTKaVt3UNORfO9v04eRqFtjvf2', 
      searchResult: [], 
      loading: false
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
            {/*Camera*/}
          </Text>
          </View>
        </CardSection>

        <ScrollView 
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'
        >
        {/*<View>*/}
        {this.renderResult()}
        {/*</View>*/}
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
      this.setState({ loading: true })
      firebase.database().ref('products').on('value', snapshot => {
        for (var item of snapshot.val()) {
          if (item.Product.toLowerCase().includes(search.toLowerCase())) {
            if (result.length < 20) {
              result.push(item)
            } else {
              break;
            }
          }
        }
        this.setState({ searchResult: result, loading: false})
      })
    } else {
      this.setState({ searchResult: [] })
    }
  }

  renderResult() {
    const { searchResult, loading } = this.state
    if (loading) {
      return <View><Spinner size="small"/></View>
    }

    if (typeof(searchResult) != 'undefined' && searchResult.length > 0) {
      return (
        searchResult.map(item =>
          <SearchDetail onPress={this.onItemPress.bind(this, item)} item={item} key={item.Product} />
        )
      )
    }
  }

  onItemPress(item) {
    Keyboard.dismiss()
    this.setState({ searchResult: [] })
    this._input.clear()
    firebase.database().ref('users/' + this.state.user + '/itemList').push(item)

    this.props.navigator.push({
      title: 'Main',
      passProps: this.props,
      type: 'backward'
    })
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