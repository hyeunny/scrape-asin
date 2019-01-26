import express from 'express';
import cors from 'cors';
import config from '../config/config';
import handlers from './handlers/index';

let app = express();

app.use(cors());
app.use(express.json());

app.get('/status', function(req, res) {
    res.sendStatus(200);
});

app.post('/asin', handlers.addProduct);


app.listen(config.port,  function(req, res) {
    console.log(`API Server started on port: ${config.port}.`);
});
