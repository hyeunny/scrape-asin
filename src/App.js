import React, { Component } from 'react';
import request from 'superagent';
import config from './config/config';
import logo from './js-logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      asinInputVal: ''
    }
  }

  _handleInputChange = (e) => {
    this.setState({ asinInputVal: e.target.value });
  }

  _handleAddProduct = () => {
    const { asinInputVal } = this.state;

    request
      .post(`${config.apiHost}/asin`)
      .set('Accept', 'application/json')
      .send({ asin: asinInputVal })
      .then((res) => {
        debugger;
      })
  }

  render() {
    const { asinInputVal } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input
            value={asinInputVal}
            placeholder="Enter amazon ASIN #"
            onChange={this._handleInputChange}
          />
          <button onClick={this._handleAddProduct}>Add Product</button>
        </header>
      </div>
    );
  }
}

export default App;
