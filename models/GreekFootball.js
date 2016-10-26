/**
 * Created by nmarmaridis on 26-Oct-16.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

var GreekFootball = new keystone.List('GreekFootball',{
	schema: { collection: 'greece' },
	path: 'greece',
	label: 'List Football Match',
	singular: 'Football Match',
	plural: 'Football Matches',
	noedit: true,
	nocreate: true,
	nodelete: true,
	defaultSort: '-Date',
    defaultColumns: 'Season, HomeTeam, AwayTeam, FTHG, FTAG, Date|15%' // Display way on admin
});

GreekFootball.add({
	Div: { type: String },
	Date: { type: Types.Date,  index: true},
	HomeTeam: { type: String, index: true},
	AwayTeam: { type: String,  index: true },
	FTHG: { type: Types.Number },
	FTAG: { type: Types.Number },
	FTR: { type: Types.Number },
	Season: { type: String}
});

GreekFootball.schema.virtual('url').get(function() {
	return '/greece/'+this._id;
});

GreekFootball.register();

