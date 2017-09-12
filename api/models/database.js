var mongoose = require("mongoose");

var querySchema = mongoose.Schema({
  query: String,
  when: {type: Date, default: Date.now}
});

var queryModel = mongoose.model('queryModel', querySchema);

module.exports.saveData = function(data, callback){
	var query = new queryModel({query: data});

	query.save(function(err, success){
		callback(err, success)
	})
}

module.exports.getData = function(callback){
	queryModel.find(function(err, data){
		if(err) return callback(err);

		var respond_data = [];

		for(var i=0;i<data.length;i++)
			respond_data.push({
				"query": data[i].query,
				"when": data[i].when.toString()
			})

		callback(respond_data);
	})
}
