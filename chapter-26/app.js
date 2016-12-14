
/**
	Having isolate scope on the directive
		-Breaks the prototypal inheritance of the scope from the parent.
		- Makes the directive more independent, less coupled w/controller.
	We pass values into the directive using scope bindings
	Bidirectional binding('=') is such that directive scope property change
		affects the bound property and visa versa.
	DOM attribute value binding ('@') always results in directive property being a string
		- changes to DOM attribute value are propogated to the directive property, but not the other way around.
		
**/
(function(){

	angular.module('ListApp', [])
	.controller('ShoppingListController1', ShoppingListController1)
	.controller('ShoppingListController2', ShoppingListController2)
	.factory('ShoppingListFactory', ShoppingListFactory)
	.directive('shoppingList', ShoppingList);

	function ShoppingList(){
		var ddo = {
			templateUrl: 'shoppingList.html',
			scope: {
				list: '=myList',
				title: '@title'
			}
		};

		return ddo;
	}
	
	//controller
	ShoppingListController1.$inject = ['ShoppingListFactory'];
	function ShoppingListController1(ShoppingListFactory){

			var list = this;
			// get the service class instance.
			var shoppingList = ShoppingListFactory();
			list.items = shoppingList.getItems();

			var origTitle = "Shopping List #1";
			list.title =  origTitle + " (" + list.items.length + " items )";//scope property

			list.itemName = "";
			list.itemQuantity="";

			list.addItem = function(){

				try{
				shoppingList.addItem(list.itemName, list.itemQuantity);
				list.title =  origTitle + " (" + list.items.length + " items )";
				}catch(error){
					list.errorMessage  = error.message
				}
			};

			list.removeItem = function(itemIndex){

				shoppingList.removeItem(itemIndex);
				list.title =  origTitle + " (" + list.items.length + " items )";
			};

	}

	ShoppingListController2.$inject = ['ShoppingListFactory'];
	function ShoppingListController2(ShoppingListFactory){

		var list = this;
		var shoppingList = ShoppingListFactory(3);
		list.items = shoppingList.getItems();
		list.itemName = "";
		list.itemQuantity="";

		list.addItem = function(){

				try{
					shoppingList.addItem(list.itemName, list.itemQuantity);
				}catch(error){
					list.errorMessage = error.message;
				}
				
			};

			list.removeItem = function(itemIndex){

				shoppingList.removeItem(itemIndex);

			};


	}

	function ShoppingListFactory(){
		var factory = function(maxItems){
			return new ShoppingListService(maxItems)
		};

		return factory;
	}

	function ShoppingListService(maxItems){

		var service = this;
		var items = [];

		service.getItems = function(){

			return items;
		};

		service.addItem = function(itemName, itemQuantity){

			if(maxItems === undefined || (maxItems !== undefined && items.length < maxItems)){

				var item = {
					name: itemName,
					quantity: itemQuantity
				};

				items.push(item);
			}else{
				throw new Error("Max items reached limit " + maxItems);
			}
		};

		service.removeItem = function(itemIndex){

			items.splice(itemIndex, 1);
		};

	}

})();