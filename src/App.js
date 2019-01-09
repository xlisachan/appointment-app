import React, { Component } from 'react';
import './App.css';
import AptList from './AptList';

class MainInterface extends Component {
  state = {
      myAppointments: []
  }

  componentDidMount() {
    var data = require('./data.json');
    this.setState({
      myAppointments: data
    })
  }

  render() {
    var filteredApts = this.state.myAppointments;
    filteredApts = filteredApts.map((item,index) => {
      return (
        <AptList key = { index }
                singleItem = { item } />
      )
    })
    return (
      <div className="interface">
        <ul className="item-list media-list">{ filteredApts }</ul>
      </div>
    );
  }
}

export default MainInterface;
