import React from 'react'
import WorkoutListItem from './WorkoutListItem'

const workoutList = (props) => {

    const workoutItems = props.userWorkouts.map((item, index) => {
        return(
            <WorkoutListItem
                key={item.id}
                id={item.id}
                name={item.name}
                onclick={() => props.onclick(item.id, index)}/>
        )
    })

    console.log(workoutItems)
    return(
        <div>
            {workoutItems}
        </div>
    )
}

export default workoutList