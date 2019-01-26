import express from 'express';
import cors from 'cors';
import $ from 'cheerio';
import request from 'superagent';
import config from '../config/config';

let app = express();

app.use(cors());
app.use(express.json());

app.get('/status', function(req, res) {
    res.sendStatus(200);
});

app.post('/asin', function(req, res) {
    const asin = req.body.asin;

    request
        .get(`https://www.amazon.com/dp/${asin}`)
        .then((res) => {
            const $html = $(res.text);
            const category = $html.find('#nav-subnav')['0']['attribs']['data-category'];
            const dimensions = $html.find('.size-weight').last().text().split('Dimensions')[1];
            const rank = +$html.find('#SalesRank .value').text().match(/#\d*/)[0].split('#')[1];

            console.log(category);
            console.log(dimensions);
            console.log(rank);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        })
});

app.listen(config.port,  function(req, res) {
    console.log(`API Server started on port: ${config.port}.`);
});
