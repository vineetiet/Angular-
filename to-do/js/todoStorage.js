angular.module('todomvc')

	
	.factory('todoStorage', function($http, $injector){

		'use strict';
		return $http.get('/api')
			.then(function(){

				return $injector.get('api');

			}, function(){

				return $injector.get('localStorage');

			});
	})

	
	.factory('localStorage', function($q){

		'use strict';

		var STORAGE_ID = 'todos-angularjs';

		var store = {  //returning the store object.

			todos: [],
			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (todos) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
			},
			insert: function(todo){

				var deferred = $q.defer();
				store.todos.push(todo);

				store._saveToLocalStorage(store.todos);

				deferred.resolve(store.todos);
				return deferred.promise;
			},

			get: function(){

				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.todos);  //getting the data from local storage.

				deferred.resolve(store.todos);

				return deferred.promise;

			},

			put: function(todo, index){

				var deferred = $q.defer();

				store.todos[index] = todo;

				store._saveToLocalStorage(store.todos);

				deferred.resolve(store.todos);

				return deferred.promise;

			},

			delete: function(todo){

				var deferred = $q.defer();

				store.todos.splice(store.todos.indexOf(todo), 1);
				deferred.resolve(store.todos);

				store._saveToLocalStorage(store.todos); //setting the value to local storage.

				return deferred.promise;
			}
		};

		return store;

	});