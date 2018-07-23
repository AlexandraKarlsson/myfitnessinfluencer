import React from 'react';
import './ExerciseItem.css';

const exerciseItem = (props) => {
    const image = require('./../../assets/images/' + props.imgName);

    return(
        <figure className="exerciseItemFigure">
            <img className="exerciseItemImg" src={image} alt={props.name}/>
            <figcaption className="exerciseItemFigcaption">{props.name}</figcaption>
        </figure>
    );
}

export default exerciseItem;