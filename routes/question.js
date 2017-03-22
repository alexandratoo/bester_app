var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var usersPath = path.join(__dirname, '../users.json');

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
    cheeriosPts(username, 5);
  }else if(cheerios == 5000){
    cheeriosPts(username, -5);
  }else if(cheerios == 18302){
    swapPts(username);
  }else{
    byeTopUser();
  }
  fs.readFile(usersPath, 'utf8', (err, data) => {
    var jsonData = JSON.parse(data);
    //sort the data
    jsonData.sort((a,b) => {
      return b.points - a.points;
    })
    var topThree = jsonData.slice(0, 3);
    res.render('leaderboard', {top3: topThree})
  })
})
function cheeriosPts(username, pts){
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if(err) throw err;
    else{
      var jsonData = JSON.parse(data);
      for(var i = 0; i < jsonData.length; i++){
        var name = jsonData[i].name;
        if(name === username){
          var updatedPoints = parseInt(jsonData[i].points)+pts;
          jsonData[i].points = updatedPoints;
        }
      }
      fs.writeFile(usersPath, JSON.stringify(jsonData), (err) => {
        if(err){
          throw err;
        }
      })
    }
  })
}
function swapPts(username){
  fs.readFile(usersPath, 'utf8', (err, data) => {
    var jsonData = JSON.parse(data);
    //sort the data
    jsonData.sort((a,b) => {
      return b.points - a.points;
    })
    for(var userObj of jsonData){
      if(userObj.name == username){
        var highScore = jsonData[0].points;
        jsonData[0].points = userObj.points;
        userObj.points = highScore;
      }
    }
    fs.writeFile(usersPath, JSON.stringify(jsonData), (err) => {
      if(err){
        throw err;
      }
    })
  })
}
function byeTopUser(){
  fs.readFile(usersPath, 'utf8', (err, data)=>{
    if(err) throw err;
    else{
      var jsonData = JSON.parse(data);
      jsonData.sort((a,b) => {
        return b.points - a.points;
      })
      jsonData.shift();
      fs.writeFile(usersPath, JSON.stringify(jsonData), (err) => {
        if(err){
          throw err;
        }
      })
    }
  })
}

module.exports = router;
