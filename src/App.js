import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import BodypartNav from './components/Navigation/bodypart/BodypartNav';
//import MainNav from './components/Navigation/main/MainNav';
import MainNav2 from './components/Navigation/main/MainNav';
import Header from './components/Header/Header';
import Registration from './components/Register/Registration';
import Exercises from './components/Exercises/Exercises';
import Workout from './components/Exercises/Workout';


const URL_BASE = 'http://192.168.0.176:3002/';
const BODYPARTS_PATH = 'bodyparts';
const EXERCISES_PATH = 'exercises';
const REGISTER_PATH = 'users';
const LOGIN_PATH = 'users/login';
const LOGOUT_PATH = 'users/me/token'

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
    mainNavHidden: false,
    currentMainNav : 0,
    //register : false,
    registerMessage : '',
    loggedIn : false, //changed from false during development
    user : null,
    token : null,
    username: '',
    password: '',
    email: '',
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

  /*
  userPreRegisterHandler = () => {
      this.setState({register: true});

  }

  registerOnChangeHandler = (event) => {

    if(event.target.name === 'username') {
      this.setState({
        username: event.target.value
      });
    } else if(event.target.name === 'password') {
      this.setState({
        password: event.target.value
      });
    } else {
      this.setState({
        email: event.target.value
      });
    }
  }

  userPostRegisterHandler = async (event) => {
      //call the web service 
      console.log('Executing userPostRegisterHandler');
      event.preventDefault();

      this.setState({ isLoading: true });
      const username = this.state.username;
      const password = this.state.password;
      const email = this.state.email;

      try {
        const register = await axios.post(URL_BASE + REGISTER_PATH, {username, password, email});
        // console.log(register);
        alert('User successfully created!');
        this.setState({
          register: false,
          registerMessage: 'User successfully created!',
          isLoading: false
        });
  
      }catch(error) {
        // console.log('Error =' , error);
        //TODO: show message for the user
        alert('User already exists!');
        this.setState({
          register: false,
          registerMessage: 'User already exists!',
          isLoading: false
        });
      }
  }



  userRegisterCancelHandler = () => {
    this.setState({
      username: '',
      password: '',
      email: '',
      register: false
    });
  }
  */

  userRegisterHandler = async (event) => {
    //call the web service 
    console.log('Executing userRegisterHandler');
    event.preventDefault();

    this.setState({ isLoading: true });
    const username = this.state.username;
    const password = this.state.password;
    console.log('Username:  ' + username);
    console.log('password:  ' + password);
    const email = 'alexa@gmail.com';

    try {
      const register = await axios.post(URL_BASE + REGISTER_PATH, {username, password, email});
      // console.log(register);
      alert('User successfully created!');
      this.setState({
        //register: false,
        registerMessage: 'User successfully created!',
        isLoading: false
      });

    }catch(error) {
      // console.log('Error =' , error);
      //TODO: show message for the user
      alert('User already exists!');
      this.setState({
        //register: false,
        registerMessage: 'User already exists!',
        isLoading: false
      });
    }
  }

  userOnChangeHandler = (event) => {

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

  /*
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
  */

  loginHandler = async (event) => {
    event.preventDefault();
    this.setState({isLoading:true});

    const username = this.state.username;
    const password = this.state.password;
    console.log('Username=' , username , 'password=', password);

    try {
      const result = await axios.post(URL_BASE + LOGIN_PATH, {username, password});
      console.log(result);
      const user = result.data.user;
      console.log(user);
      const token = result.headers['x-auth'];
      console.log(token);
    
      this.setState({
        isLoading : false,
        loggedIn : true,
        user,
        token
      });
    }catch(error) {
      console.log(error);
      alert('Unable to login');
      this.setState({
        isLoading: false
      });
    }
  }

  logoutHandler = async (userName) => {
    this.setState({isLoading:true});

    try {
      const token = this.state.token;
      const result = await axios.delete(URL_BASE + LOGOUT_PATH, { headers: { 'x-auth': `${token}` } });
      console.log(result);

      this.setState({
        isLoading: false,
        loggedIn : false,
        user : null,
        token : null
      });
    }catch(error) {
      console.log(error);
      this.setState({isLoading:false});
    }
  }

  toggleMainNavHandler = () => {
    console.log('Inside toggleMainNavHandler ' + this.state.mainNavHidden)
    const hidden = this.state.mainNavHidden ? false : true
    this.setState({mainNavHidden : hidden})
  }

  mainNavHandler = (mainNavItemIndex) => {
    console.log('Inside mainNavHandler ' + this.state.currentMainNav + ' ' + mainNavItemIndex)
    this.setState({currentMainNav : mainNavItemIndex});
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
    let workout = [];
    
    for(let i=0; i<this.state.bodyparts.length; i++) {
      const exercises = this.getExercises(i+1, this.state.exercises);  
      const random = Math.floor(Math.random() * exercises.length);
      workout.push(exercises[random]);
    }
    this.setState({currentWorkout : workout});
  }

  render() {
    console.log('Enter render()');

    const pageContent = [];

    /*
    if(this.state.register) {
      pageContent.push(
        <Registration
          username={this.state.username}
          password={this.state.password}
          email={this.state.email}
          message={this.state.registerMessage}
          onchange={this.registerOnChangeHandler}
          onsubmitUserRegister={this.userPostRegisterHandler}
          onclickCancel={this.userRegisterCancelHandler}/>
      );
    } else {
      */
      if(this.state.currentMainNav === 0) {
        pageContent.push(      
          <BodypartNav
            key={0}
            bodypartItems={this.state.bodyparts}
            currentBodypart={this.state.currentBodypart}
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
      }else if(this.state.currentMainNav === 1) {
        console.log("inside page cardio");
      }else if(this.state.currentMainNav === 2) {
        console.log("inside page flex");
      }else if(this.state.currentMainNav === 3) {
        console.log("inside page relax");
      }
    //}

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
          onchange={this.userOnChangeHandler}
          onclickLogin={this.loginHandler} 
          onclickLogout={this.logoutHandler}
          onclickRegister={this.userRegisterHandler}/> 
        <MainNav2
          mainNavHidden={this.state.mainNavHidden}
          currentMainNavItem={this.state.currentMainNav}
          mainNavItems={this.state.mainNavItems}
          onclick={this.mainNavHandler}
          toggleMainNav={this.toggleMainNavHandler}/>
        {pageContent}
      </div>
    );
  }
}

export default App;
