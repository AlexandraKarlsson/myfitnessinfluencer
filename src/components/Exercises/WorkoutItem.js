import React from 'react';
import './WorkoutItem.css';

const workoutItem = (props) => {
    const image = require('./../../assets/images/' + props.imgName);

    return(
        <figure className="workoutItemFigure">
            <div onClick={props.onclick} class="workoutItemDivRemove">
                <p class="workoutItemPRemove">X</p>
            </div>
            <img className="workoutItemImg" src={image} alt={props.name}/>
            <figcaption className="workoutItemFigcaption">{props.name}</figcaption>
        </figure>
    );
}

export default workoutItem;