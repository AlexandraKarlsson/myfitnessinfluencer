import React from 'react'
import Logo from './Logo'
import Profile from './Profile'
import SignupLogin from './SignupLogin'
import './Header.css'

const header = (props) => {

    let profileOrSignUpLogin
    //TODO: check why profile dosent show when logged in

    if(props.loggedIn) {
        profileOrSignUpLogin = 
            <Profile
                username={props.user.username}
                onclickSettings={props.onclickSettings}
                onclickLogout={props.onclickLogout}/>
    } else {
        profileOrSignUpLogin = 
            <SignupLogin
                onchange={props.onchange}
                onclickLogin={props.onclickLogin}
                onclickRegister={props.onclickRegister}/>
    }
    
    return(
        <header id="header_Container">
            <Logo/>
            {profileOrSignUpLogin}
        </header>
    );
}

export default header;


/*
    // <div>
    // <img className="userImg" src="" alt="User Image"/>
    // <p>Username</p>
    // </div>

        <header>
            <img className="logo" alt="Logo" src=""/>
            <h1>My Fitness Influencer!</h1>
            <User 
                loggedIn={props.loggedIn} 
                user={props.user}
                onchange={props.onchange}
                onclickLogin={props.onclickLogin}
                onclickLogout={props.onclickLogout}
                onclickRegister={props.onclickRegister}/>


            <button><img src="" alt="Menu" onClick={props.onclick}/></button>
        </header>

*/
