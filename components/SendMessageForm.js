import React from "react"

class SendMessageForm extends React.Component{

    constructor(){
        super()
        this.state={
            message:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        // console.log(e.target.value)
        this.setState({message: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        if (this.state.message !== "")//preventing from sending empty messages as people could possibly press enter continuously
            this.props.sendMessage(this.state.message)
        this.setState({message: ''})
    }

    render(){
        // console.log(this.state.message)
        return(
            <div className="send-message-form">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        disabled = {this.props.disabled}
                        type="text"
                        value={this.state.message} //the name of the variable has to meet that of the state variable
                        onChange={this.handleChange}
                        placeholder="Type your message and hit ENTER to send"
                        width="100%"
                    />
                </form>
            </div>
        )
    }
}

export default SendMessageForm