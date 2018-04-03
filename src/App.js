import React, { Component } from 'react';
import './App.css';
import TableComponent from './components/table';
import axios from "axios";
class App extends Component {

  render() {
    return (
      <div>
        <TableComponent/>
      </div>
    );
  }
}

export default App;
