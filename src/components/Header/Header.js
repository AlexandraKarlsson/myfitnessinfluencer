import React from 'react'
import Logo from './Logo'
import Profile from './Profile'
import SignupLogin from './SignupLogin'
import './Header.css'

const header = (props) => {

    const headerContent = []
    headerContent.push(<Logo/>)
    if(props.loggedIn) {
        headerContent.push(
            <Profile
                user={props.user.username}
                onclickSettings={props.onclickSettings}
                onclickLogout={props.onclickLogout}/>)
    } else {
        headerContent.push(
            <SignupLogin
                onchange={props.onchange}
                onclickLogin={props.onclickLogin}
                onclickRegister={props.onclickRegister}/>)
    }
    
    return(
        <header id="header_Container">
            {headerContent}
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
