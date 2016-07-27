// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');

var morgan = require('morgan');

//Make HTTPS

// configuration ===========================================
var port = process.env.PORT || 8083; // set our port

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//debug
app.use(morgan('dev')); 
// get all data/stuff of the body (POST) parameters

// log every request to the console
app.use(bodyParser.json()); // parse application/json 

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

/**
 * Front end route
 * Angular routed to appRoutes.js
 */
app.get('*', function(req, res) {
    res.sendFile('./public/index.html');
});

// start app ===============================================
app.listen(port);   
console.log('Magic happens on port ' + port);           // shoutout to the user
exports = module.exports = app;                         // expose app
