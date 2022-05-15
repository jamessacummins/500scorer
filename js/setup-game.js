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

function togglePlayerCount(playerCount){
    var buttons = Array.from(document.querySelectorAll(".player-count-button"));
    var nameQuestionContainer = document.querySelector("#name-container");
    for(button of buttons){
        if(button.dataset.playercount == playerCount){
            button.classList.add("active");
            data.playerCount = Number(button.dataset.playercount);
            nameQuestionContainer.style.display = "flex";
            overrideHTML("#name-questions","#name-container",data);
        } else {
            button.classList.remove("active");
        }
    }
}

function validateAllInputsFilled(){
    var nameInputs = Array.from(document.querySelectorAll(".name-input"));
    var allFilled = true;
    for(nameInput of nameInputs){
        allFilled = nameInput.value != "";
    };
    var setupGameButton = document.querySelector("#setup-game-button");
    if(allFilled) setupGameButton.style.display = "initial";
    else setupGameButton.style.display = "none";
}