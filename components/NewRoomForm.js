import React from "react"

class NewRoomForm extends React.Component{

    constructor(){
        super()
        this.state = {
            roomName: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            roomName: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        //preventing the code from making an empty room
        // if (this.state.roomName !== "") // not needed as the input has required field on it
            this.props.createRoom(this.state.roomName)
        this.setState({roomName: ""})
    }
    
    render(){
        return(
            <div className="new-room-form">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        required //prevents from making a room with an empty name
                        type="text"
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        placeholder="Create New Room"
                    />
                </form>
            </div>
        )
    }
}

export default NewRoomForm