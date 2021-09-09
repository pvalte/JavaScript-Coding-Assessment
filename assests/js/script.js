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
    }

    

    //when submit button is clicked
    //high score board


    //when "start button" is clicked, start quiz
    startButtonEl.addEventListener("click", startQuiz)

}