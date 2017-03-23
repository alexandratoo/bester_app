var express = require('express');
var router = express.Router();
var knex = require('../knex');

router.get('/', function(req, res, next){
  res.render('question')
})

router.get('/:name', function(req, res, next){
  res.render('question');
})

router.post('/:name', function(req, res, next){
  var username = req.params.name;
  //check what radio button was selected
  var cheerios = req.body.options;
  if(cheerios == 100){
    knex('users')
    .where('name', username)
    .increment('points', 5)
    .returning('*')
    .then(data => {
      top3().then((users) => {
        res.render('leaderboard', {top3: users});
      })
    })
  }else if(cheerios == 5000){

  }else if(cheerios == 18302){

  }else{

  }
})

function top3(){
  return knex('users')
    .orderBy('points', 'desc')
    .limit(3);
}

module.exports = router;
