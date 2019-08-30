import React, { Component } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';
import BodypartNav from './components/Navigation/bodypart/BodypartNav';
//import MainNav from './components/Navigation/main/MainNav';
import MainNav from './components/Navigation/main/MainNav';
import Header from './components/Header/Header';
//import Registration from './components/Register/Registration';
import Exercises from './components/Exercises/Exercises';
import Workout from './components/Exercises/Workout';
import UserWorkouts from './components/Workout/UserWorkouts'
import Information from './components/Information/Information';
import Footer from './components/Footer/Footer';

const URL_BASE = 'http://192.168.0.176:3002/';
const BODYPARTS_PATH = 'bodyparts';
const EXERCISES_PATH = 'exercises';
const REGISTER_PATH = 'users';
const WORKOUTS_PATH = 'workouts'
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

    // User data
    loggedIn : false, // Changed from false during development
    user : null,
    token : null,
    username: '',
    password: '',
    email: '',

    // Bodyparts and exercises available
    bodyparts : [],
    currentBodypart : 1,
    exercises : [], // Contains all exercises no matter which bodypart
    currentExercises : [], // Exercises for the selected bodypart

    // Users workouts and new/selected workout
    userWorkouts: [], // Contains workout name and id for the user
    userCurrentWorkoutId : null,
    userCurrentWorkoutName : "",
    userCurrentWorkoutDescription : "",
    userCurrentExerciseInfo : null, // Contains the selected workout for the user
    userCurrentExerciseData: null,  // Dynamic data about the exercise
    
    isLoading : false,
    error : null
  }
