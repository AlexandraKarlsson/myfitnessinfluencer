import React from 'react';

const user = (props) => {

    let user;

    if (props.loggedIn) {
        user =
            <figure>
                <img src={props.user.userimg} alt="User Image"/>
                <figcaption>{props.user.username}</figcaption>
                <input type="button" value="Logout" onClick={props.onclickLogout}/>
            </figure>;
    } else {
        user =
            <div>
                <form className="logInForm" onSubmit={props.onclickLogin}>
                    <input type="text" name="username" onChange={props.onchange} placeholder="name@example.com"/>
                    <input type="password" name="password" onChange={props.onchange} placeholder="password"/>
                    <input type="submit" value="Login" />
                </form>
                <button onClick={props.onclickRegister}>Not a member?</button>
            </div>;
    }

    return (
        <div>
            {user}
        </div>
    );
}

export default user;