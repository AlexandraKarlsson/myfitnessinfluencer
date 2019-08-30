import React from 'react'


const workoutListItem = (props) => {

    //props.id och props.name props.onclick
    return(
        <input type="button" onClick={props.onclick} value={props.name}/>
    )
}

export default workoutListItem