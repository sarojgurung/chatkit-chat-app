import React, { Component } from 'react';

class AudioComponent extends Component{

    constructor(props){
        super(props);
        this.state = {timers: true};
    }

    componentDidMount(){
        // this.test();
        // this.state.timers =setTimeout(() => this.test(), 5000) //here the "this" is required to call the function within the class component
        this.setState({
            timers: setTimeout(() => this.test(), 2000)
        });
    }

    componentWillUnmount(){}
    
    test() {
        const aud = document.getElementById("my_audio");
        aud.play();        
    }

    render(){
        return(
       <div>
            {/* <audio autoPlay controls src="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3"></audio>      */}
            <audio controls src="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3" id="my_audio"></audio>
        </div>);
    }
}

// function test() {
//     const aud = document.getElementById("my_audio");
//     aud.play();        
// }

export default AudioComponent;
