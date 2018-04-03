var bodyParser = require('body-parser');
var express = require('express');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var app = express();
var port = process.env.PORT || 3000;

// Serve static content for the app from the 'public' directory in the
// application directory.
app.use(express.static(__dirname + '/public'));

// // Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://heroku_rlw4lz7w:hvl0tepohsfs3r7s82839l3ls' +
                 '@ds113670.mlab.com:13670/heroku_rlw4lz7w');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
    app.listen(port, function() {
        console.log('listening on ' + port);
    });
});

// get them routes
require('./controllers/nytreact_controller.js')(app);