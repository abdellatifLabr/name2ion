const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const name2ion = require('./name2ion');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ elements: [] }).write();

const elements = db.get('elements').value();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/search', function(req, res) {
    const text = req.param('text');
    res.send(name2ion.getElements(text, elements));
});

app.listen(port, function(){
	console.log(`Listening (*:${port})`);
});