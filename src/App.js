import React, { Component } from 'react';
import './App.css';
import AptList from './AptList';

var _ = require('lodash');

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

  deleteAppointment = (item) => {
    var allApts = this.state.myAppointments;
    var newApts = _.without(allApts, item);
    this.setState({
      myAppointments: newApts
    })
  }

  render() {
    var filteredApts = this.state.myAppointments;
    filteredApts = filteredApts.map((item,index) => {
      return (
        <AptList key = { index }
                singleItem = { item }
                whichItem = { item }
                onDelete = { this.deleteAppointment } />
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
