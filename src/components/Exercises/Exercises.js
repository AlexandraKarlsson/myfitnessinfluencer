import React from 'react';
import ExerciseItem from './ExerciseItem';

const exercises = (props) => {

    var exercises = props.exerciseItems.map((exercise) => {
        return <ExerciseItem
                    key={exercise.id}
                    name={exercise.name}
                    imgName={exercise.imgName}/>
    });

    return(
        <div className="exerciseScrollBar">
            {exercises}
        </div>
    );
}

export default exercises;