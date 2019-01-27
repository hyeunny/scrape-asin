import { DB_HOST, DB_USER, DB_PASSWORD } from '@env';
import mysql from 'mysql';

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : DB_HOST,
  user            : DB_USER,
  password        : DB_PASSWORD,
  database        : 'db1'
});

console.log(DB_HOST, DB_USER, DB_PASSWORD);

export function storeProduct ({ asin, category, rank, dimensions }, callback) {
    const sql = 'INSERT INTO products SET ? ON DUPLICATE KEY UPDATE ?';

    const params = {
        asin,
        category,
        rank,
        dimensions
    }

    pool.query({
        sql,
        values: [params, params],
    }, callback);
}

export function getProducts(callback) {
    // TODO: add in limit, offset
    const sql = `SELECT * FROM products`;

    pool.query({
      sql
    }, callback);
}