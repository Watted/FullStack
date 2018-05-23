import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header';
import LeftTree from '../components/LeftTree';
import Right from './Right';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <LeftTree/>
          <Right/>
      </div>
    );
  }
}

export default App;
