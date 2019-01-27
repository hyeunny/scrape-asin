import $ from 'cheerio';
import request from 'superagent';
import async from 'async';
import { storeProduct } from '../db/db';
import errors from '../../errors/errors';

function _getPage(asin, callback) {
    request.get(`https://www.amazon.com/dp/${asin}`).end((err, res) => {
        if (err && err.status === 404) {
            callback({
                code: errors.INVALID_ASIN,
                msg: `The asin: ${asin} is invalid.`
            })
        } else if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
}

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
            _getPage(asin, next);
        },
        (res, next) => {
            _parseResponse(res, next);

        },
        (product, next) => {
            storeProduct({ asin, ...product }, next);
        }
    ], (err) => {
        if (err) {
            console.error(err);

            let errorResponse = {};
            if (err.code) errorResponse.code = err.code;

            res.status(500).json(errorResponse);
        } else {
            res.sendStatus(201);
        }
    })
}