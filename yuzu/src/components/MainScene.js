import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image } from 'react-native';
// import { Drawer } from 'native-base'
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      // location: this.props.location,
      location: 'Seattle',
      user: this.props.user, 
      itemListLoaded: false, 
      loading: false, 
      itemList: [],
      matchLoading: false,
      matching: false,
      matchList: []
     };

}

  render() {
    console.log('matching: ' + this.state.matching)
    console.log('location: ' + this.state.location)
    console.log('user: ' + this.state.user)

    const { buttonStyle, buttonTextStyle, buttonContainerStyle, backStyle, backTextStyle, menuStyle } = styles;
    
    {this.renderMatching()}

    if (this.state.matching) {
      firebase.database().ref('matches/' + this.state.location + '/').on('child_changed', function(snapshot) {
        // this.updateMatch()
      })
    }

    return (
    <View style={{flex:1}}>
      <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
        <Image style={menuStyle} source={require('../images/menu.png')} />
      </TouchableHighlight>
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
        <Text style={backTextStyle} onPress={this.onBack.bind(this)}>
          ‹
        </Text>
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
    const { itemList, itemListLoaded, loading, user, matching } = this.state

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
    const { user, location } = this.state
    firebase.database().ref('users/' + user + '/itemList/').remove()
    firebase.database().ref('matches/' + location + '/' + user + '/').remove()
    this.setState({ itemListLoaded: false, matchLoading: false})
  }

  renderMatching() {
    if (!this.state.matching) {
      firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').once('value', snapshot => {
        if (snapshot.val() != null) {
          this.setState({ matching: true })
        }
      })
    }

    if (this.state.matching) {
      firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').once('value', snapshot => {
        if (snapshot.val() == null) {
          this.setState({ matching: false })
        }
      })
      firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').remove()
      for (var item of list) {
        firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').push(item)
      }
    }
  }

  onMatch() {
    // this.setState({ matchLoading: true })

    firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').remove()
    for (var item of this.state.itemList) {
      firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').push(item)
    }
    this.setState({ matching: true })
  }

  updateMatch() {
    
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

  onMenuPress() {
    this.props.navigator.push({
      title: 'Menu',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        screen: 'Main',
        type: 'menu'
      }
    })
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
    marginLeft: 10
  },
  backTextStyle: {
    color: '#89bc4f',
    fontSize: 40
  },
  menuStyle: {
    width: 22,
    height: 20,
    marginTop: -38,
    marginLeft: 14
  }
}




export default MainScene