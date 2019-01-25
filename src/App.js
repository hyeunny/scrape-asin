import React, { Component } from 'react';
import request from 'superagent';
import config from './config/config';
import logo from './js-logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  _handleAddProduct = () => {
    request
      .post(`${config.apiHost}/asin`)
      .set('Accept', 'application/json')
      .send({ asin: 'test!' })
      .then((res) => {
        debugger;
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input placeholder="Enter amazon ASIN #" />
          <button onClick={this._handleAddProduct}>Add Product</button>
        </header>
      </div>
    );
  }
}

export default App;
