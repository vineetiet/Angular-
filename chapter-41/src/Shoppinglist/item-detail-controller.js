(function(){

	'use strict';
	angular.module('ShoppingList')
	.controller('ItemDetailController', ItemDetailController);

	// ItemDetailController.$inject = ['item'];
	// function ItemDetailController(item)

	//$stateParams we need becuase we need to lookup the itemId
	ItemDetailController.$inject = ['$stateParams', 'items'];
	function ItemDetailController($stateParams, items){

		var itemdetail = this;
		var item = items[$stateParams.itemId] // this is the index into our item array
		itemdetail.name = item.name;
		itemdetail.quantity = item.quantity;
		itemdetail.description = item.description;


	}
})();