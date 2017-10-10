var express   = require('express');
var User      = require('./controllers/user.js');
var Router      = require('./routes/routes.js');
var path    = require("path");
var bodyParser = require("body-parser"); // Body parser for fetch posted data
// var userRouter  = require('./routes/user.js');

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';

var global = [];

// App
const app = express();

var addHeader = function (req, res, next) {
  res.set({
    'Content-Type': 'application/json'
  })
  next()
}

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data

app.use('/', addHeader)
app.use('/', Router);

// Dummy
app.get('/customer' ,  function (req, res) {
	var customer_id = "0"
	if (req.query.token == 2) 
		customer_id =  "00717405312101"
	res.send( JSON.stringify({"customer_id" : customer_id}) )
} )

// Static content section
app.get('/html/:page/', function (req, res) {
  res.set({
    'Content-Type': 'text/html; charset=UTF-8'
  })
 res.sendFile(path.join(__dirname+'/html/'+req.params.page+'.html'));
})

app.get('/css/:page', function (req, res) {
  res.set({
    'Content-Type': 'text/css; charset=UTF-8'
  })
  res.sendFile(path.join(__dirname+'/css/'+req.params.page));
})

app.get('/js/:page', function (req, res) {
  res.set({
    'Content-Type': 'text/css; charset=UTF-8'
  })
  res.sendFile(path.join(__dirname+'/js/'+req.params.page));
})

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);