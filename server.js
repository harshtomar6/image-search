var express = require('express');
var app = express()
var mongoose = require('mongoose')
var apiRoute = require('./api/routes/apiRoute')
var config = require('./config')

var port = process.env.PORT || 3000;

mongoose.connect(config.DATABASE_URI)

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'));

app.use('/api', apiRoute)

app.get('/', function(req, res){
	res.render('index');
});

/**/

app.listen(port, function(){
	console.log("Server is running at http://localhost:"+port);
});
