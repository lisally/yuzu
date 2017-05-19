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
        yuzuList: []
     };
}

  render() {
    const { ref, user, location, } = this.state
    const { menuStyle } = styles

    ref.child('matches/' + location + '/').on('child_changed', function(snapshot, prevChild) {
      console.log('child changed')
      ref.child('users/' + user + '/itemList/').once('value', snapshot => {
        snapshot.forEach(function(item) {
          ref.child('matches/' + location + '/' + item.key).once('value', snapshot2 => {
            if (snapshot2.val() != null) {
              ref.child('users/' + user + '/itemMatchList/' + snapshot2.key).set({
                item: item.val(),
                users: snapshot2.val()
              })
            }
          })
        })
      })
    })

    ref.child('matches/' + location + '/').on('child_removed', function(snapshot, prevChild) {
      // console.log('child removed')
      ref.child('users/' + user + '/itemList/').once('value', snapshot => {
        snapshot.forEach(function(item) {
          ref.child('matches/' + location + '/' + item.key).once('value', snapshot2 => {
            if (snapshot2.val() != null) {
              ref.child('users/' + user + '/itemMatchList/' + snapshot2.key).set({
                item: item.val(),
                users: snapshot2.val()
              })
            }
          })
        })
      })  
    })

    ref.child('matches/' + location + '/').on('child_added', function(snapshot, prevChild) {
      // console.log('child added')
      ref.child('users/' + user + '/itemList/').once('value', snapshot => {
        snapshot.forEach(function(item) {
          ref.child('matches/' + location + '/' + item.key).once('value', snapshot2 => {
            if (snapshot2.val() != null) {
              ref.child('users/' + user + '/itemMatchList/' + snapshot2.key).set({
                item: item.val(),
                users: snapshot2.val()
              })
            }
          })
        })
      })
    })




    return (
    <View style={{flex:1}}>
      <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
        <Image style={menuStyle} source={require('../images/menu.png')} />
      </TouchableHighlight>

      {/*<View style={{ backgroundColor: '#F8F8F8' }}>*/}
      <View style={{ }}>
        <TouchableOpacity onPress={this.onRefresh.bind(this)}>    
          <Text style={{ transform: [{ rotate: '90deg'}], fontSize: 28, color: '#89bc4f', marginLeft: 342, marginTop: 5, position: 'absolute' }}>
            ↻
          </Text>
        </TouchableOpacity>
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

  onRefresh() {
    this.setState({ matchLoaded: false })
  }

  renderMatchList() {
    const { ref, user, location, loading, matchLoaded, yuzuList } = this.state

    console.log('rendering')

    if (loading) {
      return <View style={{backgroundColor: '#F8F8F8'}}><Spinner size="large" /></View>
    }
    
    if (!matchLoaded) {
      this.setState({ loading: true })

      var matchesList = {}
      var matches = []

      ref.child('users/' + user + '/itemMatchList/').once('value', snapshot => {
        snapshot.forEach(function(match) {
          match.val().users.forEach(function(yuzu) {
            if (matchesList[yuzu] == null) {
              matchesList[yuzu] = []
            }
            matchesList[yuzu].push(match.val().item)
          })

        })

        Object.keys(matchesList).forEach(function(key) {

          ref.child('users/' + key + '/profile/').once('value', snapshot => { 
            matches.push({
              uid: key,
              username: snapshot.val().username,
              fname: snapshot.val().fname,
              lname: snapshot.val().lname,
              count: matchesList[key].length,
              list: matchesList[key]
            })
            ref.child('users/' + user + '/userMatchList/').set(matches)
          })
        })
      })    
    

      var tempList = []

      ref.child('users/' + user + '/userMatchList/').once('value', snapshot => {
        snapshot.forEach(function(yuzu) {
          if (yuzu.val().uid != user) {
            tempList.push(yuzu.val())
          }
        })
        ref.child('users/' + user + '/userMatchList/').set(tempList)
        this.setState({ yuzuList: tempList, matchLoaded: true, loading: false })  
      })  
    }

    return (
      yuzuList.map(match =>
        <MatchDetail match={match} key={match.uid} />
      )
    )
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