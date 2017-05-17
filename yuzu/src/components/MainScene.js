import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image, Modal, TouchableWithoutFeedback } from 'react-native';
// import { Drawer } from 'native-base'
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      // location: this.props.location,
      location: 'Kirkland',
      user: this.props.user, 
      itemListLoaded: false, 
      loading: false, 
      itemList: [],
      matchLoading: false,
      matching: false,
      matchCount: 0,
      matches: {},
      childAdded: false

     };
  }

  render() {
    console.log(this.state.childAdded)
    const { buttonStyle, buttonTextStyle, buttonContainerStyle, backStyle, backTextStyle, menuStyle } = styles;
    const { itemList, matchCount, user, location, matching, matchLoaded } = this.state
        
    {this.renderMatchingStatus()}
    {this.renderMatches()}

    if (matching) {
      this.onMatch()

      // firebase.database().ref('users/' + user + '/itemList/').on('child_added', function(snapshot) {
      //   snapshot.val().forEach(function(item) {
          
      //   })
      // })


      firebase.database().ref('matches/' + location + '/').on('child_added', function(snapshot) {
        // this.setState({ childAdded: true })
        firebase.database().ref('users/' + user + '/matchList').remove()

        firebase.database().ref('matches/' + location + '/').once('value', snapshot => {
          
          var matches = {}   

          snapshot.forEach(function(item) {
            var list = []
            var count = 0
            var username = ''
            var fname = ''
            var lname = ''

            if (item.key != user) {
              Object.keys(item.val()).forEach(function(key) {
                value = item.val()[key];

                itemList.forEach(function(product) {
                  if (product.Product == value.Product) {
                    list.push(value)
                    count += 1
                  }
                })
              });
            }

            if (count > 0) {
              firebase.database().ref('users/' + item.key + '/profile/').once('value', snapshot => {
                snapshot.forEach(function(item) {
                  username = item.val().username
                  fname = item.val().fname
                  lname = item.val().lname                  
                })

              // firebase.database().ref('users/' + user + '/matchList').remove()
              // firebase.database().ref('users/' + user + '/matchList/' + count).once('value', snapshot => {
              //   if (snapshot.val() == null) {
                  // firebase.database().ref('users/' + user + '/matchList/' + count).push({
                  //   'matchList': list, 
                  //   'user': item.key, 
                  //   'count': count, 
                  //   'username': username,
                  //   'fname': fname,
                  //   'lname': lname  
                  // })
                // }
              // })            

                if (matches[count] == null) {
                  matches[count] = []
                }

                var temp = matches[count]

                matches[count].push(
                  {'matchList': list, 
                  'user': item.key, 
                  'count': count, 
                  'username': username,
                  'fname': fname,
                  'lname': lname 
                  }
                )

                firebase.database().ref('users/' + user + '/matchList').remove()

                for (var key in matches) {
                  firebase.database().ref('users/' + user + '/matchList/' + key).set(matches[key]) 
                }
                
              })
            }
          })
        })
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

    </View>

   )   
  }

  renderMatches() { 
   
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
    const { itemList, itemListLoaded, loading, user, matching, location } = this.state

    if (loading) {
      return <View><Spinner size="small" /></View>
    }

    if (!itemListLoaded) {
      this.setState({ loading: true })

      list = []
      firebase.database().ref('users/' + user + '/itemList').once('value', snapshot => {
        if (snapshot.val() == null) {
          firebase.database().ref('matches/' + location + '/' + user + '/').remove()
          firebase.database().ref('users/' + user + '/matchingStatus/').set({ matching: false })
        }
        snapshot.forEach(function(item) {
          list.push(item.val())
        });
        this.setState({ itemList: list, itemListLoaded: true, loading: false  })
      })
    } 

    return (
      itemList.map(item =>
        <ItemDetail onPress={this.onDeletePress.bind(this, item)} item={item} key={item.Product} />
      )
    )
    
  }

  // renderMatchList() {
  //   const { matchCount, user, matching, matchListLoaded, matchLoading } = this.state

  //   // if (matchLoading) {
  //   //   return <View><Spinner size="small" /></View>
  //   // }

  //   // console.log('matchList loaded: ' + matchListLoaded)

  //   if (matching && !matchListLoaded) {
  //     // this.setState({ matchLoading: true })

  //     var matchRef = firebase.database().ref('users/' + user + '/matchList/');
  //     matchRef.orderByValue().on("value", snapshot => {
  //       if (snapshot.val() != null) {
  //         var stateMatchList = []
  //         var stateMatchCount = 0
  //         Object.keys(snapshot.val()).forEach(function(key) {
  //             Object.keys(snapshot.val()[key]).forEach(function(key2) {
  //             stateMatchList.push(snapshot.val()[key][key2])
  //             })
  //           stateMatchCount += 1
  //         })
  //         this.setState({ matchList: stateMatchList, matchCount: stateMatchCount, matchListLoaded: true, matchLoading: false })
  //       }
  //     })
  //   }

    // return (
    //   matchList.map(item =>
    //     <Text>{item}</Text>
    //   )
    // )

  // }

  renderMatchButton() {
    const { matchLoading, matching } = this.state
    const { matchViewStyle, matchLoadingStyle, stopMatchingStyle, matchExistsStyle } = styles

    if (matching && matchLoading) {
      return (
        <View style={matchViewStyle}>
          <TouchableOpacity onPress={this.onStopMatching.bind(this)}>
            <View style={stopMatchingStyle}>
              <Text style={{fontSize: 18, color: 'white'}}>
                Stop
              </Text>
            </View>  
            </TouchableOpacity>
          <View style={matchLoadingStyle}>
            <ActivityIndicator color='white' size="small" />
          </View>
        </View>
      )
    } else if (matching && !matchLoading) {
      return (
        <View style={matchViewStyle}>
          <TouchableOpacity onPress={this.onStopMatching.bind(this)}>
            <View style={stopMatchingStyle}>
              <Text style={{fontSize: 18, color: 'white'}}>
                Stop
              </Text>
            </View>  
            </TouchableOpacity>
          <TouchableOpacity onPress={this.onShowMatches.bind(this)}>
            <View style={matchExistsStyle}>
              <Text style={{fontSize: 18, color: 'white'}}>
                ({this.state.matchCount}) Matches
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
      <Button onPress={this.onMatch.bind(this)}>
          Find Matches
      </Button>
      )
    }
  }

  // renderMatchList() {
  //   const { matchList, matchCount, user, matching, matchListLoaded } = this.state
  //   console.log('matchList loaded: ' + matchListLoaded)
  //   if (matching && !matchListLoaded) {
  //     var matchRef = firebase.database().ref('users/' + user + '/matchList/');
  //     matchRef.orderByValue().on("value", snapshot => {
  //       if (snapshot != null) {
  //         var stateMatchList = []
  //         var stateMatchCount = 0
  //         Object.keys(snapshot.val()).forEach(function(key) {
  //             Object.keys(snapshot.val()[key]).forEach(function(key2) {
  //             stateMatchList.push(snapshot.val()[key][key2])
  //             })
  //           stateMatchCount += 1
  //         })
  //         this.setState({ matchList: stateMatchList, matchCount: stateMatchCount, matchListLoaded: true })
  //       }
  //     })
  //   }
  // }

  onDeletePress(deletedItem) {
    const { user, location } = this.state
    firebase.database().ref('users/' + user + '/itemList').once('value', snapshot => {
      snapshot.forEach(function(item) {
        if (item.val().Product === deletedItem.Product) {
          firebase.database().ref('users/' + user + '/itemList/' + item.key).remove()
        }
      })
      this.setState({ itemListLoaded: false })
    })
  }

  onShowMatches() {
    this.props.navigator.push({
      title: 'Match',
      passProps: {
        user: this.props.user,
        type: 'match',
        location: this.props.location
      }
    })
  }

  onClearAll() {
    const { user, location } = this.state
    firebase.database().ref('users/' + user + '/itemList/').remove()
    firebase.database().ref('matches/' + location + '/' + user + '/').remove()
    firebase.database().ref('users/' + user + '/matchingStatus/').set({ matching: false })
    this.setState({ matchLoading: false, itemListLoaded: false })
  }

  onStopMatching() {
    firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').remove()
    firebase.database().ref('users/' + this.state.user + '/matchingStatus/').set({ matching: false })
    this.renderMatchingStatus()
  }

  renderMatchingStatus() {
    const { user, matching, itemList } = this.state
    var userMatchStatus = firebase.database().ref('users/' + user + '/matchingStatus/')

    userMatchStatus.once('value', snapshot => {
      var matchStatus = false

      if (snapshot.val() == null) {
        userMatchStatus.set({ matching: false })
      } else {
        Object.keys(snapshot.val()).forEach(function(key) {
            matchStatus = snapshot.val()[key]
        })
      }
    
      if (matchStatus != matching) {
        this.setState({ matching: matchStatus })
      }
    })
  }

  onMatch() {
    if (this.state.itemList.length > 0) {
      firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').remove()
        for (var item of this.state.itemList) {
          firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').push(item)
        }
      firebase.database().ref('users/' + this.state.user + '/matchingStatus/').set({ matching: true })
      this.renderMatchingStatus()      
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
  },
  matchViewStyle: {
    flexDirection: 'row'
  }, 
  matchLoadingStyle: {
    flex: 1, 
    backgroundColor: '#f6c501',
    height: 47, 
    justifyContent: 'center',
  }, 
  stopMatchingStyle: {
    width: 75, 
    backgroundColor: '#89bc4f', 
    height: 47, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  matchExistsStyle: {
    flex: 1, 
    backgroundColor: '#699438',
    height: 47, 
    justifyContent: 'center',
    alignItems: 'center',
    width: 300
  }
}




export default MainScene