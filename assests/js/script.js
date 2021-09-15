window.onload = function () {

    //constants
    var timer = 75;
    var timerCountDown;

    var questionNumber = 0;
    var questionObjArray = [
        {
            question: "What is your favorite color?",
            answers: ["red", "blue", "purple", "orange"],
            correctAnswer: "blue"
        },
        {
            question: "What is your favorite food?",
            answers: ["yogurt", "pizza", "yams", "orzo"],
            correctAnswer: "yams"
        },
        {
            question: "What is your favorite season?",
            answers: ["fall", "winter", "summer", "spring"],
            correctAnswer: "fall"
        }
    ]

    //elements
    var viewHighScoreEl = document.querySelector('#view-high-scores');
    var timerEl = document.querySelector('#timer');
    var mainEl = document.querySelector('#main');
    var contentEl = document.querySelector('#content');
    var homepageEl = document.querySelector('#homepage');
    var answerFeedbackEl = document.querySelector('#answer-feedback');
    var startButtonEl = document.querySelector('#start-button');

    //functions
    var startCountdown = function() {
        timerCountDown = setInterval(function () {
            if (timer > 0) {
                timerEl.textContent = 'Time: ' + timer;
                timer--;
            }
            else {
                timerEl.textContent = 'Time: ' + timer;
                clearInterval(timerCountDown);
                endQuiz();
            }
        }, 1000); //Count down every second
    }

    var startQuiz = function () {
        //clear '#home-page' elements
        mainEl.removeChild(homepageEl);

        //start timer
        startCountdown();

        //create first question
        var questionObj = questionObjArray[questionNumber];
        createQuestion(questionObj);
    }

    var createQuestion = function (questionObj) {    
        //div to hold question
        var questionDivEl = document.createElement("div");
        questionDivEl.className = "question";
        
        //header
        var questionHeader = document.createElement("h1");
        questionHeader.textContent = questionObj.question;
        
        //options
        var answersList = document.createElement("ul");
        answersList.className = "answer-list";

        var answersArray = questionObj.answers;
        for (var i = 0; i < answersArray.length; i++) {
            var answer = document.createElement("li");
            answer.textContent = answersArray[i];
            answer.className = "answer";
            answersList.appendChild(answer);
        }

        questionDivEl.appendChild(questionHeader);
        questionDivEl.appendChild(answersList);
        contentEl.appendChild(questionDivEl);

        //handle click of answer
        questionDivEl.addEventListener("click", answerHandler);
    }


    //when "answer button" is clicked
    var answerHandler = function(event) {
        if (event.target.matches(".answer")) {
            if (event.target.textContent === questionObjArray[questionNumber].correctAnswer) {
                //add feedback
                var feedback = "Correct!";
            }
            else {
                //add feedback
                var feedback = "Wrong :(";
                //subtract from timer
                timer = timer - 10;
            }
        }
        answerFeedbackEl.textContent = feedback;

        //next question
        questionNumber++;
        if (questionNumber < questionObjArray.length) {
            //clear question
            contentEl.removeChild(document.querySelector(".question"));

            //next question
            createQuestion(questionObjArray[questionNumber]);
        }
        else {
            endQuiz()
        }
    }

    
    //when quiz ends
    var endQuiz = function() {
        //freeze time / set score
        clearInterval(timerCountDown);
        timerEl.textContent = 'Time: ' + timer;
        var score = timer;

        //clear question
        contentEl.removeChild(document.querySelector(".question"));
        
        //add done header
        var finalHeader = document.createElement("h1");
        finalHeader.textContent = "All Done!";
        contentEl.appendChild(finalHeader);

        //final score
        var finalScore = document.createElement("h2");
        finalScore.textContent = "Your final score is " + score;
        contentEl.appendChild(finalScore); 

        //add initials
        var initialsDiv = document.createElement("div");
        initialsDiv.className = "intials-input";

        var initialsText = document.createElement("p");
        initialsText.textContent = "Enter intials:";
        initialsText.className = "intials-text";
        initialsDiv.appendChild(initialsText); 

        var initialsInput = document.createElement("input");
        initialsInput.className = "intials-textbox";
        initialsDiv.appendChild(initialsInput); 

        //submit button
        var saveScoreButton = document.createElement("button");
        saveScoreButton.className = "button";
        saveScoreButton.textContent = "Submit";
        initialsDiv.appendChild(saveScoreButton); 

        contentEl.appendChild(initialsDiv); 

        //when submit button is clicked, display high score board
        saveScoreButton.addEventListener("click", function() {
            //save initials and score to local storage
            var highScoreObj = {
                name: initialsInput.value,
                score: score,
            };

            //Get array from local storage
            savedHighScores = localStorage.getItem("highscores");
            savedHighScores = JSON.parse(savedHighScores);
            if (!savedHighScores) {
                savedHighScores = [];
            }

            //add new score to array and push back to local storage
            savedHighScores.push(highScoreObj);
            localStorage.setItem("highscores", JSON.stringify(savedHighScores));

            //display hgih score page
            displayHighScoreBoard();
        })
        
    }

    var displayHighScoreBoard = function() {
        
        mainEl.removeChild(contentEl);
        answerFeedbackEl.textContent = '';

        //div to hold highscore
        var highScoreBoardDiv = document.querySelector("div");
        highScoreBoardDiv.className = "highscore-board";
        
        //header
        var highScoreHeader = document.createElement("h1");
        highScoreHeader.textContent = "High scores";
        highScoreBoardDiv.appendChild(highScoreHeader);
        
        //list
        var highScoreList = document.createElement("ul");
        highScoreList.className = "highscore-list";

        //Get array from local storage
        savedHighScores = localStorage.getItem("highscores");

        if (!savedHighScores) {
            return false;
        }

        savedHighScores = JSON.parse(savedHighScores);

        //TO DO: sort by highest??
        //Create table
        for (var i = 0; i < savedHighScores.length; i++) {
            var highScore = document.createElement("li");
            highScore.textContent = (i+1) + ". " + savedHighScores[i].name + " " + savedHighScores[i].score;
            highScore.className = "highscore";
            highScoreList.appendChild(highScore);
        }
        highScoreBoardDiv.appendChild(highScoreList);

        //buttons
        var backButton = document.createElement("button");
        backButton.className = "button";
        backButton.textContent = "Go Back";
        highScoreBoardDiv.appendChild(backButton); 

        var clearButton = document.createElement("button");
        clearButton.className = "button";
        clearButton.textContent = "Clear high scores";
        highScoreBoardDiv.appendChild(clearButton); 

        mainEl.appendChild(highScoreBoardDiv);

        //when Go Back button is clicked, return to homepage (refresh)
        backButton.addEventListener("click", function() {
            reload = location.reload();
        });

        //when clear high button is clicked, clear local storage and refresh score board
        clearButton.addEventListener("click", function() {
            localStorage.clear();
            highScoreBoardDiv.removeChild(highScoreList);
        })
    }

    //when "view high score" link is clicked, display high scores
    viewHighScoreEl.addEventListener("click", displayHighScoreBoard)

    //when "start button" is clicked, start quiz
    startButtonEl.addEventListener("click", startQuiz)

    

    


}