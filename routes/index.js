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
        // var jsonData = JSON.parse(data);
        // var exists = false;
        // for(var i = 0; i < jsonData.length; i++){
        //   var name = jsonData[i].name;
        //   if(name === user){
        //     exists = true;
        //     var updatedPoints = parseInt(jsonData[i].points)+5;
        //     jsonData[i].points = updatedPoints;
        //   }
        // }
        // if(!exists){
        //   jsonData.push({
        //     name: user,
        //     points: 15
        //   });
        // }
        // fs.writeFile(usersPath, JSON.stringify(jsonData), (err) => {
        //   if(err){
        //     throw err;
        //   }
        // })
        // jsonData.sort((a,b) => {
        //   return b.points - a.points;
        // })
        // var topThree = jsonData.slice(0, 3);
        res.redirect(`/question/${user}`);
      }
    })
  }
})
module.exports = router;
