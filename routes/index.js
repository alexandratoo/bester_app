var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var usersPath = path.join(__dirname, '../users.json');

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
    //access database
    fs.readFile(usersPath, 'utf8', (err, data) =>{
      if(err){
        throw err;
      }else{
        res.redirect(`/question/${user}`);
      }
    })
  }
})
module.exports = router;
