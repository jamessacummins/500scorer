var tempData = {
  "currentPage": "choose-bid-template",
  "currentRound": 1,
  currentHand: 0,
  currentGame: {
    gameID: null,
    "teams": [
      {
        player1: "James",
        player2: "Harper",
        score: 0,
        currentTricks: 0,
      },
      {
        player1: "Will",
        player2: "Catie",
        score: 0,
        currentTricks: 0,
      }
    ],
    "hands": [
    ],
  },
  "ordinalRound": "",
  pastGames: [
  ],
  "bids": [
    {
      trickThreshold: 6,
      suit: "spades",
      value: 40
    },
    {
      trickThreshold: 6,
      suit: "clubs",
      value: 60
    },
    {
      trickThreshold: 6,
      suit: "diamonds",
      value: 80
    },
    {
      trickThreshold: 6,
      suit: "hearts",
      value: 100
    },
    {
      trickThreshold: 6,
      suit: "no-trumps",
      value: 120
    },
    {
      trickThreshold: 7,
      suit: "spades",
      value: 140
    },
    {
      trickThreshold: 7,
      suit: "clubs",
      value: 160
    },
    {
      trickThreshold: 7,
      suit: "diamonds",
      value: 180
    },
    {
      trickThreshold: 7,
      suit: "hearts",
      value: 200
    },
    {
      trickThreshold: 7,
      suit: "no-trumps",
      value: 220
    },
    {
      trickThreshold: 8,
      suit: "spades",
      value: 240
    },
    {
      trickThreshold: 8,
      suit: "clubs",
      value: 260
    },
    {
      trickThreshold: 8,
      suit: "diamonds",
      value: 280
    },
    {
      trickThreshold: 8,
      suit: "hearts",
      value: 300
    },
    {
      trickThreshold: 8,
      suit: "no-trumps",
      value: 320
    },
    {
      trickThreshold: 9,
      suit: "spades",
      value: 340
    },
    {
      trickThreshold: 9,
      suit: "clubs",
      value: 360
    },
    {
      trickThreshold: 9,
      suit: "diamonds",
      value: 380
    },
    {
      trickThreshold: 9,
      suit: "hearts",
      value: 400
    },
    {
      trickThreshold: 9,
      suit: "no-trumps",
      value: 420
    },
    {
      trickThreshold: 10,
      suit: "spades",
      value: 440
    },
    {
      trickThreshold: 10,
      suit: "clubs",
      value: 460
    },
    {
      trickThreshold: 10,
      suit: "diamonds",
      value: 480
    },
    {
      trickThreshold: 10,
      suit: "hearts",
      value: 500
    },
    {
      trickThreshold: 10,
      suit: "no-trumps",
      value: 520
    },
    {
      trickThreshold: "Misere",
      suit: "misere",
      value: 250
    },
  ]
};
var data;

window.onload = () => {
  if (localStorage.data != null) data = JSON.parse(localStorage.data);
  else data = tempData;
  run();
}

function run() {
  updateOrdinalRound();
  loadPage("#" + data.currentPage);
}

function saveState() {
  localStorage.data = JSON.stringify(data);
}

