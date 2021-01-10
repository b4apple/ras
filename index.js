const { request, response } = require('express');
const express = require('express');
const multer = require('multer');
const nedb = require('nedb');
const app = express();
const path = require('path');
const upload = multer();
const db = new nedb({ filename: 'db.json', autoload: true });


app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/ask', (request, response) => {
    response.render('ask');
});

app.get('/questions', (request, response) => {
    db.find({}, (err, res) => {
        response.render('questions', { questions: res });
        //console.log(res);
    });
});
app.post('/ask', upload.none(), (request, response) => {
    db.insert({ id: Date.now(), question: request.body.question, name: request.body.name, answers: [] });
    response.redirect('/questions');
});

app.listen(8080, '0.0.0.0');
