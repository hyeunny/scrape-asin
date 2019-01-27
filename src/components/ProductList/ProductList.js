import React, { PureComponent } from 'react';
import { capitalize } from '../../helpers/helpers';
import './ProductList.css'

class ProductList extends PureComponent {
    render() {
        const { products } = this.props;

        if (products.length > 0) {
            let headers = Object.keys(products[0]);

            return (
                <table className="product-list-table">
                    <thead>
                        <tr>
                            {headers.map((header) => {
                                return <th key={header}>{capitalize(header)}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.asin}>
                                    <td>
                                        {product.asin}
                                    </td>
                                    <td>
                                        {product.rank}
                                    </td>
                                    <td>
                                        {product.dimensions}
                                    </td>
                                    <td>
                                        {product.category}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        }

        return null;
    }
}

export default ProductList;