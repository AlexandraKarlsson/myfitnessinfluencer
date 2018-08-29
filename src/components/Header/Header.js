import React from 'react';
import User from './User';

const header = (props) => {

    // <div>
    // <img className="userImg" src="" alt="User Image"/>
    // <p>Username</p>
    // </div>

    return(
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
    );
}

export default header;