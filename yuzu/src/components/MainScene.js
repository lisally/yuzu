import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
// import { Drawer } from 'native-base'
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      location: this.props.location, 
      user: this.props.user, 
      itemListLoaded: false, 
      loading: false, 
      itemList: [],
      matchLoading: false,
     };
    // this.state = { location: 'Seattle', user: 'GtzTKaVt3UNORfO9v04eRqFtjvf2', itemListLoaded: false, loading: false, itemList: [] };  

}

  render() {
    const { buttonStyle, buttonTextStyle, buttonContainerStyle, backStyle } = styles;
    return (
    <View style={{flex:1}}>
      <View style={buttonContainerStyle}>
      <TouchableOpacity onPress={this.onAdd.bind(this)} style={buttonStyle}>
        <Text style={buttonTextStyle}>
          +
        </Text>
      </TouchableOpacity>
      </View>

      <ScrollView>
        {this.renderItemList()}
        {this.renderClearAll()}
      </ScrollView>

      <View style={backStyle}>
        <TextButton onPress={this.onBack.bind(this)}>
          Back
        </TextButton>
      </View> 

      {this.renderMatchButton()}


      {/*<View style={backStyle}>
        <TextButton onPress={this.onBack.bind(this)}>
          Back
        </TextButton>
      </View> */}

    </View>

   )   
  }

  renderClearAll() {
    if (this.state.itemList.length > 1) {
      return (
        <TextButton onPress={this.onClearAll.bind(this)}>
          Clear All
        </TextButton>
      )
    }
  }

  renderItemList() {
    const { itemList, itemListLoaded, loading, user } = this.state

    if (loading) {
      return <View><Spinner size="small" /></View>
    }

    if (!itemListLoaded) {
      this.setState({ loading: true })
      list = []
      firebase.database().ref('users/' + user + '/itemList').once('value', snapshot => {
        snapshot.forEach(function(item) {
          list.push(item.val())
        });
        this.setState({ itemList: list, itemListLoaded: true, loading: false })
      })
    }        
    return (
      itemList.map(item =>
        <ItemDetail onPress={this.onDeletePress.bind(this, item)} item={item} key={item.Product} />
      )
    )
  }

  renderMatchButton() {
    if (this.state.matchLoading) {
      return (
        <View style={{backgroundColor: '#f6c501', height: 47, justifyContent: 'center'}}>
          <ActivityIndicator color='white' size="small" />
        </View>
      )
    }

    return (
    <Button onPress={this.onMatch.bind(this)}>
        Find Matches
    </Button>
    )
  }

  onDeletePress(deletedItem) {
    const { user } = this.state
    firebase.database().ref('users/' + user + '/itemList').once('value', snapshot => {
      snapshot.forEach(function(item) {
        if (item.val().Product === deletedItem.Product) {
          firebase.database().ref('users/' + user + '/itemList/' + item.key).remove()
        }
      })
      this.setState({ itemListLoaded: false })
    })
  }

  onClearAll() {
    const { user } = this.state
    firebase.database().ref('users/' + user + '/itemList/').remove()
    firebase.database().ref('matches/' + this.props.location + '/' + this.props.user + '/').remove()    
    this.setState({ itemListLoaded: false, matchLoading: false})
  }

  onAdd() {
    this.props.navigator.push({
      title: 'Search',
      passProps: {
        user: this.props.user,
        type: 'forward',
        location: this.props.location
      }
    })
  }

  onMatch() {
    this.setState({ matchLoading: true })

    firebase.database().ref('matches/' + this.props.location + '/' + this.props.user + '/').remove()
    for (var item of this.state.itemList) {
      firebase.database().ref('matches/' + this.props.location + '/' + 
        this.props.user + '/').push(item)
    }
  }

  onBack() {
    this.props.navigator.push({
      title: 'Location',
      passProps: {
        user: this.props.user,
        type: 'backward',
        location: null
      }
    })
  }



}

const styles = {
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 35
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#f6c501',
  },
    buttonContainerStyle: {
    // paddingTop: 15,
    // paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  backStyle: {
    // marginRight: 300
  }
}




export default MainScene