The frontend for this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## This is a toy app for scraping and displaying data from amazon product listings

## You can find a deployed version at
http://jungle-scout-asin-scraper.s3-website-us-west-2.amazonaws.com/?fbclid=IwAR2QqLOdVRlkNWgW03Ds5zWvUBmWC3BT-b8AAxQhC7j5PIID2hCtIrF71N4

## To run this app locally

- npm install (this app was tested and developed on node 10.6.0, npm 6.1.0)
- Follow the instructions in example.env to add your mysql credentials
- Once connected to mysql, run `node node_modules/db-migrate/bin/db-migrate up` to create the required table
- npm start to boot up the front end on localhost:3000 (webpack -dev server)
- npm run start-api to boot up the api server on localhost:3030
- npm run test-api to run integration tests
- npm run build will give you a production build artifact on the front end in the folder /build (thanks create react app!)

## Some Technologies used

- React, Webpack for the frontend
- Express js api server
- Cheerio for serverside DOM traversal
- MySQL
- Mocha / supertest