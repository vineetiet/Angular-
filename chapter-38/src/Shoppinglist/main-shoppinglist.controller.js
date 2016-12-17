(function(){

	'use strict';
	angular.module('ShoppingList')
	.controller('MainShoppingListController', MainShoppingListController);

	MainShoppingListController.$inject = ['ShoppingListService']
	function MainShoppingListController(ShoppingListService){

			var mainList = this;
			mainList.items = [];

			mainList.$onInit = function(){

				ShoppingListService.getItems()
				.then(function(result){

					// from here it sets the mainList, which is a part of component
					mainList.items = result;

				});

			};
	}
})();