(function(){

	'use strict';
	angular.module('ShoppingList')
	.controller('MainShoppingListController', MainShoppingListController);

	//MainShoppingListController.$inject = ['ShoppingListService']
	//function MainShoppingListController(ShoppingListService){
	MainShoppingListController.$inject = ['items']; // inject items from resolve property in router.js
	function MainShoppingListController(items){

			var mainList = this;
			mainList.items = items; // items are passed into our mainList Shopping list controller

			// mainList.$onInit = function(){

			// 	//asyn service
			// 	ShoppingListService.getItems()
			// 	.then(function(result){

			// 		// from here it sets the mainList, which is a part of component
			// 		mainList.items = result;

			// 	});

			// };
	}
})();