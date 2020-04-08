import React from 'react'
import Chatkit  from "@pusher/chatkit-client"
import MessageList from './MessageList'
import SendMessageForm from "./SendMessageForm"
import RoomList from "./RoomList"
import NewRoomForm from "./NewRoomForm"
import Login from "./Login"

import { tokenUrl, instanceLocator } from "../config"

class Chat extends React.Component{

  constructor(props){
    super(props)
    this.state={
      roomId: null,
      messages: [],
      joinableRooms:[],
      joinedRooms:[],
      loginScreen: true,
      mainUsername: this.props.username
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.displayChatScreen = this.displayChatScreen.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: this.state.mainUsername, /** swap out */
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })
    
    chatManager.connect()
    .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()     
    })
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
    })
    .catch(err => console.log("error on joinable rooms", err))
    console.log(this.state.mainUsername)
  }

  subscribeToRoom(roomId){
    this.setState({ messages: []})
    this.currentUser.subscribeToRoom({
      roomId: roomId, /** swap out */
      hooks: {
          onMessage: message => {
              // console.log('Message Text: ', message)
              this.setState({
                messages: [...this.state.messages, message]
              })
          }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
      
      this.getRooms()
    })       
  }

  //Getting the user of the room subscribed
  //Have to pass the entire room itself at this stage. 
  //if passing the roomId much better as it is in the state as well
  getUser(room){
    room.users.map((m) => {
      return console.log(m.name)
    })
  }

  createRoom(roomName){
    // if we pass the value as createRoom(name), then "name: roomName" can be changed to "name" without the quotes only as in j
    this.currentUser.createRoom({
      name: roomName
    })
    .then(room => this.subscribeToRoom(room.id))
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    })
  }

  displayChatScreen(ls, username){
    this.setState({ loginScreen: ls, mainUsername: username})
    console.log(this.state.mainUsername)
    console.log(username)
    console.log(this.state.loginScreen)
  }

  render(){
    if(this.state.loginScreen){
      return(
        <Login displayChatScreen = {this.displayChatScreen}/>
      )
    }
    
    return(
      // <Login displayChatScreen={this.displayChatScreen}/>
      // the way grid works is just insane so the div's height is matching the lower div's height for the div with className "app"
      <div style={{height: "100%"}}>
        <div className="app">
          <MessageList roomId={this.state.roomId} messages={this.state.messages}/>
          <SendMessageForm disabled={!this.state.roomId} sendMessage={this.sendMessage}/>
          <RoomList roomId = {this.state.roomId} subscribeToRoom = {this.subscribeToRoom} rooms ={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
          <NewRoomForm createRoom={this.createRoom}/>
        </div>
        </div>  
    )
  }
}

export default Chat
