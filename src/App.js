import React, { Component } from 'react';
import logo from './logo.svg';
import './reset.css';
import BodypartNav from './components/Navigation/BodypartNav';
import Header from './components/Header/Header';

class App extends Component {

  state = {
    bodyparts : [
      {
        key:1,
        name:'Arm'
      },
      {
        key:2,
        name:'Leg'
      }

    ]
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
        <BodypartNav
          bodypartItems={this.state.bodyparts}
          clicked={this.bodypartHandler}/>
      </div>
    );
  }
}

export default App;
