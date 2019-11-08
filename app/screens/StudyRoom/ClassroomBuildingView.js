import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ActivityIndicator
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import FloatingSegment from '../../components/FloatingSegment';



const durationPairs = {
    '1 hour': '60',
    '2 hours': '120',
  };
  
  export default class ClassroomView extends Component {
    static navigationOptions = {
      header: () => {
        false;
      }
    }
  
    constructor(props) {
      super(props);
      this.state = {
        rooms: this.props.navigation.getParam('rooms', 'NA'),
        duration: '1 hour',
        slide: false
      };
    }
  
  
    onSwipeLeft(gestureState) {
      this.setDuration('2 hours');
    }
  
    onSwipeRight(gestureState) {
      this.setDuration('1 hour');
    }
  
    onSwipe(gestureName, gestureState) {
      const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
      switch (gestureName) {
        case SWIPE_LEFT:
          this.setDuration('2 hours');
          break;
        case SWIPE_RIGHT:
          this.setDuration('1 hour');
          break;
        default:
          break;
      }
    }
  
    setDuration = (hour) => {
      this.setState({
        duration: hour
      });
  
      this.setState({
        slide: true
      });
  
      setTimeout(() => {
        this.setState({
          slide: false
        });
      }, 100);
    }
  
    renderList(item) {
      const { duration } = this.state;
      if (duration.length !== 0 && durationPairs[duration] !== item.duration) {
        return;
      }
      let details = item.details.replace(/\n/g, '');
      details = details.trim();
      details = details.slice(0, -1);
      const detailsArray = details.split('(');
      // eslint-disable-next-line consistent-return
      return (
        <View style={styles.cell}>
          <View style={styles.containerRow}>
            <View style={styles.containerCol}>
              <Text style={styles.text}>
                {detailsArray[0]}
              </Text>
              <Text style={styles.littleText}>
                {detailsArray[1]}
              </Text>
            </View>
          </View>
        </View>
  
      );
    }
  
    render() {
      const { rooms, duration, slide } = this.state;
      const { navigate } = this.props.navigation;
      const tester = "Is this thing on?";
      const config = {
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 200
      };
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.bar}>
            <TouchableOpacity style={styles.leftButtonAbs} onPress={() => navigate('StudyRoomsContainer')}>
              <Ionicon name="ios-arrow-back" color="#108BF8" size={35} />
            </TouchableOpacity>
            <Text style={styles.titleText}>
              {' '}
              {namePairs[rooms.location]}
              {' '}
            </Text>
          </View>
          <FloatingSegment setCategory={this.setDuration} selected={duration} titles={['1 hour', '2 hours']} />
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeLeft={state => this.onSwipeLeft(state)}
            onSwipeRight={state => this.onSwipeRight(state)}
            config={config}
            style={{
              flex: 1,
              backgroundColor: 'white'
            }}
          >
            <FlatList
              data={rooms.available}
              extraData={this.state}
              renderItem={({ item }) => this.renderList(item)}
              keyExtractor={(item, index) => index.toString()}
              style={{ flex: 1, backgroundColor: 'transparent', marginTop: 5 }}
            />
          </GestureRecognizer>
          { slide ? <ActivityIndicator style={styles.animation} size="large" color="#108BF8" /> : null }
        </SafeAreaView>
  
      );
    }
  }
  
  const text = {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: 'black',
  };
  
  const styles = StyleSheet.create({
    searchText: {
      fontFamily: 'System',
      fontSize: 22,
      fontWeight: 'bold',
      fontStyle: 'normal',
      letterSpacing: 1.92,
      color: 'black',
      width: '80%',
    },
    text,
    littleText: {
      ...text,
      fontSize: 12,
      letterSpacing: 1.92,
      color: 'gray',
    },
    titleText: {
      ...text,
      fontSize: 17,
      fontWeight: '600',
      color: 'black'
    },
    whiteText: {
      ...text,
      fontSize: 15,
      color: 'white'
    },
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    list: {
      backgroundColor: 'transparent',
    },
    cell: {
      flex: 1,
      flexDirection: 'row',
      height: 120,
      width: '95%',
      padding: 10,
      marginTop: 4,
      marginBottom: 4,
      borderRadius: 5,
      alignSelf: 'center',
      backgroundColor: '#FFF',
      elevation: 2,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0.5,
        height: 0.5
      },
      shadowRadius: 1,
      shadowOpacity: 0.8,
    },
    containerCol: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 15,
      justifyContent: 'center',
      width: '100%',
    },
    containerRow: {
      flexDirection: 'row',
      marginTop: 3,
      marginBottom: 3,
      alignItems: 'center',
      width: '100%',
    },
    category: {
      fontSize: 11,
      fontStyle: 'italic',
    },
    imageIcon: {
      borderRadius: 5,
      height: 100,
      width: 100,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    leftButtonAbs: {
      width: 30,
      height: 30,
      position: 'absolute',
      left: 20,
      top: '15%',
      zIndex: 5
    },
    bar: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    animation: {
      backgroundColor: 'white',
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: '15%',
      justifyContent: 'center'
    }
  });