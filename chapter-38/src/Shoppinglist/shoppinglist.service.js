(function(){

	'use strict';
	angular.module('ShoppingList')
	.service('ShoppingListService', ShoppingListService);

	ShoppingListService.$inject = ['$q', '$timeout'];
	function ShoppingListService($q, $timeout){

		var service = this;

		var items = [];

			items.push({
			name: "Sugar",
			quantity: "2 bags",
			description: "Sugar used for baking delicious goods"
		});

		items.push({
			name: "flour",
			quantity: "1 bags",
			description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs"

			});

		items.push({
			name: "Chocolate Chips",
			quantity: "3 bags",
			description: "Put these in the dough. No reason, really. Got to store somewhere"

			});

		//simulates call to server.
		//Returns a promise, Not items array directly.
		// this server goes to the controller 'main-shoppinglist.controller'

		service.getItems = function(){

			var deffered = $q.defer();

			$timeout(function(){

				deffered.resolve(items);
			}, 900);

			return deffered.promise;
		};	
	}
})();