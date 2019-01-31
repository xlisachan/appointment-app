import React, { Component } from 'react';
import '../stylesheets/App.css';
import AptList from './AptList';
import AddAppointment from './AddAppointment';
import SearchAppointments from './SearchAppointments';
 
var _ = require('lodash');

class MainInterface extends Component {
  state = {
      aptBodyVisible: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      myAppointments: []
  }

  componentDidMount() {
    var data = require('../../src/data.json');
    this.setState({ 
      myAppointments: data
    })
  }

  deleteMessage = (item) => {
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

  searchApts = q => {
    this.setState({
      queryText: q
    })
  }

  reOrder = (orderBy, orderDir) => {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    })
  }

  render() {
    var filteredApts = [];
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    var queryText = this.state.queryText;
    var myAppointments = this.state.myAppointments;

    myAppointments.forEach(item => {
      if (
        (item.petName.toLowerCase().indexOf(queryText) !== -1) ||
        (item.ownerName.toLowerCase().indexOf(queryText) !== -1) ||
        (item.aptDate.toLowerCase().indexOf(queryText) !== -1) ||
        (item.aptNotes.toLowerCase().indexOf(queryText) !== -1)
      ) {
        filteredApts.push(item)
      }
    })

    filteredApts = _.orderBy(filteredApts, item => {
      return item[orderBy].toLowerCase();
    }, orderDir)

    filteredApts = filteredApts.map((item,index) => {
      return (
         <AptList key = { index }
                  singleItem = { item }
                  whichItem = { item }
                  onDelete = { this.deleteMessage } />
      )
    })

    return (
      <div className="interface">
        <AddAppointment bodyVisible={ this.state.aptBodyVisible }
                        handleToggle = { this.toggleAddDisplay }
                        addApt = { this.addItem }/>
        <SearchAppointments orderBy = { this.state.orderBy }
                            orderDir = { this.state.orderDir }
                            onReorder = { this.reOrder }
                            onSearch = { this.searchApts } />
        <ul className="item-list media-list">{ filteredApts }</ul>
      </div>
      
    );
  }
}

export default MainInterface;
