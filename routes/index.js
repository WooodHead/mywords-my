var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var wordListController=require('./wordListController.js');
router.post('/list', wordListController.getList);
router.get('/save', wordListController.saveList);
//router.use('/api/lookups', lookupRouter);

module.exports = router;