function refreshState() {
  data = tempData;
  saveState();
  location.reload();
}
function ordinalSuffixOf(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

function updateOrdinalRound() {
  data.ordinalRound = ordinalSuffixOf(data.currentRound);
}

function insertHTML(sourceQuery, targetQuery, context) {
  var source = document.querySelector(sourceQuery).innerHTML;
  var template = Handlebars.compile(source);
  var finalContent = template(context);
  document.querySelector(targetQuery).innerHTML += finalContent;
};
function updatePage(page) {
  data.currentPage = page;
  loadPage("#" + page);
  saveState();
}
function loadPage(pageQuery) {
  document.querySelector("#page").innerHTML = "";
  insertHTML(pageQuery, "#page", data);
};

function updateActiveWinner(id) {
  var winnerButtons = Array.from(document.querySelectorAll(".winner-button"));
  data.activeWinner = id;
  for (button of winnerButtons) {
    if (button.dataset.id == id) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }
  updateConfirm();
}

function updateActiveBid(id) {
  var bidContainers = Array.from(document.querySelectorAll(".bid-container"));
  data.activeBid = id;
  for (bidContainer of bidContainers) {
    if (bidContainer.dataset.id == id) {
      bidContainer.classList.add("active");
    } else {
      bidContainer.classList.remove("active");
    }
  }
  updateConfirm();
}

function updateConfirm() {
  if (data.activeBid != null && data.activeWinner != null) {
    var confirmButton = document.querySelector("#confirm-button");

    confirmButton.classList.add("active");
  }
}
function handleConfirm() {
  if (data.activeBid != null && data.activeWinner != null) {
    updatePage("enter-tricks-template");
  }
}
function validateNumbers() {
  var e = window.event;  // get event object
  var key = e.keyCode || e.which; // get key cross-browser

  if ((key < 48 || key > 57) && key != 8) { //if it is not a number ascii code
    //Prevent default action, which is inserting character
    if (e.preventDefault) e.preventDefault(); //normal browsers
    e.returnValue = false; //IE
  } else {
    updateTricks();
  }
}

function updateTricks() {
  var trickInputs = Array.from(document.querySelectorAll(".trick-input"));
  for (input of trickInputs) {
    if (!isNaN(input.valueAsNumber)) data.currentGame.teams[input.dataset.id].currentTricks = input.valueAsNumber;
    else data.currentGame.teams[input.dataset.id].currentTricks = 0;
  }
}
function makeHand() {
  var hand = {};
  var bid = data.bids[data.activeBid];
  hand.trickThreshold = bid.trickThreshold;
  hand.suit = bid.suit;
  hand.bid = data.activeBid;
  hand.bidWinningTeam = data.activeWinner;
  hand.wasWon = data.currentGame.teams[data.activeWinner].currentTricks >= bid.trickThreshold;
  hand.teams = [];
  hand.value = bid.value;
  for (team of data.currentGame.teams) {
    id = data.currentGame.teams.indexOf(team);
    console.log(id);
    var handTeam = {};
    handTeam.teamID = id;
    handTeam.tricksWon = data.currentGame.teams[id].currentTricks;
    handTeam.startingScore = data.currentGame.teams[id].score;
    hand.teams.push(handTeam);
  }
  return hand;
}

function tricksAddToTen() {
  var tricksSum = 0;
  for (team of data.currentGame.teams) {
    if (!isNaN(team.currentTricks)) tricksSum += team.currentTricks;
  };
  return tricksSum == 10;
}
function updateScores(hand) {
  for (team of data.currentGame.teams) {
    var id = data.currentGame.teams.indexOf(team);
    hand.teams[id].finalScore = data.currentGame.teams[id].score;
    if (hand.bidWinningTeam == id) {
      if (hand.wasWon) { hand.teams[id].finalScore += hand.value; }
      else { hand.teams[id].finalScore += hand.value * -1; }
    } else { hand.teams[id].finalScore += hand.teams[id].tricksWon * 10; }
    team.score += hand.teams[id].finalScore;
  }
}
function newHand() {
  data.currentHand++;
  data.currentRound++;
  data.ordinalRound = ordinalSuffixOf(data.currentRound);
  data.activeBid = null;
  data.activeWinner = null;
  updatePage("choose-bid-template");
}
function goBack1Hand(){
  goToHand(data.currentGame.hands.length-1);
}
function goToHand(handIndex){
  data.currentHand = handIndex;
  data.currentRound = handIndex + 1;
  data.ordinalRound = ordinalSuffixOf(data.currentRound);
  data.activeBid = null;
  data.activeWinner = null;
  for(team of data.currentGame.teams){
    var id = data.currentGame.teams.indexOf(team);
    team.score = data.currentGame.hands[data.currentHand].teams[id].startingScore;
    team.currentTricks = 0;
  }
  data.currentGame.hands = data.currentGame.hands.splice(handIndex,data.currentGame.hands.length - handIndex - 1);
  updatePage("choose-bid-template");
}


function recordGame() {
  updateTricks();
  if (tricksAddToTen()) {
    var hand = makeHand();
    data.currentGame.hands.push(hand);
    updateScores(hand);
    console.log(data);
    newHand();
  } else {
    window.alert("Please make sure there are ten tricks across all teams.");
  }
}
