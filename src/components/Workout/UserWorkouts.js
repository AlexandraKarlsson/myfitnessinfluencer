import React from 'react'
import WorkoutList from './WorkoutList'
//import MainNav from '../Navigation/main/MainNav'

const userWorkouts = (props) => {
    return(
        <main>
            <h2>Your Workouts:</h2>
            <WorkoutList
                userWorkouts={props.userWorkouts}
                onclick={props.onclick}/>
            <button onClick={props.onclickAddWorkout}>New Workout +</button>
        </main>
    )
}

export default userWorkouts