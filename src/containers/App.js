import React, { Component } from 'react';

import './App.module.css';
import Coins from './Coins/Coins';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Coins />
      </div>
    );
  }
}

export default App;
