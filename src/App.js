import React, { Component } from 'react';
import './App.css';
import AptList from './AptList';
import AddAppointment from './AddAppointment';
import SearchAppointments from './SearchAppointments';

var _ = require('lodash');

class MainInterface extends Component {
  state = {
      aptBodyVisible: false,
      orderBy: 'petName',
      orderDir: 'asc',
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

  addItem = (tempItem) => {
    var tempApts = this.state.myAppointments;
    tempApts.push(tempItem);
    this.setState({
      myAppointments: tempApts
    })
  }

  reOrder = (orderBy, orderDir) => {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    })
  }

  render() {
    var filteredApts = this.state.myAppointments;
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;

    filteredApts = _.orderBy(filteredApts, item => {
      return item[orderBy].toLowerCase();
    }, orderDir)

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
                        handleToggle = { this.toggleAddDisplay }
                        addApt = { this.addItem }/>
        <SearchAppointments orderBy = { this.state.orderBy }
                            orderDir = { this.state.orderDir } 
                            onReorder = { this.reOrder } />
        <ul className="item-list media-list">{ filteredApts }</ul>
      </div>
    );
  }
}

export default MainInterface;
