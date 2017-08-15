import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import {getCustomerList, postCustomer, getCustomer, updateCustomer, deleteCustomer} from '../customers';


class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }
    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
  }

  componentDidMount() {
    getCustomerList().then(list => {
      this.setState({customerList: list});
    })
  }
  createCustomer(obj){
    postCustomer(obj).then(() => {
      getCustomerList().then(list => {
        this.setState({customerList: list, initialLoad: true});
      })
    });
  }

  startNewCustomer(){
    this.setState({
      creating: true,
      initialLoad: false,
      currentCustomer: null
    })
  }

  selectCustomer(id){
    getCustomer(id).then((resp) =>{
      this.setState({
        currentCustomer: resp,
        initialLoad: false
      })
    })
  }

  saveEdit(id, obj){
    updateCustomer(id, obj).then(() =>{
      getCustomerList().then(list => {
        this.setState({customerList: list, initialLoad: false});
      });
      this.selectCustomer(id);
    })
  }

  removeCustomer(id){
    deleteCustomer(id).then(
      getCustomerList().then(list => {
        this.setState({customerList: list, initialLoad: true});
      })
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
            selectCustomer = {this.selectCustomer}
              startNewCustomer={this.startNewCustomer}
              customerList={this.state.customerList || []}
              />
            : null
          }
          <Workspace saveEdit ={this.saveEdit}
                    createCustomer={this.createCustomer} 
                    initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    removeCustomer={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;
