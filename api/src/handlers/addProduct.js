import $ from 'cheerio';
import request from 'superagent';
import async from 'async';
import { storeProduct } from '../db/db';

    // request
    //     .get(`https://www.amazon.com/dp/${asin}`)
    //     .end((err, response) => {
    //         const $html = $(response.text);
    //         const category = $html.find('#nav-subnav')['0']['attribs']['data-category'];
    //         const dimensions = $html.find('.size-weight').last().text().split('Dimensions')[1];
    //         const rank = +$html.find('#SalesRank .value').text().match(/#\d*/)[0].split('#')[1];

    //         console.log(category);
    //         console.log(dimensions);
    //         console.log(rank);
    //         storeProduct({asin, category, rank, dimensions}, (err) => {
    //             if(!err) {
    //                 res.sendStatus(200);
    //             } else {
    //                 console.log(err);
    //                 res.sendStatus(500);
    //             }
    //         })
    //     })
function _parseResponse(res, callback) {
    const $html = $(res.text);

    const category = $html.find('#nav-subnav')['0']['attribs']['data-category'];
    const dimensions = $html.find('.size-weight').last().text().split('Dimensions')[1];
    const rank = +$html.find('#SalesRank .value').text().match(/#\d*/)[0].split('#')[1];

    callback(null, { category, dimensions, rank });
}

export function addProduct(req, res) {
    const asin = req.body.asin;

    async.waterfall([
        (next) => {
            request.get(`https://www.amazon.com/dp/${asin}`).end(next);
        },
        (res, next) => {
            _parseResponse(res, next);

        },
        (product, next) => {
            storeProduct({ asin, ...product }, next);
        }
    ], (err) => {
        console.log('HEY: ', err);
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    })
}