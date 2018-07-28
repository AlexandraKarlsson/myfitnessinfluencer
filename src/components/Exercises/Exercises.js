import React from 'react';
import ExerciseItem from './ExerciseItem';

const exercises = (props) => {

    var exercises = props.exerciseItems.map((exercise, exerciseIndex) => {
        return <ExerciseItem
                    key={exercise.id}
                    name={exercise.name}
                    imgName={exercise.imgName}
                    onclick={()=>props.onclick(exerciseIndex, exercise.id)}/>
    });

    return(
        <div>
            <h2>Exercises</h2>
            <div className="exerciseScrollBar">
                {exercises}
            </div>
        </div>
    );
}

export default exercises;