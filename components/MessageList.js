import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {

    componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight //here clientHeight is the visible height of the message content.
        //so basically setting the shouldScrollToBottom for componentDidUpdate
    }

    componentDidUpdate(){ //when there is a new message/change to another room, the bottom most message will be shown first
        if (this.shouldScrollToBottom){
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight //scrollTop is how much we have scrolled from the top, scrollHeight is the total height of the scrollable content and therefore goes as down as possible
        }
    }

    render() {
        if(!this.props.roomId){
            return(
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {this.props.messages.map((m, index) => {
                    return (
                        <Message key={index} userName={m.senderId} text={m.text} />
                        // <div key={index} className="message">
                        //     <div className="message-username">{m.senderId}</div>
                        //     <div className="message-text">{m.text}</div>
                        // </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList