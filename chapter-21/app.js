
(function(){
	'use strict';
	angular.module('ShoppingListApp',[])
	.controller('ShoppingListController', ShoppingListController)
	.provider('ShoppingListService', ShoppingListServiceProvider) // Name of the service is ShoppingListService here and the provider is ShoppingListServiceProvider.
	.config(Config);

	Config.$inject = ['ShoppingListServiceProvider']; //service name follwed by provider

	function Config(ShoppingListServiceProvider){
		//now you can get the provider properties
		ShoppingListServiceProvider.defaults.maxItems = 2;
	}
	
	ShoppingListController.$inject = ['ShoppingListService'];
	function ShoppingListController(ShoppingListService){

		var list = this;
		 list.items = ShoppingListService.getItems();

		 list.itemName = "";
		 list.itemQuantity = "";

		 list.addItem = function(){

			try{
				ShoppingListService.addItem(list.itemName, list.itemQuantity);	
			}catch(error){
				list.errorMessage = error.message;
			}
			
		};

		
		 list.removeItem = function(ItemIndex){
			ShoppingListService.removeItem(ItemIndex);
		}
	}

	function ShoppingListService(maxItems){

		var service = this;
		var items = []; //Method instance variables
		service.addItem = function(itemName, itemQuantity){
			if((maxItems === undefined) || (items !== undefined && items.length < maxItems)){

				var item = {
					name : itemName,
					quantity : itemQuantity
				}
				items.push(item);
			}else{
				throw new Error("Max items (" +maxItems+") reached");
			}
		};

		service.getItems = function(){
			return items;
		};

		service.removeItem = function(itemIndex){
			items.splice(itemIndex,1);
		};

	}



	function ShoppingListServiceProvider(){
		var provider = this;

		provider.defaults = {
			maxItems: 10
		};


	provider.$get = function(){
		var shoppingList = new ShoppingListService(provider.defaults.maxItems);
		return shoppingList;
	};
   }
})();