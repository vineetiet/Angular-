
/**
The DDO's restrict property determines what AngularJS complier should look for to 
detect your your custom directive
Using directive as a diffrent restrict type than define will cause the complier to simply ignore it.
Best Practice: Use 'E' for element when directive has content along with possible behaviour.
Best Practice: Use 'A' for attriute when directive has no content and only extends the behaviour of host element.
Class and comments directives are possible, but not used.
**/
(function(){

	angular.module('ListApp', [])
	.controller('ShoppingListController1', ShoppingListController1)
	.controller('ShoppingListController2', ShoppingListController2)
	.factory('ShoppingListFactory', ShoppingListFactory)
	.directive('listItemDescription',ListItemDescription)
	.directive('listItem', ListItem);

	// directive
	function ListItemDescription(){

			var ddo = {
				template: '{{item.quantity}} {{item.name}}'
			};

			return ddo;
	}

	//directive
	function ListItem(){

		//template URL allows you to point HTML template or HTML file and place your template 
		// into that file
		var ddo = {
			//restrict: "AE", //Attribute and element
			//restrict: "A",
			restrict: "E",
			templateUrl: 'listItem.html'
		};

		return ddo;
	}

	ShoppingListController1.$inject = ['ShoppingListFactory'];
	function ShoppingListController1(ShoppingListFactory){

			var list = this;
			// get the service class instance.
			var shoppingList = ShoppingListFactory();
			list.items = shoppingList.getItems();

			list.itemName = "";
			list.itemQuantity="";

			list.addItem = function(){

				try{
				shoppingList.addItem(list.itemName, list.itemQuantity);
				}catch(error){
					list.errorMessage  = error.message
				}
			};

			list.removeItem = function(itemIndex){

				shoppingList.removeItem(itemIndex);
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