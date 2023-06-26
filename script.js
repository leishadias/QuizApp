const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

var strtbtn = document.getElementById('strt-quiz');
var qsection = document.getElementById('qsection');
var startsection = document.getElementById('startsection');
var scoresheet = document.getElementById('scoresheet');
var question = document.getElementById('question');
var options = document.getElementsByClassName('btn-option');
var answer = document.getElementById('answer');
var answerSection = document.getElementById('answerSection');
var timer = document.getElementById('timer');
var finalScore = document.getElementById('finalScore');
var userForm = document.getElementById('userForm');
var userName = document.getElementById('userName');
var scores = document.getElementById('scores');
var viewscoreBtn = document.getElementById('leaderboard');
var highscore = document.getElementById('highscore');
var goBack = document.getElementById('goBack');
var restart = document.getElementById('restart');
var scorecontainer = document.getElementById("scores");

var leaderboard = new Array; //contains all scores - array of objects
var qnumber=0; //current question number
var timerfunc; //timer function ID
let time=50; //time taken

strtbtn.addEventListener('click', strtquiz);
viewscoreBtn.addEventListener('click', leaderboardBtnClick);
goBack.addEventListener('click', reAttempt);
restart.addEventListener('click', resetScore);

for (var i=0; i<4; i++){
    options[i].addEventListener('click', answerClicked);
}

function strtquiz(){
    qsection.classList.remove('hidesection');
    startsection.classList.add('hidesection');
    changeQuestion();
    startTimer();
}

function answerClicked(event){
    var ans=event.target.innerText;
    answerSection.classList.remove('hidesection');
    setTimeout(function(){
        answerSection.classList.add('hidesection');
        changeQuestion();
    }, 1000);
    if (ans == questions[qnumber-1].answer){
        answer.innerText="Correct!"
    }else{
        answer.innerText="Incorrect!"
        time-=10;
        if (time<0){
            time=0;
            timer.innerText="Time: " + 0;
        }
    }
}

function changeQuestion(){
    if (qnumber==5){
        endquiz();
        clearInterval(timerfunc);
    }else{
        question.innerText=questions[qnumber].questionText;
        for (var i=0; i<4; i++){
            options[i].innerText=questions[qnumber].options[i];
        }
    }
    qnumber++;
}

function endquiz(){
    scoresheet.classList.remove('hidesection');
    qsection.classList.add('hidesection');
    finalScore.innerText=finalScore.innerText+ " " + time +"."
}

function startTimer(){
    timerfunc = setInterval(function(){
        if (time<1){
            clearInterval(timerfunc);
            endquiz();
            return;
        }
        time--;
        timer.innerText="Time: " + time;
    }, 1000);
}

userForm.onsubmit=function(event){
    event.preventDefault();
    var user = {
        name: userName.value,
        score: time
    };
    leaderboard.push(user);
    leaderboard= leaderboard.sort((p1, p2) => (p1.score < p2.score) ? 1 : (p1.score > p2.score) ? -1 : 0);
    console.log(leaderboard); 
    showLeaderboard();
}

function leaderboardBtnClick(){
    startsection.classList.add('hidesection');
    highscore.classList.remove('hidesection');
    fillLeaderboard();
}

function showLeaderboard(){
    scoresheet.classList.add('hidesection');
    highscore.classList.remove('hidesection');
    fillLeaderboard();
}

function fillLeaderboard(){
    
    for (var i=0; i<leaderboard.length; i++){
        let name = leaderboard[i].name;
        let score = leaderboard[i].score;
        let para = document.createElement("p");
        let node = document.createTextNode((parseInt(i)+1) + ". " + name + " - " + score);
        para.appendChild(node);
        scorecontainer.appendChild(para);
    }
}

function reAttempt(){
    highscore.classList.add('hidesection');
    startsection.classList.remove('hidesection');
    resetVars();
}

function resetVars(){
    qnumber=0;
    time=50;
    finalScore.innerText="Your final score is";
    timer.innerText="Time: " + time;
    //remove all elements that were added in the scoreboard
    while (scorecontainer.lastElementChild) {
        scorecontainer.removeChild(scorecontainer.lastElementChild);
    }
}

function resetScore(){
    leaderboard = new Array;
    reAttempt();
}
