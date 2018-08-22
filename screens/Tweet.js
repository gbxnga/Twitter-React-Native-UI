import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  
  TouchableHighlight,
  TouchableOpacity, 
} from 'react-native'
import PropTypes from 'prop-types';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import randomWords from 'random-words'


const userImage = {uri : 'https://pbs.twimg.com/profile_images/951903664809050114/Grfd40ih_400x400.jpg'}
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
String.prototype.capitalizeFirstLetter = function() {
  return `${this.substr(0,1).toUpperCase()}${this.substr(1)}`;
}
export default class Tweet extends React.Component {

  constructor(props) {
    super(props)
    const {tweet, name, handle, time, retweeted, liked, picture} = this.props
    const twit = randomWords({min: 18, max: 40}).join(" ");
    this.state = {
      photo: {uri :  picture.thumbnail},
      touched: false,
      tweet: twit,
      retweets:Math.floor((Math.random() * 100) + 1),
      likes:Math.floor((Math.random() * 10) + 1),
      name: `${name.first.capitalizeFirstLetter()} ${name.last.capitalizeFirstLetter()}`,
      handle: `@${name.first}`,
      time: "1hr",
      retweeted: [true, false].random(),
      liked: [true, false].random(),
      retweetedBy:["Sandra", "Hannit","Michael", "Jason", "Queen"][Math.floor(Math.random()*["Sandra", "Hannit","Michael", "Jason", "Queen"].length)]
    }
    this.tweetPressed = this
      .tweetPressed
      .bind(this)

    this.retweet = this.retweet.bind(this)
    this.like = this.like.bind(this)
  }

  tweetPressed(pressed = false) {
    
    this.setState({touched: pressed})
  }

  retweet(){

    const {retweeted, retweets} = this.state
  

    if (retweeted) 
      this.setState({retweeted: false, retweets: retweets-1})
    

    else this.setState({retweeted: true, retweets: retweets+1})
  }
  like(){
    const {liked, likes} = this.state
  

    if (liked) 
      this.setState({liked: false, likes: likes-1})
    

    else this.setState({liked: true, likes: likes+1})
  }

  render() {

    const {navigation, thekey, isReply} = this.props
    const {touched, tweet, retweets, likes, name, handle, time, retweetedBy, retweeted, liked, photo} = this.state


    return(
      <TouchableHighlight onPress={()=>navigation.navigate('Thread')} onPressIn={() => this.tweetPressed(true)} onPressOut={() => this.tweetPressed()}>
        <View key={thekey} style={styles.container}>
            { !isReply ? 
            <View style={styles.isReplyContainer}>
            
                <View style={{flex:0.23, borderColor:"red", borderWidth:0, alignItems:"flex-end"}}>
                  <EvilIcons  name={'retweet'} size={25} color={'rgb(136, 153, 166)'}/>
                </View>
                <Text style={{flex:0.5, color:"rgb(136, 153, 166)"}}>{retweetedBy} Retweeted</Text>
            </View>
            : 
            true
            }
            <View style={styles.innerContainer}>
            
              <View style={styles.photoContainer}>
                <View style={styles.innerPhotoContainer}>
                  <TouchableOpacity
                  
                  onPress={() => navigation.navigate('Profile')}>
                  <Image
                    source={photo}
                    style={styles.photo}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.info}>

                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{name}
                    <Text style={styles.userHandleAndTime}>{handle} · {time}</Text>
                  </Text>
                </View>
              <View style={styles.tweetTextContainer}>
                <Text style={styles.tweetText}>{tweet}</Text>

              </View>
              <View style={styles.tweetActionsContainer}>
                <TouchableOpacity style={styles.commentButton}>
                  <EvilIcons name={'comment'} style={styles.commentButtonIcon} size={25} color={'rgb(136, 153, 166)'}/>
                <Text style={styles.commentsCount}>20</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.retweet()}  style={styles.retweetButton}>
                  <EvilIcons name={'retweet'} size={25} color={(retweeted) ? "rgb(23, 191, 99)":'rgb(136, 153, 166)'}/>
                  <Text style={[styles.retweetButtonIcon, {color: retweeted ? "rgb(23, 191, 99)" : "rgb(136, 153, 166)",fontWeight: retweeted ? "bold" : "300",}]}>{retweets}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.like()}  style={styles.likeButton}>
                { liked ? 
                  <Entypo name={'heart'} size={18} style={{marginLeft:4}} color={liked ? "rgb(224, 36, 94)" : 'rgb(136, 153, 166)'}/>
                  :
                  <EvilIcons name={'heart'} size={25} color={liked ? "rgb(224, 36, 94)" : 'rgb(136, 153, 166)'}/>
                
                }
                <Text style={[styles.likeButtonIcon, {color: liked ? "rgb(224, 36, 94)" : "rgb(136, 153, 166)",fontWeight: liked ? "bold" : "300",}]}>{likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}>

                  <SimpleLineIcons name={'share'} size={16} color={'rgb(136, 153, 166)'}/>
                
                </TouchableOpacity>
              </View>
              
              </View>
            </View>
        </View>
       </TouchableHighlight>

    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    flexDirection: "column",
    backgroundColor: "#1b2836"
  },
  isReplyContainer: {
    flex: 1,
    borderColor: "green",
    flexDirection: "row",
    borderWidth: 0,
    height: 20,
    marginTop: 5
  },
  innerContainer: {
    flex: 1,
    borderColor: "green",
    flexDirection: "row",
    borderWidth: 0,
    height: "auto"
  },
  photoContainer: {
    flex: 0.23,
    borderColor: "yellow",
    flexDirection: "column",
    borderWidth: 0
  },
  innerPhotoContainer: { height: 100, alignItems: "center" },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 15
  },
  info: {
    flex: 0.77,
    borderColor: "yellow",
    flexDirection: "column",
    borderWidth: 0
  },
  userDetails: {
    flex: 1,
    borderColor: "blue",
    borderWidth: 0,
    marginBottom: 5
  },
  userName: { color: "white", fontWeight: "bold" },
  userHandleAndTime: {
    color: "rgb(136, 153, 166)",
    marginLeft: 5
  },
  tweetTextContainer: { flex: 1, borderColor: "blue", borderWidth: 0 },
  tweetText: { color: "white", paddingRight: 10 },
  tweetActionsContainer: {
    flex: 1,
    borderColor: "blue",
    borderWidth: 0,
    marginTop: 5,
    flexDirection: "row",
    paddingBottom: 5
  },
  commentButton: {
    paddingLeft: 0,
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 0
  },
  commentButtonIcon: {
    margin: 0,
    marginLeft: -4,
    borderColor: "red",
    borderWidth: 0
  },
  commentsCount: {
    position: "absolute",
    left: 27,
    color: "rgb(136, 153, 166)",
    marginLeft: -4
  },
  retweetButton: {
    padding: 5,
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 0
  },
  retweetButtonIcon: {
    position: "absolute",
    left: 27,

    marginLeft: 3
  },
  likeButton: {
    padding: 5,
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 0
  },
  likeButtonIcon: {
    position: "absolute",
    left: 27,

    marginLeft: 3
  },
  shareButton: {
    padding: 5,
    flex: 0.25,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 0
  }
});

Tweet.propTypes = {
  retweeted: PropTypes.string.isRequired
};
Tweet.defaultProps = {
  name: "Anonymous",
  tweet: "A tweet",
  retweeted: false,
  liked: false
};

