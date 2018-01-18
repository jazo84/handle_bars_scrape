var express = require('express');
var expressHandlebars = require('express-handlebars');
var cheerio = require('cheerio');
var request = require('request');
var path = require('path');

var router = express.Router();

router.get('/', function(req,res){
  request('https://www.movieposter.com/g632/New_Movies_posters-0.html', function(err, response, html){
		if (err) {
			throw err
		}
    //console.log(response)

		var $ = cheerio.load(html);
		var results = [];
    $('.pid').each(function(index,element){
        var img = $(element).find('img').first().attr('src');
        var title = $(element).find('a').first().attr('title');
        var poster = "https://www.movieposter.com" + img
        //console.log(title)
        results.push({poster:poster, title:title});
        //console.log(results)
      })
      res.render('home',{results: results})
    })
})

router.get('/api/scrape', function(req,res){
  request('https://www.movieposter.com/g632/New_Movies_posters-0.html', function(err, response, html){
		if (err) {
			throw err
		}
    //console.log(response)
		var $ = cheerio.load(html);
		var results = [];
    $('.pid').each(function(index,element){
        var img = $(element).find('img').first().attr('src');
        var title = $(element).find('a').first().attr('title');
        var poster = "https://www.movieposter.com" + img
        results.push({poster:poster, title:title});
        //console.log(results)
      })
      res.json({results: results})
      //console.log(results)
    })
})

module.exports = router;
