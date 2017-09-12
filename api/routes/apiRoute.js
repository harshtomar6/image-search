
let express = require('express')
let router = express.Router()
let request = require('./../controllers/request')
let db = require('./../models/database')

router.get('/', (req, res) => {
  res.send("API is working")
})

router.get('/search', function(req, res){
	var query = req.query.q;
	var offset = parseInt(req.query.offset) || 1;

	request.getData(`https://pixabay.com/en/photos/?q=${query}&image_type=&cat=&min_width=&min_height=`, function(data){
		if(!data.err){
			var result = []
			//console.log(data.body);

			if(offset <= 10)
				for(var i=offset*10-10;i<offset*10;i++)
					result.push(data.body[i]);
      else
        result.push("ERROR: NO MORE RESULTS")

			res.send(result)
		}
		else
			res.send(data.err);
	});

	db.saveData(query, (err, success) => {
    if(err)
      console.log(err)
    else {
      console.log(success)
    }
  });
});

router.get('/recent', function(req, res){
	db.getData(function(data){
		res.send(data);
	})
});

module.exports = router
