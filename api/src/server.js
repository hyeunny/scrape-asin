import express from 'express';

let app = express();

app.get('/status', () => {
    console.log('test!');
})

app.listen(3030, () => {
    console.log('started server.');
})
