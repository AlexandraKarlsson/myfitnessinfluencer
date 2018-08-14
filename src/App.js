import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './reset.css';
import BodypartNav from './components/Navigation/bodypart/BodypartNav';
import MainNav from './components/Navigation/main/MainNav';
import Header from './components/Header/Header';
import Exercises from './components/Exercises/Exercises';
import Workout from './components/Exercises/Workout';

const URL_BASE = 'http://192.168.0.109:3001/';
const BODYPARTS_PATH = 'bodyparts';
const EXERCISES_PATH = 'exercises';

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
    loggedIn : false,
    user : null,
    username: '',
    password: '',
    bodyparts : [],
    currentBodypart : 1,
    exercises : [],
    currentExercises : [],
    currentWorkout : [],
    isLoading : false,
    error : null
  }

  constructor(props){
    super(props);
  }

  async componentDidMount() {
  
    this.setState({ isLoading: true });

    try {
      const bodyparts = await axios.get(URL_BASE + BODYPARTS_PATH);
      const exercises = await axios.get(URL_BASE + EXERCISES_PATH);
      //console.log(`callback bodyparts = ${bodyparts.data.rows}`);
      //console.log(`callback exersices = ${exercises.data.rows}`);

      const currentExercises = this.getExercises(this.state.currentBodypart, exercises.data.rows);
      //console.log(`callback currentExercises = ${currentExercises}`);

      this.setState({
        bodyparts: bodyparts.data.rows,
        exercises: exercises.data.rows, 
        currentExercises : currentExercises,
        isLoading: false
      });

    }catch(error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  getExercises = (bodypartId, exercises) => {
    return exercises.filter((exerciseItem) => {
      return exerciseItem.bodypartId === bodypartId;
    });
  }

  loginOnChangeHandler = (event) => {

    if(event.target.name === 'username') {
      this.setState({
        username: event.target.value
      });
    } else {
      this.setState({
        password: event.target.value
      });
    }
  }

  loginHandler = (event) => {
    console.log('Username=' , this.state.username , 'password=', this.state.password);
    this.setState({loggedIn : true});
    event.preventDefault();
  }

  logoutHandler = (userName) => {
    console.log('User' , userName , 'logged out!');
    this.setState({user : null, 
                   loggedIn : false
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
      const currentExercises = this.getExercises(bodypartId, this.state.exercises);
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
      const exercises = this.getExercises(i+1, this.state.exercises);
      console.log(exercises);
      const random = Math.floor(Math.random() * exercises.length);
      console.log(random);
      workout.push(exercises[random]);
    }
    this.setState({currentWorkout : workout});
  }

  render() {
    console.log('Enter render()');
    console.log( `exercises = ${this.state.exercises}`);
    console.log( `currentExercises = ${this.state.currentExercises}`);

    const pageContent = [];
    if(this.state.currentNav === 0) {
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

    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    console.log('Return render()');
    return (
      <div className="App">
        <Header
          loggedIn={this.state.loggedIn}
          user={this.state.user}
          onchange={this.loginOnChangeHandler}
          onclickLogin={this.loginHandler} 
          onclickLogout={this.logoutHandler}/> 
        <MainNav
          mainNavItems={this.state.mainNavItems}
          onclick={this.mainNavHandler}/>
        {pageContent}
      </div>
    );
  }
}

export default App;
