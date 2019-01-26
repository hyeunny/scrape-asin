import { getProducts as fetchProducts } from '../db/db';

export function getProducts(req, res) {
    fetchProducts((err, products) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json({ products });
        }
    })
}