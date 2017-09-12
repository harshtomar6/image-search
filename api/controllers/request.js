var cheerio = require('cheerio');
var request = require('request');

module.exports.getData = function(url, callback){
	var links = [], pages = [];
	var data = [], j=0, host = 'https://pixabay.com';

	var final_data = {
		'err': null,
		'body': null
	}

	request(url, function(err, res, body){
		if(!err && res.statusCode === 200){
			var $ = cheerio.load(body)

			$('img', 'div .credits').each(function(){
				var link = $(this).attr();
				links.push(link);
			});

			$('a', 'div .credits .item').each(function(){
				pages.push($(this).attr('href'));
			});

			for(var i=0;i<links.length;i++){
				data.push({
					"url": links[i]['data-lazy'] || links[i]['src'],
					"alt": links[i]['alt'],
					"page": host+pages[j]
				});
				j+=2;
			}
			final_data.body = data;
		}else {
			final_data.err = err;
		}
		callback(final_data);
	})
	};
