angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, store, $filter, $routeParams){

		'use strict';

		var todos = $scope.todos = store.todos;

		$scope.addTodo = function(){

			var newTodo = {

				title: $scope.newTodo.trim(),
				completed: false
			};

			if(!newTodo.title){

				return;
			}

			store.insert(newTodo)
				.then(function(sucess){

					console.log("sucess");

					$scope.newTodo = '';

				})
			
		}

		$scope.toggleCompleted = function(todo, completed){ //In case cof individual li, completed will be undefined.

			if(angular.isDefined(completed)){ //checking the condition whether completed is defined or undefined.

				todo.completed = completed; 
			}

			store.put(todo, todos.indexOf(todo))
				.then(function sucess(){



				}, function error(){

					todo.completed = !completed; 

				});
		};

		$scope.markAll = function(completed){

			todos.forEach(function(todo){

				if(todo.completed !== completed){

					$scope.toggleCompleted(todo, completed);
				}

			});

		};

		$scope.removeTodo = function(todo){

			store.delete(todo);
		};

		$scope.editTodo = function(todo){

			$scope.editedTodo = todo;

		};


		$scope.saveEdits = function(todo, event){

			//Blur events are automatcally triggered after the form submit event.

			if(event == 'blur' && event === 'submit'){

				$scope.saveEvent = null;

				return;
			}

			$scope.saveEvent = event;

			if($scope.reverted){

				$scope.reverted = null;
				return;
			}

			todo.title = todo.title.trim();

			store[todo.title ? 'put' : 'delete'](todo)  //it will call either put or delete method.
				.then(function sucess(){}, function error(){


				})

				.finally(function(){

					$scope.editedTodo = null;
				});




		};

		$scope.$watch('todos', function(){

				$scope.remainingCount = $filter('filter')(todos, {completed: false}).length; //Added the filter, which will filter the Todo whose completed value is false.
				$scope.completedCount = todos.length - $scope.remainingCount;
				$scope.allChecked = !$scope.remainingCount;
		}, true);


		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			console.log($routeParams.status);
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});


		$scope.clearCompletedTodos = function(){

			store.clearCompletedTodos();
		};



	});


