import request from 'superagent';
import config from '../config/config';

export function addProduct(asin) {
    request
        .post(`${config.apiHost}/asin`)
        .set('Accept', 'application/json')
        .send({ asin })
        .then((res) => {
            // refresh list with new product
            getProducts.call(this);
        })
        .catch((err) => {
            if (err && err.response.body.code === 'INVALID_ASIN') {
                alert(`The asin entered: "${asin}" is invalid.`);
            }
        })
}

export function getProducts() {
    request
        .get(`${config.apiHost}/products`)
        .set('Accept', 'application/json')
        .then((res) => {
            this.setState({ products: res.body.products });
        })
        .catch((err) => {
            alert('Could not retrieve products.');
        })
}