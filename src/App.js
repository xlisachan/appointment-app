import React, { Component } from 'react';
import './App.css';
import AptList from './AptList';
import AddAppointment from './AddAppointment';

var _ = require('lodash');

class MainInterface extends Component {
  state = {
      aptBodyVisible: false,
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

  toggleAddDisplay = () => {
    var tempVisibility = !this.state.aptBodyVisible;
    this.setState({
      aptBodyVisible: tempVisibility
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
        <AddAppointment bodyVisible={ this.state.aptBodyVisible }
                        handleToggle = { this.toggleAddDisplay }/>
        <ul className="item-list media-list">{ filteredApts }</ul>
      </div>
    );
  }
}

export default MainInterface;
