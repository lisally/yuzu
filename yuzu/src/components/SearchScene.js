import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Image } from 'react-native';
import { Button, CardSection, Input, Spinner, SearchDetail, TextButton } from './common';
import firebase from 'firebase'

class SearchScene extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      ref: firebase.database().ref(),
      location: this.props.location,
      // location: 'Seattle',
      user: this.props.user, 
      searchResult: [], 
      loading: false,
      matching: false
    }
  }

  componentDidMount() {
    const { ref, user } = this.state
    var matchStatus = ref.child('users/' + user + '/matchingStatus/')
    matchStatus.once('value', snapshot => {
      if (snapshot.val() == null) {
        matchStatus.set(false)
        this.setState({ matching: false })
      } else {
        this.setState({ matching: snapshot.val() })
      }
    })
  }


  render() {
    const { containerStyle, inputStyle, backStyle, backTextStyle, viewStyle, addItemsStyle } = styles;
    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <View style={{flex:1}}>
          <View style={viewStyle}>
            <Text style={addItemsStyle}>
              Add Items
            </Text>
          </View>


          <TouchableOpacity style={backStyle} onPress={this.onBack.bind(this)}>
            <Text style={backTextStyle}>
              ‹
            </Text>
          </TouchableOpacity>

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
            </View>
          </CardSection>

          <ScrollView 
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
          >
          {this.renderResult()}
          </ScrollView>
          
        </View>
      </TouchableWithoutFeedback>
    )
  }

  onSearch(search) {
    const { ref } = this.state
    var result = []
    var count = 0
    if (search.length > 0) {
      this.setState({ loading: true })
      ref.child('products').on('value', snapshot => {
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
    const { ref, user, location, matching } = this.state 
    Keyboard.dismiss()
    this._input.clear()

    ref.child('users/' + user + '/itemList/' + item.Product).set(item)

    if (matching) {
      ref.child('matches/' + location + '/' + item.Product + '/').once('value', snapshot => {
        if (snapshot.val() == null) {
          ref.child('matches/' + location + '/' + item.Product + '/').set([user])
        } else {
          var users = snapshot.val()
          if (users.indexOf(user) == -1) {
            users.push(user)
            ref.child('matches/' + location + '/' + item.Product + '/').set(users)
          }
        }
      })
    }

    this.setState({ searchResult: [] })
      
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
   addItemsStyle: { 
    fontSize: 18, 
    color: '#404040',
    paddingTop: 10,
    fontWeight: 'bold',
    marginBottom: 10
  },
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
  backStyle: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 12
  },
  backTextStyle: {
    color: '#89bc4f',
    fontSize: 45
  },
}


export default SearchScene