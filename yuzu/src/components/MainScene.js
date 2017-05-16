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
      matchList: [],
      matchCount: 0,
      showMatches: false,
      matchChanged: false,
      matchListLoaded: false
     };

     this.render = this.render.bind(this)

}

  render() {
    // console.log('matching: ' + this.state.matching)
    // console.log('matchCount ' + this.state.matchCount)
    // console.log('matchList ')
    // console.log(this.state.matchList)
    const { buttonStyle, buttonTextStyle, buttonContainerStyle, backStyle, backTextStyle, menuStyle } = styles;
    const { matchList, itemList, matchCount, user, location, matching } = this.state
    
    
    {this.renderMatchingStatus()}

    // {this.onMatch()}

    // {this.renderMatchList.bind(this)}    

    // {this.renderMatchListState()}

    if (matching) {
      this.onMatch()

      firebase.database().ref('matches/' + location + '/').on('child_added', function(snapshot) {
        // console.log('changed')

        firebase.database().ref('users/' + user + '/matchList').remove()

        firebase.database().ref('matches/' + location + '/').once('value', snapshot => {
          snapshot.forEach(function(item) {
            var list = []
            var count = 0

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
              firebase.database().ref('users/' + user + '/matchList/').remove()
              firebase.database().ref('users/' + user + '/matchList/' + count).push({ matchedList: list, matchedUser: item.key, matchedCount: count })                                                                                       
            }
          })
        })
        this.setState({ matchListLoaded: false })
        this.renderMatchListState()
      }.bind(this))
      // })

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

      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.showMatches}
        onRequestClose={() => { this.setState({ showMatches: false })}}
        >
        
        <TouchableWithoutFeedback onPress={this.onHideMatches.bind(this)}>
          <View style={{ height: 225 }}>
          </View>
        </TouchableWithoutFeedback>

        <View style={{ flex: 1, backgroundColor: '#F8F8F8', borderTopColor: '#ddd', borderTopWidth: 1 }}>
          <ScrollView style={{ marginTop: 7 }}>
            <Text style={{ transform: [{ rotate: '90deg'}], fontSize: 28, color: '#89bc4f', marginLeft: 342, marginTop: -8, position: 'absolute' }}>
              ↻
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#89bc4f', alignSelf: 'center' }} onPress={this.onHideMatches.bind(this)}>
              Matches
            </Text>

            {/*{this.renderMatchList()}*/}

          </ScrollView>

          <Text style={{ transform: [{ rotate: '270deg'}], marginBottom: -15, fontSize: 50, color: '#89bc4f',  alignSelf: 'center' }} onPress={this.onHideMatches.bind(this)}>
            ‹
          </Text>
        </View>
      </Modal>

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
        // firebase.database().ref('matches/' + location + '/' + user + '/').remove()
        snapshot.forEach(function(item) {
          // if (matching) {
            // firebase.database().ref('matches/' + location + '/' + user + '/').push(item.val())
          // }
          list.push(item.val())
        });
        this.setState({ itemList: list, itemListLoaded: true, loading: false })
      })
    } 

    // if (matching) {
      // this.onMatch()
    //   firebase.database().ref('matches/' + location + '/' + user + '/').remove()
    //   itemList.forEach(function (item) {
    //     firebase.database().ref('matches/' + location + '/' + user + '/').push(item)
    //   })
    // }

    return (
      itemList.map(item =>
        <ItemDetail onPress={this.onDeletePress.bind(this, item)} item={item} key={item.Product} />
      )
    )
  }

  renderShowMatches() {
    if (this.state.showMatches) {
      return (
        <View>
          <Modal>
            <Text>
              HELLO
            </Text>
          </Modal>
        </View>
      )
    }
  }

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
  //   const { matchList, itemList, matchCount, user, location, matching } = this.state    

  //   if (matching) {
  //     firebase.database().ref('matches/' + location + '/').on('child_added', function(snapshot) {
  //       console.log('changed')

  //       firebase.database().ref('users/' + user + '/matchList').remove()

  //       firebase.database().ref('matches/' + location + '/').once('value', snapshot => {
  //         snapshot.forEach(function(item) {
  //           var list = []
  //           var count = 0

  //           if (item.key != user) {
  //             Object.keys(item.val()).forEach(function(key) {
  //               value = item.val()[key];

  //               itemList.forEach(function(product) {
  //                 if (product.Product == value.Product) {
  //                   list.push(value)
  //                   count += 1
  //                 }
  //               })
  //             });
  //           }
  //           if (count > 0) {
  //             firebase.database().ref('users/' + user + '/matchList/').remove()
  //             firebase.database().ref('users/' + user + '/matchList/' + count).push({ matchedList: list, matchedUser: item.key, matchedCount: count })                                                                                       
  //           }
  //         })
  //       })
  //     // this.setState({ matchListLoaded: false })
        
  //     })
  //     // this.setState({ matchListLoaded: false })
  //   }

  //   // var matchRef = firebase.database().ref('users/' + user + '/matchList/');
  //   // matchRef.orderByValue().on("value", snapshot => {
  //   //   var list = []
  //   //   var count = 0
  //   //   Object.keys(snapshot.val()).forEach(function(key) {
  //   //       Object.keys(snapshot.val()[key]).forEach(function(key2) {
  //   //       list.push(snapshot.val()[key][key2])
  //   //     })
  //   //     count += 1
  //   //   })

  //   //   this.setState({ matchList: list, matchCount: count })
  //   // })
    
  // }

  renderMatchListState() {
    const { matchList, matchCount, user, matching, matchListLoaded } = this.state
    console.log(matchListLoaded)
    if (matching && !matchListLoaded) {
      var matchRef = firebase.database().ref('users/' + user + '/matchList/');
        matchRef.orderByValue().on("value", snapshot => {
          if (snapshot != null) {
            var stateMatchList = []
            var stateMatchCount = 0
            Object.keys(snapshot.val()).forEach(function(key) {
                Object.keys(snapshot.val()[key]).forEach(function(key2) {
                stateMatchList.push(snapshot.val()[key][key2])
              })
              stateMatchCount += 1
            })
            this.setState({ matchList: stateMatchList, matchCount: stateMatchCount, matchListLoaded: true })
            }
        })
        
      // this.setState({ matchList: stateMatchList, matchCount: stateMatchCount, matchListLoaded: true })
    }
  }

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
    this.setState({ showMatches: true })
  }

  onHideMatches() {
    this.setState({ showMatches: false })
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
      }
      
      Object.keys(snapshot.val()).forEach(function(key) {
          matchStatus = snapshot.val()[key]
      })

      if (matchStatus != matching) {
        this.setState({ matching: matchStatus })
      }
    })
  }

  onMatch() {
    // this.setState({ matchLoading: true })
    if (this.state.itemList.length > 0) {
      firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').remove()
        for (var item of this.state.itemList) {
          firebase.database().ref('matches/' + this.state.location + '/' + this.state.user + '/').push(item)
        }
      firebase.database().ref('users/' + this.state.user + '/matchingStatus/').set({ matching: true })
      this.renderMatchingStatus()    
      // this.setState({ matching: true, matchLoading: true })    
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