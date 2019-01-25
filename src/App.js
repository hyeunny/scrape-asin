import React, { Component } from 'react';
import logo from './js-logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  _handleAddProduct = () => {
    alert('test!');
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
