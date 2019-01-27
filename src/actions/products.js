import request from 'superagent';
import config from '../config/config';

export function addProduct(asin) {
    const _resetProcessing = () => {
        this.setState({ processing: false });
    }

    request
        .post(`${config.apiHost}/asin`)
        .set('Accept', 'application/json')
        .send({ asin })
        .then((res) => {
            _resetProcessing();
            // refresh list with new product
            getProducts.call(this);
            alert(`Succesfully added product: ${asin}!`);
        })
        .catch((err) => {
            _resetProcessing();
            if (err) {
                let code = err.response.body.code;
                if (code === 'INVALID_ASIN') {
                    alert(`The asin entered: "${asin}" is invalid.`);
                } else if (code === 'PAGE_PARSE_ERROR') {
                    alert(`There was an error processing asin: "${asin}".`);
                }
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