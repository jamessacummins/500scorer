var teams = [
    {
        player1:"James",
        player2:"Harper",
        currentScore:0
    },
    {
        player1:"Will",
        player2:"Catie",
        currentScore:0
    }
];
var bids = [
    {
        bid:6,
        suit:"spades",
        bidScore:40
    },
    {
        bid:6,
        suit:"clubs",
        bidScore:60
    },
    {
        bid:6,
        suit:"diamonds",
        bidScore:80
    },
    {
        bid:6,
        suit:"hearts",
        bidScore:100
    },
    {
        bid:6,
        suit:"no-trumps",
        bidScore:120
    },
    {
        bid:7,
        suit:"spades",
        bidScore:140
    },
    {
        bid:7,
        suit:"clubs",
        bidScore:160
    },
    {
        bid:7,
        suit:"diamonds",
        bidScore:180
    },
    {
        bid:7,
        suit:"hearts",
        bidScore:200
    },
    {
        bid:7,
        suit:"no-trumps",
        bidScore:220
    },
    {
        bid:8,
        suit:"spades",
        bidScore:240
    },
    {
        bid:8,
        suit:"clubs",
        bidScore:260
    },
    {
        bid:8,
        suit:"diamonds",
        bidScore:280
    },
    {
        bid:8,
        suit:"hearts",
        bidScore:300
    },
    {
        bid:8,
        suit:"no-trumps",
        bidScore:320
    },
    {
        bid:9,
        suit:"spades",
        bidScore:340
    },
    {
        bid:9,
        suit:"clubs",
        bidScore:360
    },
    {
        bid:9,
        suit:"diamonds",
        bidScore:380
    },
    {
        bid:9,
        suit:"hearts",
        bidScore:400
    },
    {
        bid:9,
        suit:"no-trumps",
        bidScore:420
    },
    {
        bid:10,
        suit:"spades",
        bidScore:440
    },
    {
        bid:10,
        suit:"clubs",
        bidScore:460
    },
    {
        bid:10,
        suit:"diamonds",
        bidScore:480
    },
    {
        bid:10,
        suit:"hearts",
        bidScore:500
    },
    {
        bid:10,
        suit:"no-trumps",
        bidScore:520
    },
    {
        bid:"Misere",
        suit:"misere",
        bidScore:250
    },
]

function insertHTML(sourceQuery, targetQuery, context){
    var source = document.querySelector(sourceQuery).innerHTML;
    var template = Handlebars.compile(source);
    var finalContent = template(context);
    document.querySelector(targetQuery).innerHTML += finalContent;
};


for(bid of bids){
    bid.id = bids.indexOf(bid);
    insertHTML("#bid-container-template", "#bids-container", bid)
}
for(team of teams){
    team.id = teams.indexOf(team);
    insertHTML("#winner-button-template", "#winner-container", team)
    insertHTML("#score-team-container-template", "#score-box", team)
}

var winnerButtons = Array.from(document.querySelectorAll(".winner-button"));
var activeWinner = null;
function updateActiveWinner(id){
    activeWinner = id;
    for(button of winnerButtons){
        if(button.dataset.id == id){
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    }
    updateConfirm();
}
var bidContainers = Array.from(document.querySelectorAll(".bid-container"));
var activeBid = null;
function updateActiveBid(id){
    activeBid = id;
    for(bidContainer of bidContainers){
        if(bidContainer.dataset.id == id){
            bidContainer.classList.add("active");
        } else {
            bidContainer.classList.remove("active");
        }
    }
    updateConfirm();
}

var confirmButton = document.querySelector("#confirm-button");
function updateConfirm(){
    if(activeBid != null && activeWinner != null){
        confirmButton.classList.add("active");
    }
}