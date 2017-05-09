import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Image } from 'react-native';
import { Button, CardSection, Input, Spinner, SearchDetail, TextButton } from './common';
import firebase from 'firebase'

class SearchScene extends Component {
  constructor(props) {
    super(props)
    this.state = { location: this.props.location, user: this.props.user, searchResult: [], loading: false };
    // this.state = { 
    //   location: 'Seattle', 
    //   user: 'GtzTKaVt3UNORfO9v04eRqFtjvf2', 
    //   searchResult: [], 
    //   loading: false
    // };
  }


  render() {
    const { containerStyle, inputStyle, cameraStyle, menuStyle, backStyle, backTextStyle } = styles;
    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View style={{flex:1}}>
        <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
          <Image style={menuStyle} source={require('../images/menu.png')} />
        </TouchableHighlight>
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

        <View style={backStyle}>
          <Text style={backTextStyle} onPress={this.onBack.bind(this)}>
            ‹
          </Text>
        </View>

        </View>
      </TouchableWithoutFeedback>
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
      Keyboard.dismiss()
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
      passProps: {
        user: this.props.user,
        type: 'backward',
        location: this.props.location
      }
    })
  }

  onBack() {
    this.props.navigator.push({
      title: 'Main',
      passProps: {
        user: this.props.user,
        type: 'backward',
        location: this.props.location
      }
    })
  }

  onMenuPress() {
    this.props.navigator.push({
      title: 'Menu',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        screen: 'Search',
        type: 'menu'
      }
    })
  }
}

const styles = {
  inputStyle: {
    color: '#404040',
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
  },
  menuStyle: {
    width: 22,
    height: 20,
    marginTop: -38,
    marginLeft: 14
  },
  backStyle: {
    marginLeft: 10
  },
  backTextStyle: {
    color: '#89bc4f',
    fontSize: 40
  },
}


export default SearchScene