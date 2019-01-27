import React, { Component } from 'react';
import { addProduct, getProducts } from '../actions/products';
import logo from '../assets/js-logo.png';
import './App.css';
import ProductList from './ProductList/ProductList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      asinInputVal: '',
      processing: false,
      products: []
    }
  }

  componentDidMount() {
    getProducts.call(this);
  }

  _handleInputChange = (e) => {
    this.setState({ asinInputVal: e.target.value });
  }

  _handleAddProduct = () => {
    const { asinInputVal } = this.state;
    this.setState({ processing: true });
    addProduct.call(this, asinInputVal);
  }

  _asinIsValid = () => {
    const { asinInputVal } = this.state;

    // ASIN is 10-character alphanumeric unique identifier
    // https://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number
    return asinInputVal.length === 10;
  }

  render() {
    const { asinInputVal, products, processing } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {processing &&
            <p>Processing asin..</p>
          }
          {!processing &&
            <React.Fragment>
              <input
                value={asinInputVal}
                placeholder="Enter 10 digit ASIN #"
                onChange={this._handleInputChange}
              />
              <button 
                disabled={!this._asinIsValid()} 
                onClick={this._handleAddProduct}>
                  Add Product
              </button>
            </React.Fragment>
          }
        </header>

        <ProductList products={products} />
      </div>
    );
  }
}

export default App;
