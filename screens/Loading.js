import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /** Simulate asynchronus authentication for 0.5s */
    setTimeout(() => {
      this.props.navigation.navigate('App')
    }, 500) /** Navigate to App Screen in 0.5s **/
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" color="rgb(27, 40, 54)"/>
        <Entypo name={'twitter'} size={70} style={styles.logo}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(27, 40, 54)'
  },
  logo: {
    alignSelf: "center",
    color: 'rgb(29, 161, 242)'
  }
});