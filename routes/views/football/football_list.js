var keystone = require('keystone');
var fs = require('fs');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'greece';

	locals.data = {
		greece: [],
		teams: []
	};
	
	fs.readFile('routes/views/football/data/teams.json', 'utf8', function (err, data) {
		if (err) throw err; // we'll not consider error handling for now
		locals.data.teams = JSON.parse(data);
	});
	
	// Load all GreekFootball
	view.on('init', function(next) {

		var q = keystone.list('GreekFootball').paginate({
			page: req.query.page || 1,
			perPage: 8,
			maxPages: 8
		}).sort('-Date');

		q.exec(function(err, results) {
			locals.data.greece = results;
			next(err);
		});

	});

	// Render the view
	view.render('greece/football_list');

};
