/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry} from 'react-native';

import {SwitchNavigator, createDrawerNavigator, createTabNavigator} from 'react-navigation'
import LoadingScreen from './screens/Loading'
import DrawerContainer from './screens/DrawerContainer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


import Entypo from 'react-native-vector-icons/Entypo'

import Home from './screens/Home'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Nativee!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}
class DummyScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Entypo name={'twitter'} size={70} style={{color: 'rgb(29, 161, 242)'}} />
      </View>
    );
  }
}
const HomeTabs =  createTabNavigator({
  Home: {
    screen: Home, 

  },
  Search: {
    screen: DummyScreen,
    navigationOptions: {
      tabBarLabel: 'Search',
    }
  },
  Notification: {
    screen: DummyScreen,
    navigationOptions: {
      tabBarLabel: 'Notification',
    }
  },
  DM: {
    screen: DummyScreen,
    navigationOptions: {
      tabBarLabel: 'DM',
    }
  },
  
}, 
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      
      switch (routeName){

        case "Home":
          return <Octicons name={'home'} size={30} color={ focused ? 'rgb(29, 161, 242)':'rgb(136, 153, 166)'} />
        
        case "Search":
          return <EvilIcons name={'search'} size={35} color={ focused ?  'rgb(29, 161, 242)':'rgb(136, 153, 166)'} />
        
        case "Notification":
          return <Ionicons
                  name={'ios-notifications-outline'}
                  size={30}
                  style={{ color: focused ?  'rgb(29, 161, 242)':'rgb(136, 153, 166)' }}
                />
        
        case "DM":
          return <FontAwesome
                  name={'envelope-o'}
                  size={26}
                  style={{ color: focused ? 'rgb(29, 161, 242)':'rgb(136, 153, 166)' }}
                />
        
      }
    },
  }),


  tabBarPosition: 'bottom',
  //tabBarComponent: (props) => <CustomTabComponent {...props}/>,
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel:false,
    showIndicator:false,
    titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    style: {
        borderWidth: 0,
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
        backgroundColor: 'rgb(27, 42, 51)',
        borderColor: 'rgb(27, 42, 51)',
        shadowColor:'red',
        elevation:2
    },
    activeBackgroundColor: 'rgb(0, 79, 114)',
    inactiveBackgroundColor: 'rgb(27, 42, 51)',
    labelStyle: {
        fontSize: 14,
        color: '#fff',
        position: 'relative',
        alignSelf: 'center',

    },
    iconStyle:{
      marginBottom:5,
      marginTop:5
    },
    tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    indicatorStyle: {
      backgroundColor: 'transparent',
  },
},
});
const  AppStack = createDrawerNavigator(
  { 
    //Home: () => <View style={{flex:1}}><Text>The Home</Text></View>,
    Home: HomeTabs,
    Profile: () => <View style={{flex:1}}><Text>Profile Page</Text></View>,
  },
  {
    contentComponent: ({navigation}) => <DrawerContainer  navigation={navigation}/>
  }
);

export default AppNavigator = SwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
console.disableYellowBox = true;
AppRegistry.registerComponent('Twitter', () => AppNavigator);
