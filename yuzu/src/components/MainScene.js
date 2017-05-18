import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image, Modal, TouchableWithoutFeedback } from 'react-native';
// import { Drawer } from 'native-base'
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ref: firebase.database().ref(),
      // location: this.props.location,
      location: 'Seattle',
      user: this.props.user, 
      itemListLoaded: false, 
      loading: false, 
      itemList: [],
      matchLoading: false,
      matching: false,
      matchCount: 0,
      matches: {},
      // childAdded: false
     };
  }

  render() {
    // console.log(this.state.childAdded)
    const { buttonStyle, buttonTextStyle, buttonContainerStyle, backStyle, backTextStyle, menuStyle } = styles;
    const { itemList, matchCount, user, location, matching, matchLoaded } = this.state
        
    {this.renderMatchingStatus()}

    // var item = 'item'

    // // var update = {
    // test = ['user1', 'user2', 'user3']
    // // }

    // firebase.database().ref('matches/Seattle/' + item).set(test)

    // firebase.database().ref('matches/Seattle/' + item).once('value', snapshot => {
    //   console.log(snapshot.key)
    //   console.log(snapshot.val())
    // })    

    // if (matching) {
    //   this.onMatch()

    //   // firebase.database().ref('users/' + user + '/itemList/').on('child_added', function(snapshot) {
    //   //   snapshot.val().forEach(function(item) {
          
    //   //   })
    //   // })


    //   firebase.database().ref('matches/' + location + '/').on('child_added', function(snapshot) {
    //     // this.setState({ childAdded: true })
    //     firebase.database().ref('users/' + user + '/matchList').remove()

    //     firebase.database().ref('matches/' + location + '/').once('value', snapshot => {
          
    //       var matches = {}   

    //       snapshot.forEach(function(item) {
    //         var list = []
    //         var count = 0
    //         var username = ''
    //         var fname = ''
    //         var lname = ''

    //         if (item.key != user) {
    //           Object.keys(item.val()).forEach(function(key) {
    //             value = item.val()[key];

    //             console.log(itemList)
    //             itemList.forEach(function(product) {
    //               if (product.Product == value.Product) {
    //                 list.push(value)
    //                 count += 1
    //               }
    //             })
    //           });
    //         }

    //         if (count > 0) {
    //           firebase.database().ref('users/' + item.key + '/profile/').once('value', snapshot => {
    //             snapshot.forEach(function(item) {
    //               username = item.val().username
    //               fname = item.val().fname
    //               lname = item.val().lname                  
    //             })

    //           // firebase.database().ref('users/' + user + '/matchList').remove()
    //           // firebase.database().ref('users/' + user + '/matchList/' + count).once('value', snapshot => {
    //           //   if (snapshot.val() == null) {
    //               // firebase.database().ref('users/' + user + '/matchList/' + count).push({
    //               //   'matchList': list, 
    //               //   'user': item.key, 
    //               //   'count': count, 
    //               //   'username': username,
    //               //   'fname': fname,
    //               //   'lname': lname  
    //               // })
    //             // }
    //           // })            

    //             if (matches[count] == null) {
    //               matches[count] = []
    //             }

    //             var temp = matches[count]

    //             matches[count].push(
    //               {'matchList': list, 
    //               'user': item.key, 
    //               'count': count, 
    //               'username': username,
    //               'fname': fname,
    //               'lname': lname 
    //               }
    //             )

    //             firebase.database().ref('users/' + user + '/matchList').remove()

    //             for (var key in matches) {
    //               firebase.database().ref('users/' + user + '/matchList/' + key).set(matches[key]) 
    //             }
                
    //             // this.setState({ matchCount: Object.keys(matches).length })


    //           })
    //         }
    //       })
    //     })
    //   })
    // }

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

  renderItemList() {
    const { ref, user, location, itemList, itemListLoaded, loading } = this.state
    if (loading) {
      return <View><Spinner size="small" /></View>
    }

    if (!itemListLoaded) {
      this.setState({ loading: true })
      list = []

      ref.child('users/' + user + '/itemList/').once('value', snapshot => {
        if (snapshot.val() == null) {
          this.onClearAll()
        }
        for (var item in snapshot.val()) {
          list.push(snapshot.val()[item])
        }
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

  onClearAll() {
    const { ref, user, location, itemList } = this.state
    if (itemList.length > 0) {
      itemList.forEach(function(item) {
        ref.child('matches/' + location + '/' + item.Product).once('value', snapshot => {
          var users = snapshot.val()
          users.splice(users.indexOf(user), 1)
          ref.child('matches/' + location + '/' + item.Product + '/').set(users)
        })
      })
    }
    ref.child('users/' + user + '/matchingStatus/').set(false)
    ref.child('users/' + user + '/itemList/').remove()
    this.setState({ matchLoading: false, itemListLoaded: false })
  }

  onStopMatching() {
    const { ref, user, location, itemList } = this.state

    if (itemList.length > 0) {
      itemList.forEach(function(item) {
        ref.child('matches/' + location + '/' + item.Product).once('value', snapshot => {
          var users = snapshot.val()
          users.splice(users.indexOf(user), 1)
          ref.child('matches/' + location + '/' + item.Product + '/').set(users)
        })
      })
    }
    ref.child('users/' + user + '/matchingStatus/').set(false)
    // TODO
    this.renderMatchingStatus()
  }

  onDeletePress(deletedItem) {
    const { ref, user, location } = this.state
    ref.child('users/' + user + '/itemList/' + deletedItem.Product).remove()
    this.setState({ itemListLoaded: false })
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

  renderMatchingStatus() {
    const { ref, user, matching } = this.state
    var matchStatus = ref.child('users/' + user + '/matchingStatus/')

    matchStatus.once('value', snapshot => {
      var status = false

      if (snapshot.val() == null) {
        matchStatus.set(false)
      } else {
        status = snapshot.val()
      }
    
      if (status != matching) {
        this.setState({ matching: status })
      }
    })
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

  onMatch() {
    const { ref, user, location, itemList } = this.state
    if (itemList.length > 0) {
      itemList.forEach(function(item) {
        ref.child('matches/' + location + '/' + item.Product).once('value', snapshot => {
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
      })
      
      ref.child('users/' + user + '/matchingStatus/').set({ matching: true })
      // TODO
      // this.renderMatchingStatus()      
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