var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/govinda2');
var db = mongoose.connection;
//db.on('error', console.log('Error connecting mongo db'));*/
//var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log('connected to mongo');
   
});
var footballSchema = mongoose.Schema({
        _links:{ self: Object,
                 teams: Object,
                 fixtures: Object,
                 leagueTable: Object 
        },
        caption : String,
        currentMatchday : String,
        id : String,
        lastUpdated : String,
        league : String,
        numberOfGames : String,
        numberOfMatchdays : String,
        numberOfTeams : String ,
        year : String
    });

var football =  mongoose.model('football',footballSchema);

exports.football = football;