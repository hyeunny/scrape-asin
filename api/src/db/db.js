import mysql from 'mysql';

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : 'db1'
});

export function storeProduct ({ asin, category, rank, dimensions }, callback) {
    const sql = 'INSERT INTO products SET ?';

    const values = [{
        asin,
        category,
        rank,
        dimensions
    }];

    pool.query({
        sql,
        values,
    }, callback);
}