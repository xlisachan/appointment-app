import React, { Component } from 'react';
import './App.css';

class MainInterface extends Component {
  render() {
    return (
      <div className="interface">
        <h1>Pet Appointments</h1>
        <ul>
          <li>Buffy 3:30PM</li>
          <li>Spot 5:30PM</li>
          <li>Goldie 8:30AM</li>
        </ul>
      </div>
    );
  }
}

export default MainInterface;
