import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Spinner, MatchDetail } from './common';
import firebase from 'firebase'

class MatchScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ref: firebase.database().ref(),
        user: this.props.user,
        location: this.props.location,
        loading: false,
        matchLoaded: false,
        matchList: []
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
        <Text style={{ fontSize: 24, color: '#89bc4f', alignSelf: 'center', paddingTop: 10, paddingBottom: 10 }}>
          Matches
        </Text>
      </View>

      <ScrollView style={{ backgroundColor: '#F8F8F8', }}>
      {/*<ScrollView style={{  }}>*/}
        {this.renderMatchList()}    
      </ScrollView>

      <TouchableOpacity onPress={this.onBack.bind(this)}>
        <Text style={{ transform: [{ rotate: '270deg'}], fontSize: 50, color: '#89bc4f',  alignSelf: 'center', margin: -7 }}>
          ‹
        </Text>
      </TouchableOpacity>

    </View>
   )
  }

  renderMatchList() {
    const { ref, user, location, loading, matchLoaded, matchList } = this.state

    if (loading) {
      return <View style={{backgroundColor: '#F8F8F8'}}><Spinner size="large" /></View>
    }
    
    if (!matchLoaded) {
      this.setState({ loading: true })

      var matchesList = {}
      var matches = []

      ref.child('users/' + user + '/matchList/').once('value', snapshot => {
        snapshot.forEach(function(match) {
          // console.log(match.val().item)
          // console.log(match.val().users)
          match.val().users.forEach(function(user) {
            if (matchesList[user] == null) {
              matchesList[user] = []
            }
            matchesList[user].push(match.val().item)
          })

        })

        for (var user in matchesList) {
          // console.log(matchesList[user].length) //count
          // console.log(matchesList[user]) // list
          // console.log(user) // userid
          ref.child('users/' + user + '/profile/').once('value', snapshot => { 
            matches.push({
              uid: user,
              username: snapshot.val().username,
              fname: snapshot.val().fname,
              lname: snapshot.val().lname,
              count: matchesList[user].length,
              list: matchesList[user]
            })
          })
        }

        console.log(matches)
        
      })



      // matchRef.orderByValue().on("value", snapshot => {
      //   var stateMatchList = []
      //   var stateMatchCount = 0
      //   if (snapshot.val() != null) {
      //     var stateMatchList = []
      //     var stateMatchCount = 0
      //     Object.keys(snapshot.val()).forEach(function(key) {
      //         Object.keys(snapshot.val()[key]).forEach(function(key2) {
      //         stateMatchList.push(snapshot.val()[key][key2])
      //         })
      //       stateMatchCount += 1
      //     })
      //   }
      //   this.setState({ matchList: stateMatchList, matchLoaded: true, loading: false })
      // })
      
      // this.setState({ matchList: stateMatchList, matchLoaded: true, loading: false })
      this.setState({ matchLoaded: true, loading: false })      

    }

    // return (
    //   matchList.map(match =>
    //     <MatchDetail match={match} key={match.user} />
    //   )
    // )
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