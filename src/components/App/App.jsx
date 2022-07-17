import React, { Component } from 'react';
import Header from '../Header/Header';
import { gql } from '@apollo/client';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header></Header>
      </div>
    );
  }
}

export default App;
