import React from 'react';
import WorkoutItem from './WorkoutItem';

const workout = (props) => {

    // TODO: Add properties id, name, description 

    const workoutExercises = props.workoutExerciseData.map((exerciseData, index) => {
        
        const exerciseInfo = props.workoutExerciseInfo[index];

        console.log("ExerciseInfo: ", exerciseInfo);

        return <WorkoutItem
            key={exerciseInfo.id}
            name={exerciseInfo.name}
            index={index}
            imgName={exerciseInfo.imgName}
            sets={exerciseData.sets}
            reps={exerciseData.reps}
            weight={exerciseData.weight}
            onclickRemove={() => props.onclickRemove(index)}
            onchange={props.onchange}/>
    });

    console.log("workoutExercises in Workout.js : ", workoutExercises);

    return(
        <div>
            <h2>Workout</h2>
            <label>Name:</label>
            <input type="text" name="name" value={props.workoutName} onChange={props.onchange}/>
            <label>Description:</label>
            <textarea name="description" rows="4" cols="50" value={props.workoutDescription} onChange={props.onchange}/> 
            {workoutExercises}
            <input type="button" value="Save" onClick={props.onclickSave}/>
            <input type="button" value="Cancel" onClick={props.onclickCancel}/>
            <input type="button" value="Delete" onClick={props.onclickDelete}/>
        </div>
    );
}

export default workout;