/*
  constructor(props){
    super(props);
  }
  */

  async componentDidMount() {
  
    this.setState({ isLoading: true });

    try {
      const bodyparts = await axios.get(URL_BASE + BODYPARTS_PATH);
      const exercises = await axios.get(URL_BASE + EXERCISES_PATH);
      // console.log(`callback bodyparts = ${bodyparts.data.rows}`);
      // console.log(`callback exersices = ${exercises.data.rows}`);

      const currentExercises = this.getExercises(this.state.currentBodypart, exercises.data.rows);
      // console.log(`callback currentExercises = ${currentExercises}`);

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

  userRegisterHandler = async (event) => {
    //call the web service 
    console.log('Executing userRegisterHandler');
    event.preventDefault();

    this.setState({ isLoading: true });
    const username = this.state.username;
    const password = this.state.password;
    console.log('Username:  ' + username);
    console.log('password:  ' + password);
    const email = `${username}@gmail.com` ;

    try {
      const register = await axios.post(URL_BASE + REGISTER_PATH, {username, password, email});
      console.log(register);
      alert('User successfully created!');
      this.setState({
        //register: false,
        registerMessage: 'User successfully created!',
        isLoading: false
      });

    }catch(error) {
      // console.log('Error =' , error);
      alert('User already exists!');
      this.setState({
        //register: false,
        registerMessage: 'User already exists!',
        isLoading: false
      });
    }
  }


  loginHandler = async (event) => {
    event.preventDefault();
    this.setState({isLoading:true});

    const username = this.state.username;
    const password = this.state.password;
    console.log('Username=' , username , 'password=', password);

    try {
      let result = await axios.post(URL_BASE + LOGIN_PATH, {username, password});
      console.log(result);
      const user = result.data.user;
      console.log(user);
      const token = result.headers['x-auth'];
      console.log(token);

      result = await axios.get(URL_BASE + WORKOUTS_PATH, { headers: { 'x-auth': `${token}` } });
      console.log("User workouts: " + JSON.stringify(result.data.workouts));
      const userWorkouts = result.data.workouts;
    
      this.setState({
        isLoading : false,
        loggedIn : true,
        user,
        token,
        userWorkouts
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
    const exist = this.state.userCurrentExerciseInfo.find((exercise) => {
      return (exercise.id === exerciseId)
    });

    console.log("Exist: ", exist);

    if(!exist) {  
      // Handel static data
      const exerciseSelected = {...this.state.currentExercises[exerciseIndex]};
      console.log("ExerciseSelected : " + JSON.stringify(exerciseSelected));
      let workoutUpdatedInfo = [...this.state.userCurrentExerciseInfo];
      workoutUpdatedInfo.push(exerciseSelected); 

      // Handel dynamic data
      const dynamicData = {
        exerciseid : exerciseSelected.id, 
        reps : 10, 
        sets : 1, 
        weight : 0
      }
      let workoutUpdatedData = [...this.state.userCurrentExerciseData];
      workoutUpdatedData.push(dynamicData);

      this.setState({
        userCurrentExerciseInfo : workoutUpdatedInfo, 
        userCurrentExerciseData : workoutUpdatedData
      });
    } 
  }

  workoutExerciseRemoveHandler = (exerciseIndex) => {
    // Handle static data
    const userCurrentExerciseInfo = [...this.state.userCurrentExerciseInfo];
    userCurrentExerciseInfo.splice(exerciseIndex, 1);

    // Handle dynamic data
    const userCurrentExerciseData = [...this.state.userCurrentExerciseData];
    userCurrentExerciseData.splice(exerciseIndex, 1);

    this.setState({userCurrentExerciseInfo, userCurrentExerciseData});
  }

  randomWorkoutHandler = () => {
    let userCurrentExerciseInfo = [];
    let userCurrentExerciseData = [];
    
    for(let i=0; i<this.state.bodyparts.length; i++) {
      // Handle static data
      const exercises = this.getExercises(i+1, this.state.exercises);  
      const random = Math.floor(Math.random() * exercises.length);
      userCurrentExerciseInfo.push(exercises[random]);

      // Handle dynamic data
      const dynamicData = {
        exerciseid : exercises[random].id, 
        reps : null, 
        sets : null, 
        weight : null 
      }
      userCurrentExerciseData.push(dynamicData);
    }
    this.setState({userCurrentExerciseInfo, userCurrentExerciseData});
  }

  workoutListItemHandler = (workoutId, index) => {
    console.log("Inside workoutListItemHandler with id : " + workoutId + " , " + index);
    const userCurrentWorkoutData = {...this.state.userWorkouts[index]}

    // Handle static data    
    const userCurrentWorkoutId            = userCurrentWorkoutData.id;
    const userCurrentWorkoutName          = userCurrentWorkoutData.name;
    const userCurrentWorkoutDescription   = userCurrentWorkoutData.description;
    const userCurrentExerciseInfo         = userCurrentWorkoutData.exercises.map(exerciseData => { 
      const exerciseId = exerciseData.exerciseid;
      const exerciseInfo = this.state.exercises.filter(exerciseInfo => {
        return exerciseInfo.id === exerciseId;
      });
      return exerciseInfo[0];
    });
    console.log("userCurrentExerciseInfo : ", userCurrentExerciseInfo)

    // Handle dynamic data
    const userCurrentExerciseData = [...userCurrentWorkoutData.exercises]

    this.setState({
      userCurrentWorkoutId,
      userCurrentWorkoutName,
      userCurrentWorkoutDescription,
      userCurrentExerciseInfo,
      userCurrentExerciseData});
  }


  addWorkoutHandler = () => {

    // Handle the static data
    const userCurrentExerciseInfo = [];

    // Handle the dynamic data
    const userCurrentExerciseData = [];

    this.setState({userCurrentExerciseInfo, userCurrentExerciseData});
  }

  workoutOnChangeHandler = (event) => {

    // console.log("Event in workoutOnChangeHandler : " + event.target.name);

    if(event.target.name === 'name') {
      const userCurrentWorkoutName = event.target.value;
      console.log("userCurrentWorkoutName : " + userCurrentWorkoutName);
      this.setState({userCurrentWorkoutName});
      
    } else if(event.target.name === 'description') {
      const userCurrentWorkoutDescription = event.target.value;
      console.log("userCurrentWorkoutDescription : " + userCurrentWorkoutDescription);
      this.setState({userCurrentWorkoutDescription});
      
    } else {
      console.log("Event in workoutOnChangeHandler : " + event.target.name);

      const nameAndIndex = event.target.name.split("_");
      let userCurrentExerciseData = [...this.state.userCurrentExerciseData];
      const name = nameAndIndex[0];
      const index = nameAndIndex[1]*1;
      console.log("Name : " + name + " Index : " + index);

      const {type, value} = event.target;
      userCurrentExerciseData[index][name] = type === "number" ? parseInt(value, 10) : value
      console.log("Array value : " + userCurrentExerciseData[index][name]);
      this.setState({userCurrentExerciseData});
    }
  }

  saveWorkoutHandler = async () => {
    // TODO: need to use isloading?

    try {
      // Create updated workout to send to server
      // Add sequencenumber in loop
      const userCurrentExerciseDataCopy = [...this.state.userCurrentExerciseData]
      console.log("userCurrentExerciseDataCopy: " +  JSON.stringify(userCurrentExerciseDataCopy));

      const userCurrentExerciseData = userCurrentExerciseDataCopy.map((exercise, index) => {
        exercise.sequenceNumber = index;
        return exercise;
      });

      const token = this.state.token;
      // console.log("Token in saveworkouthandler : " + token);  

      let workout;
      if(this.state.userCurrentWorkoutId === null) {
        // Creates and save a new workout
        workout = {
          name : this.state.userCurrentWorkoutName,
          description : this.state.userCurrentWorkoutDescription,
          exercises : userCurrentExerciseData
        }
        console.log("workout: " +  JSON.stringify(workout));

        const result = await axios.post(URL_BASE + WORKOUTS_PATH, workout, { headers: { 'x-auth': `${token}` } });
        console.log("result for axios.post() : " + JSON.stringify(result.data.workout));      
  
        // Add workout to userworkout in webbrowser
        const userWorkouts = [...this.state.userWorkouts];
        userWorkouts.push(result.data.workout);
  
        this.setState({
          userWorkouts,
          userCurrentWorkoutId : null,
          userCurrentWorkoutName : '',
          userCurrentWorkoutDescription : '',
          userCurrentExerciseInfo : null
        });
      } else {
        // Updates and save an existing workout
        workout = {
          id : this.state.userCurrentWorkoutId,
          name : this.state.userCurrentWorkoutName,
          description : this.state.userCurrentWorkoutDescription,
          exercises : userCurrentExerciseData
        }
        const workoutId = '/' + this.state.userCurrentWorkoutId;
        console.log("workout: " +  JSON.stringify(workout));
        const result = await axios.put(URL_BASE + WORKOUTS_PATH + workoutId, workout, { headers: { 'x-auth': `${token}` } });
        console.log("result for axios.put() : " + JSON.stringify(result.data.workout));      
  
        // Replace old workout to current
        const userWorkouts = [...this.state.userWorkouts];
        const index = userWorkouts.findIndex(workout => {
            return workout.id === this.state.userCurrentWorkoutId;
        });
        userWorkouts[index] = workout;
  
        this.setState({
          userWorkouts,
          userCurrentWorkoutId : null,
          userCurrentWorkoutName : '',
          userCurrentWorkoutDescription : '',
          userCurrentExerciseInfo : null
        });
      }
      console.log("workout: " +  JSON.stringify(workout));
      
    }catch(error) {
      console.log(error);
      // this.setState({isLoading:false});
    }
  }

  cancelWorkoutHandler = () => {
    this.setState({
      userCurrentWorkoutId : null,
      userCurrentWorkoutName : '',
      userCurrentWorkoutDescription : '',
      userCurrentExerciseInfo : null
    });
  }

  deleteWorkoutHandler = async () => {
    
    try {
      const token = this.state.token;
      const workoutId = '/' + this.state.userCurrentWorkoutId;
      const result = await axios.delete(URL_BASE + WORKOUTS_PATH + workoutId, { headers: { 'x-auth': `${token}` } });
      console.log("Delete result :", result);

      const userWorkouts = this.state.userWorkouts.filter(workout => {
        return workout.id !== this.state.userCurrentWorkoutId;
      });

      this.setState({
        userWorkouts,
        userCurrentWorkoutId : null,
        userCurrentWorkoutName : '',
        userCurrentWorkoutDescription : '',
        userCurrentExerciseInfo : null
      });
    }catch(error) {
      console.log(error);
    }
    
  }

  // TODO: Problem: after save, name of workout is displayed but after logout/login names are not displayed
  render() {
    console.log('Enter render()');

    const pageContent = [];


    if(!this.state.loggedIn) {
      //user not logged in
      pageContent.push(<Information key={0}/>)
    } else { 

      //user logged in
      pageContent.push(
        <MainNav
          key={0}
          mainNavHidden={this.state.mainNavHidden}
          currentMainNavItem={this.state.currentMainNav}
          mainNavItems={this.state.mainNavItems}
          onclick={this.mainNavHandler}
          toggleMainNav={this.toggleMainNavHandler}/>
      )
      if(this.state.currentMainNav === 0) {
        if(this.state.userCurrentExerciseInfo === null ) {
          //show list of usersWorkouts and button for adding a new workout
          pageContent.push( <UserWorkouts
                                key={1}                                
                                userWorkouts={this.state.userWorkouts}
                                onclick={this.workoutListItemHandler}
                                onclickAddWorkout={this.addWorkoutHandler}/>)

        } else {
          //show bodypartnavigation, exercises and users selected workout
          pageContent.push(      
            <BodypartNav
              key={1}
              bodypartItems={this.state.bodyparts}
              currentBodypart={this.state.currentBodypart}
              onclick={this.bodypartNavHandler}
              onclickRandom={this.randomWorkoutHandler}/>);
            
            /*
            pageContent.push(
            <Exercises
              key={2}
              exerciseItems={this.state.currentExercises}
              onclick={this.exerciseHandler}/>);
            pageContent.push(
            <Workout
              key={3}
              workoutExercises={this.state.userCurrentExerciseInfo}
              onclickRemove={this.workoutExerciseRemoveHandler}
              onchange={this.workoutOnChangeHandler}
              onclickSave={this.saveWorkoutHandler}
              onclickCancel={this.cancelWorkoutHandler}/>);
              */

             // TODO: Go through exercise and make sure all data is available, both info and data

            pageContent.push(
              <div className="exerciseWorkout_Container">
                <div className="exercise_Container">
                  <Exercises
                    key={2}
                    exerciseItems={this.state.currentExercises}
                    onclick={this.exerciseHandler}/>
                </div>
                <div className="workout_Container">
                  <Workout
                    key={3}
                    workoutName={this.state.userCurrentWorkoutName}
                    workoutDescription={this.state.userCurrentWorkoutDescription}
                    workoutExerciseInfo={this.state.userCurrentExerciseInfo}
                    workoutExerciseData={this.state.userCurrentExerciseData}
                    onclickRemove={this.workoutExerciseRemoveHandler}
                    onchange={this.workoutOnChangeHandler}
                    onclickSave={this.saveWorkoutHandler}
                    onclickCancel={this.cancelWorkoutHandler}
                    onclickDelete={this.deleteWorkoutHandler}/>
                </div>
              </div>
              );
        }
      }else if(this.state.currentMainNav === 1) {
        console.log("inside page cardio");
      }else if(this.state.currentMainNav === 2) {
        console.log("inside page flex");
      }else if(this.state.currentMainNav === 3) {
        console.log("inside page relax");
      }
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
          onchange={this.userOnChangeHandler}
          onclickLogin={this.loginHandler} 
          onclickLogout={this.logoutHandler}
          onclickRegister={this.userRegisterHandler}/> 
        {pageContent}
        <Footer/>
      </div>
    );
  }
}

export default App;





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
