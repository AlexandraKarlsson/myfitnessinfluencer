import React from 'react';

const registration = (props) => {
    return(
        <div>
            <h2>{props.message}</h2>
            <form className="registrationForm" onSubmit={props.onsubmitUserRegister}>
                <label>Username:</label>
                <input type="text" name="username" onChange={props.onchange}/>
                <label>Password:</label>
                <input type="password" name="password" onChange={props.onchange}/>
                <label>Email:</label>
                <input type="email" name="email" onChange={props.onchange}/>
                
                <input type="submit" value="Member me" />
            </form>
            <button onClick={props.onclickCancel}>Cancel</button>
        </div>
    );
};

export default registration;