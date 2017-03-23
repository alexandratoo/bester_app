var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//post route because form submission is a POST
router.post('/', function(req, res, next){
  var user = req.body.username;
  if(user === ''){
    res.render('index', {error: "You suck."});
  }else{
    res.redirect(`/question/${user}`);
  }
})
module.exports = router;
