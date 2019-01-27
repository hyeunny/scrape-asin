import 'dotenv/config';
import mysql from 'mysql';

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : 'db1'
});

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD);

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