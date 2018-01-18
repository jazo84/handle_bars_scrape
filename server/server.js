var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var routes = require('./controller/routes.js');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars')

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: 'client/public/views/layouts',
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname,'../client/public/views'));

app.use('/', routes);
app.use(express.static('./client'));

var PORT = process.env.PORT || 8000;

app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT);
});
