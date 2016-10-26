var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'greece';

	locals.data = {
		greece: {},
	};

	// Load all GreekFootball
	view.on('init', function(next) {

		var q = keystone.list('GreekFootball').model.findOne({_id: req.params.id});

		q.exec(function(err, result) {
			if(result != null){
				locals.data.greece = result;
			}else{
				return res.status(404).send(keystone.wrapHTMLError('Sorry, no match found! (404)'));
			}

			next(err);
		});
	});


	// Render the view
	view.render('greece/football_item');
};
