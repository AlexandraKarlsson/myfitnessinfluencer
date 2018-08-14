import React from 'react';

const user = (props) => {

    let user;

    if (props.loggedIn) {
        user =
            <figure>
                <img src={props.userImg} alt="User Image"/>
                <figcaption>{props.userName}</figcaption>
                <input type="button" value="Logout" onClick={props.onclickLogout}/>
            </figure>;
    } else {
        user =
            <form className="logInForm" onSubmit={props.onclickLogin}>
                <label>Username:</label>
                <input type="text" name="username" onChange={props.onchange}/>
                <label>Password:</label>
                <input type="password" name="password" onChange={props.onchange}/>
                <input type="submit" value="Submit" />
            </form>;
    }

    return (
        <div>
            {user}
        </div>
    );
}

export default user;