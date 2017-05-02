import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
// import { Drawer } from 'native-base'
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    // this.state = { location: this.props.location, user: this.props.user, loading: true, itemList: [] };
    this.state = { location: 'Seattle', user: 'GtzTKaVt3UNORfO9v04eRqFtjvf2', loading: true, itemList: [] };  

}

  render() {
    const { buttonStyle, buttonTextStyle, buttonContainerStyle } = styles;
    return (
    <Card>
      <View style={buttonContainerStyle}>
      <TouchableOpacity onPress={this.onAdd.bind(this)} style={buttonStyle}>
        <Text style={buttonTextStyle}>
          +
        </Text>
      </TouchableOpacity>
      </View>

      <ScrollView>
        {this.renderItemList()}
      </ScrollView>

      {/*<Button onPress={this.onMatch.bind(this)}>
        Find Matches
      </Button>*/}


      <View>
        <TextButton onPress={this.onBack.bind(this)}>
          Back
        </TextButton>
      </View> 

    </Card>

   )   
  }

  renderItemList() {
    const { itemList, loading, user } = this.state

    if (loading) {
      list = []
      firebase.database().ref('users/' + user + '/itemList').once('value', snapshot => {
        snapshot.forEach(function(item) {
          // console.log(item.val());
          list.push(item.val())
        });
        this.setState({ itemList: list, loading: false })
      })
    }        
    // console.log(itemList)
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
      this.setState({ loading: true })
    })
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
    fontSize: 32
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#f6c501',
    borderRadius: 5
  },
    buttonContainerStyle: {
    padding: 20,
    margin: -10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
}




export default MainScene