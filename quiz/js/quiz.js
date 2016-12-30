(function(){

	//It's a generic function
	angular.module('myQuiz',[])
	.controller('QuizController', QuizController);

	QuizController.$inject = ['$http', '$sce'];

	function QuizController($http, $sce){

		var quiz = this;

			quiz.score = 0;
			quiz.activeQuestion = -1;
			quiz.activeQuestionAnswered = 0;
			quiz.percentage = 0;
			quiz.myQuestions = "";

			//quizData = quiz_data.json. This service will be called at the time of load of this JS file.
			// Angular is the caller of this service.
			$http.get('quiz_data.json').then(function(quizData){

				quiz.myQuestions = quizData.data;
				quiz.totalQuestions = quiz.myQuestions.length;
				console.log("quiz.totalQuestions ", quiz.totalQuestions);


			});

			quiz.selectAnswer = function(parentIndex, index){

				quiz.myQuestions[parentIndex].answered = 'answered';
				quiz.myQuestions[parentIndex].selectedAns = index;
				quiz.myQuestions[parentIndex].correctAns = quiz.myQuestions[parentIndex].correct;

				if(quiz.myQuestions[parentIndex].selectedAns === quiz.myQuestions[parentIndex].correct){

					quiz.myQuestions[parentIndex].correctness = 'correct';
					quiz.score += 1;
				}else{

					quiz.myQuestions[parentIndex].correctness = 'incorrect';
				}

				quiz.percentage = ((quiz.score / quiz.totalQuestions)*100).toFixed(2);

			};

			quiz.isSelected = function(parentIndex, index){

				if(quiz.myQuestions[parentIndex].selectedAns  === index){

					return true;
				}else{

					return false;
				}

			};

			quiz.isCorrect = function(parentIndex, index){

				

					if(quiz.myQuestions[parentIndex].correctAns === index){

					return true;

				}else{
					false;
				}
				
				
			};

			quiz.selectContinue = function(){

				quiz.activeQuestion += 1;
			}; 

			quiz.createShareLinks = function(percentge){

					var url = 'http://codifydesign.com';
					var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored '+quiz.percentge+'% on this quiz about Saturn. Try to beat my score at '+url+'">Email a friend </a>';
					var twitterLink = '<a class="btn twitter" target="_blank" href="http:twitter.com/share?text=I scored a '+quiz.percentge+'% on this quiz about Saturn. Try to beat my score at&amp;hashtag=SaturnQuiz&amp;url='+url+'">Tweet your score </a>';

					var newMarkup = emailLink + twitterLink;

					return $sce.trustAsHtml(newMarkup);

			}
	}


})();