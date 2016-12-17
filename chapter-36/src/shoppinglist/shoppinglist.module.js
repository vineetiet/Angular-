(function(){

	'use strict';
	angular.module('ShoppingList',['Spinner'])
	.config(function(){
		console.log("Shopping List config fired");
	})
	.run(function(){
		console.log("Shopping List run fired");
	});

})();