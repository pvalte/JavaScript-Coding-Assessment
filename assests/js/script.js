window.onload = function () {

    //constants
    var timer = 75;

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
    var homepageEl = document.querySelector('#homepage');
    var startButtonEl = document.querySelector('#start-button');

    //functions
    var startCountdown = function() {
        var timerCountDown = setInterval(function () {
            if (timer > 0) {
                timerEl.textContent = 'Time: ' + timer;
                timer--;
            }
            else if (!timer) {
                clearInterval(timerCountDown);
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
        mainEl.appendChild(questionDivEl);

        //handle click of answer
        questionDivEl.addEventListener("click", answerHandler);
    }


    //when "answer button" is clicked
    var answerHandler = function(event) {
        if (event.target.matches(".answer")) {
            alert("you have chosen!");
        }

        //next question
        questionNumber++;
        if (questionNumber < questionObjArray.length) {
            //clear question
            mainEl.removeChild(document.querySelector(".question"));

            //next question
            createQuestion(questionObjArray[questionNumber]);    
        }
        else {
            endQuiz()
        }
    }

    var endQuiz = function() {
        //freeze time / set score
        var score = timer;
        timer = "";
        timerEl.textContent = 'Time: ' + score;

        //clear question
        mainEl.removeChild(document.querySelector(".question"));
        
        //header
        var finalHeader = document.createElement("h1");
        finalHeader.textContent = "All Done!";


        var finalScore = document.createElement("h2");
        finalScore.textContent = "Your final score is " + score;

        mainEl.appendChild(finalHeader);
        mainEl.appendChild(finalScore);   
    }

    //if correct answer
    //add feedback
    //add to score


    //if wromg answer
    //add feedback
    //subtract from score?
    //subtract from timer

    //load next question

    //when quiz ends
    //no more questions or timer = 0
    //add done header
    //final score
    //add initials
    //submit button

    //when submit button is clicked
    //high score board


    //when "start button" is clicked, start quiz
    startButtonEl.addEventListener("click", startQuiz)

}