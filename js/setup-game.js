function startGame(){
    var inputs = Array.from(document.querySelectorAll(".name-input"));
    for(input of inputs){
        var teamid = input.dataset.teamid;
        var playerid = input.dataset.playerid;
        if(data.currentGame.teams[teamid] == null) data.currentGame.teams[teamid] = {};
        if(data.currentGame.teams[teamid].players == null) data.currentGame.teams[teamid].players = [];
        data.currentGame.teams[teamid].id = teamid;
        data.currentGame.teams[teamid].score = 0;
        data.currentGame.teams[teamid].players[playerid] = {};
        data.currentGame.teams[teamid].players[playerid].name = input.value;
    };
    updatePage("choose-bid-template");
}