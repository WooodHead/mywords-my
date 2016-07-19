var savedWord = require('../db/models/savedLookups.js');

module.exports = {
	getList : function (req, res) {
		savedWord.find().then(function (userDoc) {
			console.log(userDoc);
			if (!userDoc) {
				res.status(204).send([]);
			} else {
				res.send(userDoc);
			}
		});
	},

	saveList : function (req, res) {
		savedWord.findOneAndUpdate({
			user : "u1"
		}, {
			$push : {
				wordList : 'map'
			}
		}, {
			new : true,
			upsert : true
		}).then(function (userDoc) {
			res.send(userDoc.wordList);
		});
	}
};
