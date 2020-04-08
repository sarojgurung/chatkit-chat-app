import React from 'react'
import Login from "./components/Login"
import Chat from "./components/Chat"

import { tokenUrl, instanceLocator } from "./config"

class App extends React.Component{

  constructor(){
    super()
    this.state={
      isLoginpage: true,
      mainUsername: ''
    }
    this.displayChatScreen = this.displayChatScreen.bind(this)
  }

  //this may not be the best practise. coz the username is not assigned by itself
  //therefore causing unexpected behaviour
  displayChatScreen(ls, username){
    this.setState({ isLoginpage: ls, mainUsername: username})
    console.log(this.state.mainUsername)
    console.log(username)
    console.log(this.state.isLoginpage)
  }

  render(){
    if(this.state.isLoginpage){
      return(
        <Login displayChatScreen = {this.displayChatScreen}/>
      )
    }
    
    return(
      // <Login displayChatScreen={this.displayChatScreen}/>
      // the way grid works is just insane so the div's height is matching the lower div's height for the div with className "app"
      <div style={{height: "100%"}}>
        <Chat username={this.state.mainUsername} />
      </div>  
    )
  }
}

export default App
