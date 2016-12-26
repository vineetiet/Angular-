(function(){

	"use strict";

	angular.module('restaurant', ['public'])
	.config(config);

	config.$inject = ['$urlRouterProvider'];
	function config($urlRouterProvider){

		$urlRouterProvider.otherwise('/');
	}
})();