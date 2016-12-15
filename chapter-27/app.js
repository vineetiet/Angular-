
/**
	To add functionality to the directive, one choice is to use a controller 
	that's declared directly on the DDO
	Use controller property to declare controller in DDO
	Use bindToController and controller As props to bind declared properties in isolate
		scope directly to controller instance.
	Define controller function as usual
	Whenever possible, use '<' for one way binding to save resources instead of biderectional binding with '='
	

		
**/
(function(){

	angular.module('ListApp', [])
	.controller('ShoppingListController', ShoppingListController)
	.controller('ShoppingListController2', ShoppingListController2)
	.factory('ShoppingListFactory', ShoppingListFactory)
	.controller('ShoppingListDirectiveController',ShoppingListDirectiveController)
	.directive('shoppingList', ShoppingListDirective);

	function ShoppingListDirective(){
		var ddo = {
			templateUrl: 'shoppingList.html',
			scope: {
				items: '<',
				title: '@'
			},

			controller: 'ShoppingListDirectiveController as list',
			//controllerAs: 'list',
			bindToController: true // bind all the scope properties to controller


		};

		return ddo;
	}

function ShoppingListDirectiveController(){

	var list = this;
	this.cookiesInList = function(){

		for(var i=0; i<list.items.length; i++){
			var name = list.items[i].name;
			if(name.toLowerCase().indexOf("cookie") != -1){
				return true;
			}
		}

		return false;
	};
}

	
	//controller
	ShoppingListController.$inject = ['ShoppingListFactory'];
	function ShoppingListController(ShoppingListFactory){

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