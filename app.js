var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var models = require('./model');
app.use(express.static(path.join(__dirname,'public/')));
app.get('/',function(req, res){
  res.sendFile('index.html');   
});
app.get('/test',function(req, res){
    request({
      url: ' http://api.football-data.org/v1/competitions/', //URL to hit
      qs: {season: '2015'}, //Query string data
      method: 'GET', //Specify the method
      headers: { //We can define headers too
         'X-Auth-Token': '46b21b7d4b34466b974c970d8771adc2'
      }
      }, function(error, response, body){
            if(error) {
                console.log(error);
            }
            else{
               // console.log(response);
                var footballAPIData = JSON.parse(body);
                for(var i =0; i < footballAPIData.length; i++){
                    var object = new models.football({
                        _links:{ self: footballAPIData[i]._links.self,
                                teams: footballAPIData[i]._links.teams,
                                fixtures: footballAPIData[i]._links.fixtures,
                                leagueTable: footballAPIData[i]._links.leagueTable},
                        caption : footballAPIData[i].caption,
                        currentMatchday : footballAPIData[i].currentMatchday,
                        id : footballAPIData[i].id,
                        lastUpdated : footballAPIData[i].lastUpdated,
                        league : footballAPIData[i].league,
                        numberOfGames : footballAPIData[i].numberOfGames,
                        numberOfMatchdays : footballAPIData[i].numberOfMatchdays,
                        numberOfTeams : footballAPIData[i].numberOfTeams,
                        year : footballAPIData[i].year
                    });
                    object.save(function(err, football){
                        if(err)
                            console.log(err);
                        //console.log('Obj No:-'+i+'  '+football);
                    });
                 }
                  models.football.find({id : '394'},function(err, value){
                     if(err)
                        console.log(err);
                     console.log(value);
                 });
                 res.json(body);
            }
    });
});
app.listen(8080);

app.get('/v1/getLeagueData',function(req, res){
       
    //get Url From mongo db
    //call API using and store data in mongo db 
    //store data in mongodb
    //return data from mongo db
})