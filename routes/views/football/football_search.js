var keystone = require('keystone');
var fs = require('fs');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'greece';

	// Set locals
	locals.filters = {
		HomeTeam: req.query.homeTeam,
		AwayTeam: req.query.awayTeam,
		Season: req.query.season
	};

	locals.data = {
		greece: [],
		HomeTeam: "",
		AwayTeam: "",
		teams: []
	};

	fs.readFile('routes/views/football/data/teams.json', 'utf8', function (err, data) {
		if (err) throw err; // we'll not consider error handling for now
		locals.data.teams = JSON.parse(data);
	});

	// Load the current product
	view.on('init', function (next) {
		locals.data.HomeTeam = locals.filters.HomeTeam;
		locals.data.AwayTeam = locals.filters.AwayTeam;
		locals.data.Season = locals.filters.Season;
		
		//search the full-text index
		var queryVar = {};
		if(locals.filters.HomeTeam!=""){
			queryVar.HomeTeam = locals.filters.HomeTeam;
		}
		if(locals.filters.AwayTeam!=""){
			queryVar.AwayTeam = locals.filters.AwayTeam;
		}
		if(locals.filters.Season!=""){
			queryVar.Season = locals.filters.Season;
		}
		
		var q = keystone.list('GreekFootball').model.find(queryVar).sort('-Date');
		
		q.exec(function (error, results) {
			if (error) console.log(error);

			locals.data.greece.results = results;
			next();
		});
	});

	// Render the view
	view.render('greece/football_list');

};
