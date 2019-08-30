import React from 'react';
import './WorkoutItem.css';

const workoutItem = (props) => {
    // const imgPath = './../../assets/images/' + props.imgName;
    // console.log("imgPath: ", imgPath);
    const image = require('./../../assets/images/' + props.imgName);
    const setsName = `sets_${props.index}`;
    const repsName = `reps_${props.index}`;
    const weightName = `weight_${props.index}`;

    return(
        <div>
            <figure className="workoutItemFigure">
                <div className="workoutItemDivRemove" onClick={props.onclickRemove} >
                    <p className="workoutItemPRemove">X</p>
                </div>
                <img className="workoutItemImg" src={image} alt={props.name}/>
                <figcaption className="workoutItemFigcaption">{props.name}</figcaption>
            </figure>
            <div>
                <form>
                    <label>Sets</label>
                    <input type="number" name={setsName} value={props.sets} onChange={props.onchange}/>

                    <label>Reps</label>
                    <input type="number" name={repsName} value={props.reps} onChange={props.onchange}/>

                    <label>Weight</label>
                    <input type="number" name={weightName} value={props.weight} onChange={props.onchange}/>
                </form>
            </div>
        </div>
    );
}

export default workoutItem;