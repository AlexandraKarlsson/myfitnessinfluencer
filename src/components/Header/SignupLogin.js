import React from 'react'
import './SignupLogin.css'

const signupLogin = (props) => {
    return (
        <form>
            <div id="signupLogin_Container">
                <input id="signupLogin_Username" name="username" type="text" placeholder="Username" onChange={props.onchange}/>
                <input id="signupLogin_Password" name="password" type="password" placeholder="Password" onChange={props.onchange}/>
                <button id="signupLogin_Login" onClick={props.onclickLogin}>Login</button>
                <button id="signupLogin_MemberMe" onClick={props.onclickRegister}>Member me</button>
            </div>
        </form>
    )
}

export default signupLogin