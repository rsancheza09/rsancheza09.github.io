import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import MonthComponent from './components/month';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MonthComponent />
      </div>
    );
  }
}

export default App;
