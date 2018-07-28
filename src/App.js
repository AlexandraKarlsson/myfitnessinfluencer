import React, { Component } from 'react';
import logo from './logo.svg';
import './reset.css';
import BodypartNav from './components/Navigation/bodypart/BodypartNav';
import MainNav from './components/Navigation/main/MainNav';
import Header from './components/Header/Header';
import Exercises from './components/Exercises/Exercises';
import Workout from './components/Exercises/Workout';

import bodyparts from './assets/data/bodyparts.json';
import exercises from './assets/data/exercises.json';

class App extends Component {

  state = {
    mainNavItems : [
      {
        id: 1,
        name: "Weights"
      },
      {
        id: 2,
        name: "Cardio"
      },
      {
        id: 3,
        name: "Flex"
      },
      {
        id: 4,
        name: "Relax"
      }
    ],
    bodyparts : bodyparts,
    currentBodypart : 1,
    exercises : exercises,
    currentExercises : [],
    currentWorkout : []

  }

  constructor(props){
    super(props);
    this.state.currentExercises = this.getExercises(this.state.currentBodypart);
  }

  getExercises = (bodypartId) => {
    return this.state.exercises.filter((exerciseItem) => {
      return exerciseItem.bodypartId === bodypartId;
    });
  }

  mainNavHandler = (mainNavItemIndex) => {
    /*if(this.state.currentBodypart !== bodypartIndex) {
        const currentExercises = this.state.exercises[bodypartIndex];
        this.setState({currentBodypart: bodypartIndex, currentExercises: currentExercises})
    }*/
  }

  bodypartNavHandler = (bodypartIndex) => {

    //check if selected bodypart is not the same as currentbodypart
    //change currentExercises to the selected bodypart
    const bodypartId = bodypartIndex+1;

    if(this.state.currentBodypart !== bodypartId) {
      const currentExercises = this.getExercises(bodypartId);
      this.setState({currentBodypart : bodypartId, currentExercises : currentExercises});
    }
  }

  exerciseHandler = (exerciseIndex, exerciseId) => {
      const exist = this.state.currentWorkout.find((exercise) => {
        return (exercise.id === exerciseId)
      });

      if(!exist) {
        const exerciseSelected = {...this.state.currentExercises[exerciseIndex]};

        let workoutUpdated = [...this.state.currentWorkout];
        workoutUpdated.push(exerciseSelected); 
        this.setState({currentWorkout : workoutUpdated});
      }
  }

  workoutRemoveHandler = () => {

  }


  render() {
    return (
      <div className="App">
        <Header/> 
        <MainNav
          mainNavItems={this.state.mainNavItems}
          onclick={this.mainNavHandler}/>
        <BodypartNav
          bodypartItems={this.state.bodyparts}
          onclick={this.bodypartNavHandler}/>
        <Exercises
          exerciseItems={this.state.currentExercises}
          onclick={this.exerciseHandler}/>
        <Workout
          workoutExercises={this.state.currentWorkout}/>
      </div>
    );
  }
}

export default App;
