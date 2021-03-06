import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Image, Modal, TouchableWithoutFeedback, Vibration } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, LocationDetail, TextButton, ItemDetail, MatchDetail } from './common';
import firebase from 'firebase'

class MainScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ref: firebase.database().ref(),
      location: this.props.location,
      user: this.props.user, 
      itemListLoaded: false, 
      loading: false, 
      itemList: [],
      matchLoading: false,
      matching: false,
      matchCount: 0,
      matches: {},  
      showMatches: false,
      yuzuLoading: false,
      yuzuLoaded: false,
      yuzuList: [],
      notification: false, 
      notificationLoaded: false,
      notificationCount: 0,
     };
  }


  componentDidMount() {
    const { ref, user, location, matching, matchLoading } = this.state
    var matchStatus = ref.child('users/' + user + '/matchingStatus/')
    matchStatus.once('value', snapshot => {
      if (snapshot.val() == null) {
        matchStatus.set(false)
        this.setState({ matching: false })
      } else {
        this.setState({ matching: snapshot.val() })
      }
    })


    this.unseenMessageRef = firebase.database().ref('users/' + user + '/unseenMessageList/')
    this.unseenMessageRef.on('child_changed', (snapshot) => {
      // remove if buggy
      Vibration.vibrate()
      this.setState({ notificationLoaded: false })
    })
    this.unseenMessageRef.on('child_added', (snapshot) => {
      // remove if buggy      
      Vibration.vibrate()
      this.setState({ notificationLoaded: false })
    })
    this.unseenMessageRef.on('child_removed', (snapshot) => { 
      this.setState({ notificationLoaded: false })
    })

    this.matchRef = firebase.database().ref('matches/' + location + '/')
    this.matchRef.on('child_added', (snapshot) => {
      this.setState({ matchLoading: true }) 
    })
    this.matchRef.on('child_changed', (snapshot) => {
      this.setState({ matchLoading: true })
    })
    this.matchRef.on('child_removed', (snapshot) => {
      this.setState({ matchLoading: true })
    })

  }

  render() {
    const { buttonStyle, buttonTextStyle, buttonContainerStyle, backStyle, backTextStyle, menuStyle, messageStyle, locationStyle, locationImageStyle, locationContainerStyle, refreshStyle } = styles;
    const { ref, itemList, matchCount, user, location, matching, } = this.state

    if (matching) {3
      this.renderMatches()
    }

    return (
    <View style={{flex:1}}>
      <TouchableHighlight onPress={this.onMenuPress.bind(this)}>
        <Image style={menuStyle} source={require('../images/menu.png')} />
      </TouchableHighlight>

      {this.renderNotifications()}

      <View style={locationContainerStyle}>
        <Image style={locationImageStyle} source={require('../images/location.png')} />
        <Text style={locationStyle}>
          Costco, {this.state.location}
        </Text>
      </View>

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

      {this.renderMatchButton()}

      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.showMatches}
        onRequestClose={() => { this.setState({ showMatches: false })}}
        >

       <View style={{ height: 69 }}>
          <TouchableOpacity onPress={this.onHideMatchesMenu.bind(this)}>
            <View style={{ height: 25, width: 25, position: 'absolute', marginTop: 30, marginLeft: 12 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onHideMatchesMessage.bind(this)}>
            <View style={{ height: 28, width: 28, position: 'absolute', marginTop: 28, marginLeft: 335 }} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, backgroundColor: '#F8F8F8', borderTopColor: '#ddd', borderTopWidth: 1 }}>
          <View style={{ paddingTop: 7, backgroundColor: '#89bc4f', height: 40 }}>

            <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', fontWeight: '500' }}>
              Matches
            </Text>
            
            <TouchableOpacity style={refreshStyle} onPress={this.onRefresh.bind(this)} >
              <Image style={{height: 30, width: 30}} source={require('../images/refresh.png')} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {this.renderMatchList()}
          </ScrollView>

          <TouchableOpacity onPress={this.onHideMatches.bind(this)}>
            <Text style={{ transform: [{ rotate: '270deg'}], marginBottom: -10, marginTop: -10, fontSize: 50, color: '#89bc4f',  alignSelf: 'center' }}>
              ‹
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>

   )   
  }

  renderNotifications() {
    const { ref, user, notification, notificationLoaded, notificationCount } = this.state
    const { messageStyle, notificationStyle } = styles

    if (!notificationLoaded) {
      ref.child('users/' + user + '/unseenMessageList/').once('value', snapshot => {
        if (snapshot.val() == null) {
          this.setState({ notification: false, notificationLoaded: true })
        } else {
          this.setState({ notification: true, notificationCount: snapshot.val().length, notificationLoaded: true })
        }
      })

    }

    if (notification) {
      return (
      <TouchableHighlight onPress={this.onMessagePress.bind(this)}>
        <View>
        <Image style={messageStyle} source={require('../images/message_notification.png')} />
        <Text style={notificationStyle}>{notificationCount}</Text>
        </View>
      </TouchableHighlight>
      )
    } else {
      return (
      <TouchableHighlight onPress={this.onMessagePress.bind(this)}>
        <Image style={messageStyle} source={require('../images/message.png')} />
      </TouchableHighlight>
      )
    }

  }

  renderMatches() {
    const { ref, user, location, matchCount, matchLoading } = this.state
    if (matchLoading) {
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
        if (matchCount != Object.keys(matchesList).length - 1) {
          // remove if buggy          
          Vibration.vibrate()
        }
        this.setState({ matchLoading: false, matchCount: Object.keys(matchesList).length - 1 })
      })
    }
  }

  onHideMatchesMenu() {
    this.setState({ showMatches: false })
    this.onMenuPress()
  }

  onHideMatchesMessage() {
    this.setState({ showMatches: false })
    this.onMessagePress()
  }

  onRefresh() {
    this.setState({ yuzuLoaded: false })
    this.renderMatchList()
    this.forceUpdate()
  }

  onMessageMatch(match) {
    const { ref, user, location } = this.state
    this.setState({ showMatches: false })
    ref.child('users/' + user + '/messageProfileList/' + match.uid + '/messaging/').set(true)
    
    this.props.navigator.push({
      title: 'Message',
      passProps: {
        user: this.props.user,
        type: 'forward',
        location: this.props.location,
        match: match,
        matchUsername: match.username,
        back: 'Main'
      }
    })

  }

  renderMatchList() {
    const { ref, user, location, yuzuLoading, yuzuLoaded, yuzuList } = this.state

    if (yuzuLoading) {
      return (
        <View style={{backgroundColor: '#F8F8F8', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingTop: 200 }}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    
    if (!yuzuLoaded) {
      this.setState({ yuzuLoading: true })
    
      var tempList = []
      var tempCount = 0 

      ref.child('users/' + user + '/userMatchList/').once('value', snapshot => {
        snapshot.forEach(function(yuzu) {
          if (yuzu.val().uid != user) {
            tempList.push(yuzu.val())
            tempCount += 1
          }
        })

        tempList.sort(function (a, b) {
          return b.count - a.count;
        });

        this.setState({ yuzuList: tempList, yuzuLoaded: true, yuzuLoading: false, matchCount: tempCount })
      })  
    }

    return (
      yuzuList.map(match =>
        <MatchDetail match={match} key={match.uid} onPress={this.onMessageMatch.bind(this, match)} />
      )
    )
  }

  renderItemList() {
    const { ref, user, location, itemList, itemListLoaded, loading, matching } = this.state
    if (loading) {
      return <View><Spinner size="small" /></View>
    }

    if (!itemListLoaded) {
      this.setState({ loading: true })
      list = []
      ref.child('users/' + user + '/itemList/').once('value', snapshot => {
        if (snapshot.val() == null) {
          ref.child('users/' + user + '/itemMatchList/').remove()
          ref.child('users/' + user + '/matchingStatus/').set(false)
          this.setState({ matching: false }) 
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

  renderMatchButton() {
    const { matchLoading, matching, matchCount } = this.state
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
    } else if (matching && !matchLoading && (matchCount > 1 || matchCount <= 0 )) {
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
                ({matchCount}) Matches
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else if (matching && !matchLoading && matchCount == 1) {
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
                ({matchCount}) Match
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

  renderClearAll() {
    if (this.state.itemList.length > 1) {
      return (
        <View style={{ borderTopColor: '#ddd', borderTopWidth: 0.5, alignSelf: 'center', width: 350}}>
        <TextButton onPress={this.onClearAll.bind(this)}>
          Clear All
        </TextButton>
        </View>
      )
    } else if (this.state.itemList.length == 1) {
      return (
        <View style={{ borderTopColor: '#ddd', borderTopWidth: 0.5, alignSelf: 'center', width: 350}} />
      )
    }
  }

  onDeletePress(deletedItem) {
    const { ref, user, location, matching } = this.state
    ref.child('users/' + user + '/itemList/' + deletedItem.Product).remove()

    if (matching) {
      ref.child('matches/' + location + '/' + deletedItem.Product + '/').once('value', snapshot => {
        if (snapshot.val() != null) {
          var users = snapshot.val()
          if (users.indexOf(user) != -1) {
            users.splice(users.indexOf(user), 1)
            if (users.length == 0) {
              ref.child('matches/' + location + '/' + deletedItem.Product + '/').remove()
            } else {
              ref.child('matches/' + location + '/' + deletedItem.Product + '/').set(users)              
            }
          }
        }
      })
      ref.child('users/' + user + '/itemMatchList/' + deletedItem.Product).remove()   
    }
    this.setState({ itemListLoaded: false })
  }

  onClearAll() {
    const { ref, user, location, itemList, matching } = this.state
    
    if (matching) {
      if (itemList.length > 0) {
        itemList.forEach(function(item) {
          ref.child('matches/' + location + '/' + item.Product + '/').once('value', snapshot => {
            if (snapshot.val() != null) {
              var users = snapshot.val()
              if (users.indexOf(user) != -1) {
                users.splice(users.indexOf(user), 1)
                if (users.length == 0) {
                  ref.child('matches/' + location + '/' + item.Product + '/').remove()
                } else {
                  ref.child('matches/' + location + '/' + item.Product + '/').set(users)              
                }
              }
            }
          })
        })
      }
      ref.child('users/' + user + '/itemMatchList/').remove()      
      ref.child('users/' + user + '/matchingStatus/').set(false)
    }
    
    ref.child('users/' + user + '/itemList/').remove()
    this.setState({ matchLoading: false, itemListLoaded: false, matching: false })
  }

  updateMatches() {
    const { ref, user, location, itemList } = this.state
    if (itemList.length > 0) {
      itemList.forEach(function(item) {
        ref.child('matches/' + location + '/' + item.Product + '/').once('value', snapshot => {
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
      ref.child('users/' + user + '/matchingStatus/').set(true)
    }
  }

  onMatch() {
    const { ref, user, location, itemList } = this.state
    if (itemList.length > 0) {
      itemList.forEach(function(item) {
        ref.child('matches/' + location + '/' + item.Product + '/').once('value', snapshot => {
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
      ref.child('users/' + user + '/matchingStatus/').set(true)
      this.setState({ matching: true, matchLoading: true })      
    }
  }

  onStopMatching() {
    const { ref, user, location, itemList } = this.state

    if (itemList.length > 0) {
      itemList.forEach(function(item) {
        ref.child('matches/' + location + '/' + item.Product + '/').once('value', snapshot => {
          if (snapshot.val() != null) {
            var users = snapshot.val()
            if (users.indexOf(user) != -1) {
              users.splice(users.indexOf(user), 1)
              if (users.length == 0) {
                ref.child('matches/' + location + '/' + item.Product + '/').remove()
              } else {
                ref.child('matches/' + location + '/' + item.Product + '/').set(users)              
              }
            }
          }
        })        
      })
    }
    ref.child('users/' + user + '/itemMatchList/').remove()    
    ref.child('users/' + user + '/matchingStatus/').set(false)
    this.setState({ matching: false, matchLoading: false })    
  }

  onShowMatches() {
    this.setState({ showMatches: true, yuzuLoaded: false })
  }

  onHideMatches() {  
    this.setState({ showMatches: false, yuzuLoaded: false })
  }

  onMenuPress() {
    this.props.navigator.push({
      title: 'Menu',
      passProps: {
        user: this.props.user,
        location: this.props.location,
        screen: 'Main',
        type: 'menu',
        showLocation: true,
      }
    })
  }

  onMessagePress() {
    this.props.navigator.push({
      title: 'MessageList',
      passProps: {
        user: this.props.user,
        type: 'forward',
        location: this.props.location
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
    marginTop: 5
  },
  buttonContainerStyle: {
    paddingLeft: 2.5,
    paddingRight: 2.5,
    margin: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
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
    height: 22,
    marginTop: -38,
    marginLeft: 14
  },
  messageStyle: {
    width: 32,
    height: 32,
    marginTop: -45,
    marginLeft: 335  
  },
  notificationStyle: {
    marginTop: -30,
    marginLeft: 355,
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold'

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
  },
  locationContainerStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: -30,
  },
  locationImageStyle: {
    height: 12,
    width: 12,
    alignSelf: 'center',
    marginTop: 8,
    marginRight: 2
  },
  locationStyle: { 
    fontSize: 12, 
    color: '#404040', 
    paddingTop: 10,
    fontWeight: '500'
  },
  refreshStyle: {
    marginTop: -26.5,
    marginLeft: 335
  }
}




export default MainScene