testFunction();
function testFunction(){
    $.get('/test',function(data){
        
        var jsonArray = JSON.parse(data);
        console.log(jsonArray);
        for(var i = 0; i < jsonArray.length; i++){
            var links = jsonArray[i]._links.leagueTable.href;
            console.log(links);
            let leagueName = jsonArray[i].caption;
            let id = jsonArray[i].id;
            $('#serverData').append('<a href = "#" id ="'+id +'" "leagues" onclick = "clickHandler()">'+leagueName+'</a>');
           // $('#serverData').append(jsonArray[i].caption);
            $('#serverData').append('<br/>');
        }
        //$('#serverData').html(jsonArray.length);
    })
}

function clickHandler(){
    let id = event.target.id;
    //alert(id);
    getLeagueData(id);
}

function getLeagueData(id){
    $.get('v1/getLeagueData',{leagueID :id },function(data){
        alert('Received Id on server');
    })
}