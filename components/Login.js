import React from "react"

function Login(props){


    function handleChange(e){
        // console.log(e.target.value)
        props.displayChatScreen(false, e.target.value)
    }
    
    return(
        <div>
            <button onClick={handleChange} value="Saroj">Login as Saroj</button>
            <button onClick={handleChange} value="Guest">Login as Guest</button>
        </div>
    )
}

export default Login