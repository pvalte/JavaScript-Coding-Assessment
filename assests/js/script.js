window.onload = function () {

    //constants
    var score = 0;
    var timer = 75;

    //elements
    var timerEl = document.querySelector('#timer');
    var mainEl = document.querySelector('#main');
    var homepageEl = document.querySelector('#homepage');
    var startButtonEl = document.querySelector('#start-button');

    //functions
    function startCountdown() {
        var timerCountDown = setInterval(function () {
            if (timer > 1) {
                timerEl.textContent = 'Time: ' + timer;
                timer--;
            } else {
                timerEl.textContent = 'Time: ' + timer;
                clearInterval(timerCountDown);
                //END THE QUIZ
            }
        }, 1000); //Count down every second
    }

    var startQuiz = function () {
        //clear '#home-page' elements
        mainEl.removeChild(homepageEl);

        //start timer
        startCountdown();

        //create first question
        createQuestion();
    }

    var createQuestion = function () {    
        //div to hold question
        var questionDivEl = document.createElement("div");
        questionDivEl.className = "question";
        
        //header
        var questionHeader = document.createElement("h2");
        questionHeader.textContent = "What is your favorite color?";
        
        //options
        var answersList = document.createElement("ul");
        answersList.className = "answer-list";

        var answersArray = ["red", "blue", "purple", "orange"];
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