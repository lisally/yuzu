import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Spinner } from './common';
import firebase from 'firebase'

class MatchScene extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        user: this.props.user,
        location: this.props.location,
        loading: false,
        matchLoaded: false
     };
}

  render() {
    const { menuStyle } = styles
    return (
    <View style={{flex:1}}>
      <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
        <Image style={menuStyle} source={require('../images/menu.png')} />
      </TouchableHighlight>

      {/*<View style={{ backgroundColor: '#F8F8F8' }}>*/}
      <View style={{ }}>        
        <Text style={{ transform: [{ rotate: '90deg'}], fontSize: 28, color: '#89bc4f', marginLeft: 342, marginTop: 5, position: 'absolute' }}>
          ↻
        </Text>
        <Text style={{ fontSize: 24, color: '#89bc4f', alignSelf: 'center', paddingTop: 10 }}>
          Matches
        </Text>
      </View>

      {/*<ScrollView style={{ backgroundColor: '#F8F8F8' }}>*/}
      <ScrollView style={{  }}>
        {this.renderMatchList()}    
      </ScrollView>

      <Text style={{ transform: [{ rotate: '270deg'}], fontSize: 50, color: '#89bc4f',  alignSelf: 'center', margin: -7 }} onPress={this.onBack.bind(this)}>
        ‹
      </Text>

    </View>
   )
  }

  renderMatchList() {
    const { loading, user, location, matchLoaded } = this.state

    if (loading) {
      return <View><Spinner size="large" /></View>
    }
    
    if (!matchLoaded) {
      this.setState({ loading: true })


    }
  }

  onMenuPress() {
    this.props.navigator.push({
      title: 'Menu',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        screen: 'Match',
        type: 'menu'
      }
    })
  }

  onBack() {
    this.props.navigator.push({
      title: 'Main',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        type: 'matchBack'
      }
    })

  }

}

const styles = {
  viewStyle: {
    
  },
  menuStyle: {
    width: 22,
    height: 20,
    marginTop: -38,
    marginLeft: 14
  }
  
};



export default MatchScene