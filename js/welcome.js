function handleWelcome(){
    if(data.currentGame.teams[0] != null){
        updatePage("choose-bid-template");
    } else {
    updatePage("setup-game");
    };
}