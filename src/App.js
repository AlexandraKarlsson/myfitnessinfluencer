import React, { Component } from 'react';
import logo from './logo.svg';
import './reset.css';
import BodypartNav from './components/Navigation/bodypart/BodypartNav';
import MainNav from './components/Navigation/main/MainNav';
import Header from './components/Header/Header';

import bodyparts from './assets/data/bodyparts.json';

class App extends Component {

  state = {
    mainNavItems : [
      {
        key: 1,
        name: "Aerobics"
      },
      {
        key: 2,
        name: "Workout"
      }
    ],
    bodyparts : bodyparts 
  }

  mainNavHandler = (mainNavItemIndex) => {
    /*if(this.state.currentBodypart !== bodypartIndex) {
        const currentExercises = this.state.exercises[bodypartIndex];
        this.setState({currentBodypart: bodypartIndex, currentExercises: currentExercises})
    }*/
  }

  bodypartHandler = (bodypartIndex) => {
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
          clicked={this.bodypartHandler}/>
      </div>
    );
  }
}

export default App;
