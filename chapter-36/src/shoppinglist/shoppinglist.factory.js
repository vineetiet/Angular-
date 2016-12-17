(function(){
	'use strict';

	angular.module('ShoppingList')
	.factory('ShoppingListFactory',ShoppingListFactory);

	function ShoppingListFactory(){
	var factory = function(maxItems){
		return new ShoppingListService(maxItems);
	};

	return factory;
}

function ShoppingListService(maxItems){

	var service = this;
	var items = [];

	service.addItem = function(itemName, itemQuantity){

		if(maxItems === undefined || (maxItems !== undefined && maxItems<3)){
		var item = {
			name: itemName,
			quantity: itemQuantity
		}

		items.push(item);
	}else{
		throw new Error("Max items (" + maxItems + ") reached.");
	}
	};

	service.removeItem = function(itemIndex){
		items.splice(itemIndex, 1);
	};

	service.getItem = function(){
		return items;
	}

	
}

	
})();