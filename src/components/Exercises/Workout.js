import React from 'react';
import WorkoutItem from './WorkoutItem';

const workout = (props) => {

    const workoutExercises = props.workoutExercises.map((exercise, index) => {
        return <WorkoutItem
            key={exercise.id}
            name={exercise.name}
            imgName={exercise.imgName}
            onclick={() => props.onclick(index)}/>
    });

    return(
        <div>
            <h2>Workout</h2>
            {workoutExercises}
        </div>
    );
}

export default workout;