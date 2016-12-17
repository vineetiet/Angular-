(function(){
	'use strict';
	angular.module('ShoppingList')
.controller('ShoppingListController', ShoppingListController);

	ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory){

	var list = this;
	var shoppingListService = ShoppingListFactory();
	list.itemName = "";
	list.itemQuantity="";

	

	list.items = shoppingListService.getItem();
	var orgTitle = "Shopping List #";
	list.title  = orgTitle + list.items.length;

	list.addItem = function(){

		shoppingListService.addItem(list.itemName, list.itemQuantity);
		list.title = orgTitle + " " + list.items.length
	};

	list.removeItem = function(indexName){
		shoppingListService.removeItem(indexName);
		list.title = orgTitle + " " + list.items.length
	};
}

})();