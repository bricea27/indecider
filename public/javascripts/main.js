// VARIABLES
var body = document.body;
var questionContainer = document.getElementById("questionContainer");
var question = document.getElementById("question");
var submit = document.getElementById("submit");
var answer = document.getElementById("answer");
var answerContainer = document.getElementById("answerContainer");
var newQuestion = document.getElementById("newQuestion");
var loader = document.getElementById("loader");

var colors = ['turqoise', 'emerald', 'peterRiver', 'amethyst', 'wetAsphalt', 'carrot', 'alizarin'];
var yesAnswers = ['Duh!', 'Heck Yes', 'One Hundred Percent', 'Uh, Yeah', 'Oh ya for definite'];
var noAnswers = ['Not a Chance', 'No Way José', "You're Joking, Right?", "Uh, No", "Nope Nope Nope", "Negative, Chief"];
var loaderMessages = ["I'm thinking...", "Give me a sec there sport...", "Processing request...", "You would ask that..."];

submit.addEventListener("click", function(){
	var questionText = question.value.trim();
	if (questionText.length > 0) {
		answerQuestion(questionContainer, answer, answerContainer);
	}
})

question.addEventListener("keydown", function(e) {
	var questionText = question.value.trim();
	if (e.keyCode == 13 && questionText.length > 0) {
		answerQuestion(questionContainer, answer, answerContainer);
	}
});

newQuestion.addEventListener("click", function(){
	askAgain();
});

// on document ready
document.addEventListener("DOMContentLoaded", function() {
	randomBackground(colors, questionContainer);
});

// FUNCTIONS
function randomBackground(colors, element) {
	element.className = colors[Math.round(Math.random() * (colors.length - 1))];
}

function randomAnswer(array, element) {
	var randomAnswer = array[Math.round(Math.random() * (array.length - 1))];
	element.innerHTML = randomAnswer;
}

function answerQuestion(questionContainer, answer, answerContainer) {
	randomLoader(loaderMessages, loader);
	questionContainer.className = "fadeOut";
	loader.style.display="";
	setTimeout(function(){
		loader.style.display="none";
		answerContainer.style.display="";
	}, 2000);
	var request = new XMLHttpRequest();
	request.open("GET", "/api", true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = JSON.parse(request.responseText);
			console.log(response);
			if (response['answer'] === "yes") {
				randomAnswer(yesAnswers, answer);
			} else {
				randomAnswer(noAnswers, answer);
			};
			questionContainer.style.display="none";
			question.value = "";
			answerContainer.style.background = "url('" + response['image'] + "') no-repeat center center";
		}
	}
	request.send();
}

function askAgain() {
	questionContainer.style.display="";
	question.focus();
	randomBackground(colors, questionContainer);
	answerContainer.style.display = "none";
	loader.style.display="none";
}

function randomLoader(array, element) {
	var randomMessage = array[Math.round(Math.random() * (array.length - 1))];
	element.innerHTML = randomMessage;
}
