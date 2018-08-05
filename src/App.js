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
    currentNav : 0,
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
    this.setState({currentNav : mainNavItemIndex});
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

  workoutExerciseRemoveHandler = (exerciseIndex) => {
    const workoutUpdated = [...this.state.currentWorkout];
    workoutUpdated.splice(exerciseIndex, 1);
    this.setState({currentWorkout : workoutUpdated});
  }

  randomWorkoutHandler = () => {
    console.log("Inside the randomWorkoutHandler!");
    let workout = [];
    
    for(let i=0; i<this.state.bodyparts.length; i++) {
      const exercises = this.getExercises(i+1);
      console.log(exercises);
      const random = Math.floor(Math.random() * exercises.length);
      console.log(random);
      workout.push(exercises[random]);
    }
    this.setState({currentWorkout : workout});
  }



  render() {

    const pageContent = [];
    if(this.state.currentNav === 0) {
      console.log("inside page weights");
      pageContent.push(      
        <BodypartNav
          key={0}
          bodypartItems={this.state.bodyparts}
          onclick={this.bodypartNavHandler}
          onclickRandom={this.randomWorkoutHandler}/>);
        pageContent.push(
        <Exercises
          key={1}
          exerciseItems={this.state.currentExercises}
          onclick={this.exerciseHandler}/>);
        pageContent.push(
        <Workout
          key={2}
          workoutExercises={this.state.currentWorkout}
          onclick={this.workoutExerciseRemoveHandler}/>);
    }else if(this.state.currentNav === 1) {
      console.log("inside page cardio");
    }else if(this.state.currentNav === 2) {
      console.log("inside page flex");
    }else if(this.state.currentNav === 3) {
      console.log("inside page relax");
    }


    return (
      <div className="App">
        <Header/> 
        <MainNav
          mainNavItems={this.state.mainNavItems}
          onclick={this.mainNavHandler}/>
        {pageContent}
      </div>
    );
  }
}

export default App;
