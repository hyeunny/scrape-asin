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

function _getCategory($html) {
    return $html.find('.a-list-item').first().text().trim();
}

function _getRank($html) {
    if ($html.find('#SalesRank').length) {
        return +$html.find('#SalesRank').text().match(/#(\d|,)*/)[0].split('#')[1].replace(/,/gi, '');
    } else if ($html.find('.prodDetTable').length) {
        return +$html.find('.prodDetTable').text().match(/#(\d|,)*/)[0].split('#')[1].replace(/,/gi, '');
    }
}

function _getDimensions($html) {
    if ($html.find('.size-weight').length) {
        return $html.find('.size-weight').last().text().split('Dimensions')[1];    
    } else if ($html.find('.prodDetTable').length) {
        return $html.find('.prodDetTable').text().match(/Dimensions.*\s*.*inches/gi)[0].trim().replace(/Dimensions/gi, '');
    }
}

function _parseResponse(res, asin, callback) {
    const $html = $(res.text);

    // there are multiple variations for the markup at https://www.amazon.com/dp/${asin} 
    // this function was tested for the following ASINs
    // B002QYW8LW, B073W83VC7, B07K16BSGD, B00FEEXA68, B07K16BSGD, B01NAHV221, B01NH0XWNU, B072ZY1H1X

    try {
        const category = _getCategory($html);
        console.log('category: ', category);
        const dimensions = _getDimensions($html);
        console.log('dimensions: ', dimensions);
        const rank = _getRank($html);
        console.log('rank: ', rank);

        callback(null, { asin, category, dimensions, rank });
    } catch(err) {
        console.error(err);

        callback({
            code: errors.PAGE_PARSE_ERROR,
            msg: `The page could not be parsed for asin: ${asin}.`
        })
    }
}

export function addProduct(req, res) {
    const asin = req.body.asin;

    async.waterfall([
        (next) => {
            _getPage(asin, next);
        },
        (res, next) => {
            _parseResponse(res, asin, next);

        },
        (product, next) => {
            storeProduct(product, next);
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