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
    exercises : exercises,
    currentExercises : null,
    currentWorkout : null

  }

  constructor(props){
    super(props);
    this.state.currentExercises = this.getExercises(1);
    console.log(this.state.currentExercises);
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
    /*if(this.state.currentBodypart !== bodypartIndex) {
        const currentExercises = this.state.exercises[bodypartIndex];
        this.setState({currentBodypart: bodypartIndex, currentExercises: currentExercises})
    }*/
  }


  render() {
    return (
      <div className="App">
        <Header/> 
        <MainNav
          mainNavItems={this.state.mainNavItems}
          clicked={this.mainNavHandler}/>
        <BodypartNav
          bodypartItems={this.state.bodyparts}
          clicked={this.bodypartNavHandler}/>
        <Exercises
          exerciseItems={this.state.currentExercises}/>
        <Workout
          workoutItems={this.state.workoutItems}/>
      </div>
    );
  }
}

export default App;
