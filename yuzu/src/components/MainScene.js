import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
// import { Drawer } from 'native-base'
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    this.state = { location: this.props.location, user: this.props.user, itemListLoaded: false, loading: false, itemList: [] };
    // this.state = { location: 'Seattle', user: 'GtzTKaVt3UNORfO9v04eRqFtjvf2', itemListLoaded: false, loading: false, itemList: [] };  

}

  render() {
    console.log(this.props.user)
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

      <Button onPress={this.onMatch.bind(this)}>
        Find Matches
      </Button>


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
    this.setState({ itemListLoaded: false})
  }

  onAdd() {
    this.props.navigator.push({
      title: 'Search',
      passProps: this.props,
      type: 'forward'
    })
  }

  onMatch() {
  }

  onBack() {
    this.props.navigator.push({
      title: 'Location',
      passProps: this.props,
      type: 'backward'
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 35,
    paddingRight: 35,
    margin: -10,
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