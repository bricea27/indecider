// document.addEventListener("DOMContentLoaded", function() {

// 	var question = document.getElementById('question');
// 	var submit = document.getElementById('submit');
// 	var newQuestion = document.getElementById('newQuestion');
// 	var answer = document.getElementById('answer');

// 	var questionSection = document.getElementById('questionSection');
// 	var answerSection = document.getElementById('answerSection');

// 	submit.addEventListener('click', function(){
		
// 		var url = 'http://yesno.wtf/api/';
// 		var xhr = new XMLHttpRequest();
// 		xhr.open('GET', url);
// 		xhr.addEventListener('load', function(e){
// 			var data = xhr.responseText;
// 			var parsed = JSON.parse(data);
// 			questionSection.style.display="none";
// 			question.value = "";
// 			answerSection.style.display="block";
// 			answer.innerHTML = parsed.answer;
// 			answerSection.style.backgroundImage = "url('" + parsed.image + "')";
// 		});
// 		xhr.send();
// 	});

// 	newQuestion.addEventListener('click', function() {
// 		answerSection.style.display="none";
// 		questionSection.style.display="block";
// 		question.focus();
// 	});



// }); //end document ready

$(document).ready(function(){

	var question = $('#question');
	var submit = $('#submit');
	var newQuestion = $('#newQuestion');
	var answer = $('#answer');
	var description = $('#description');

	var questionSection = $('#questionSection');
	var answerSection = $('#answerSection');

	submit.click(function(){
		answerSection.css('backgroundImage', 'none');
		questionSection.fadeOut('slow');
		question.fadeOut('slow');
		submit.fadeOut('slow');
		answerSection.fadeIn('slow');
		answer.fadeIn('slow');
		newQuestion.fadeIn('slow');
		getAnswer(answer, answerSection);
	});

	newQuestion.click(function(){
		answerSection.fadeOut('slow');
		answer.fadeOut('slow');
		newQuestion.fadeOut('slow');
		questionSection.fadeIn('slow');
		question.val('');
		question.fadeIn('slow')
		submit.fadeIn('slow');
		question.focus();
	});

	function getAnswer(elem1, elem2){
		$.ajax({
			url: 'http://yesno.wtf/api/', 
			dataType: 'json',
			success: function(data) {
					elem1.html(data.answer + '!');

					// if (data.answer === "no") {
					// 	elem3.html("You shouldn't " + question);
					// } else {
					// 	elem3.html("You should " + question);
					// }

					elem2.css("backgroundImage", "url('" + data.image + "')");
				}
		});
	};

});
