import express from 'express';
import cors from 'cors';
import config from '../config/config';

let app = express();

app.use(cors());
app.use(express.json());

app.get('/status', function(req, res) {
    console.log('test!');
});

app.post('/asin', function(req, res) {
    console.log('asin is ', req.body.asin);
});

app.listen(config.port,  function(req, res) {
    console.log('started server.');
});
