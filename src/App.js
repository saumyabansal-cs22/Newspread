// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import News from './Components/News';
import Navbar from './Components/Navbar';

export class App extends Component {
  render() {
    return (
      <div>
        <Navbar country="in"/> 
        <News/>
      </div>
    )
  }
}

export default App
  
