import React, { Component } from 'react';
import { Animated, Image, Platform, StyleSheet, View, Text, ListView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DrawerActions} from 'react-navigation'

import axios from "axios"

import Tweet from './Tweet'

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

const AnimatedListView = Animated.createAnimatedComponent(ListView);

export default class Home extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      dataSource: [],
      data: false,
      dataSource: [],
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      ),
    };
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  componentDidMount() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
  })
    /** Fetch tweets */
    axios.get(`https://randomuser.me/api/?results=10`)
    .then(response => {
      
      return response
    })
    .then(json => {
      
      const {results} = json.data
      
      this.setState({dataSource: ds.cloneWithRows(results), data: true})
      
    })
    .catch((error) => {
        console.log(` ${error}`)
    });


    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  _renderRow = (rowData, sectionId, rowId) => {
    return (
      <View style={{flex:1}}>
      <Image key={rowId} style={styles.row} source={{ uri: rowData.image }} resizeMode="cover"/>
        <Text style={styles.rowText}>{rowData.title}</Text>
      </View>
    );
  };
  renderRow(record){

    return(
        <Tweet navigation={this.props.navigation} {...record} />
    )

  }

  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.fill, {backgroundColor:"rgb(27, 40, 54)"}]}>

      { this.state.data ? 
        <AnimatedListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true },
          )}
        />

        :             
        <View style={[styles.container, styles.horizontal]}>                
            <ActivityIndicator size="small" color="rgb(29, 161, 242)" />
        </View> 
    }
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
        <TouchableOpacity style={styles.avatar}>
          <Image
          onPress={() => this.props.dispatch(DrawerActions.openDrawer()) }
          source={require('../assets/images/avatar.png')}
          style={{width:35,height:35, borderRadius:50,marginTop:5,marginLeft:25}}
          />
        </TouchableOpacity>
        <Animated.View>
          <Animated.Text style={[styles.title, { opacity: navbarOpacity }]}>
            Home
          </Animated.Text>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  fill: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgb(27, 42, 51)',
    borderBottomColor: '#dedede',
    borderBottomWidth: 0,
    height: NAVBAR_HEIGHT,
    justifyContent: "flex-start",
    elevation:8,
    flex: 1, flexDirection: 'row'
    //paddingTop: STATUS_BAR_HEIGHT,
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
  title: {
    color: 'white',
    fontWeight:"bold"
  },
  row: {
    height: 300,
    width: null,
    marginBottom: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  rowText: {
    color: 'white',
    fontSize: 18,
  },
  avatar:{
    marginRight:15
  }
});