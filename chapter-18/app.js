/** controllers responsibilties
 		- setup initial state of $scope.
 		- Add behaviour to the $scope.
 			- handling the any events that is updating the view state, not the business logic
 		Do not use controllers:
 			- Handle business logic directly.
 			- share code or state across controllers.
	Controller should not handle business logic.
	They should also not do code sharing
	Not use to share data across other components.
	Custom service instantiated with .service method
		- service is singletons, you can use the same service in multiple controller becuase service will have same data.
		- service is lazy instantiated
		-service('name',function), treats function as a function constructor 
 		 **/

 		 (function(){

 		 	angular.module('ShoppingListApp', [])
 		 	.controller('ShoppingListAddController',ShoppingListAddController)
 		 	.controller('ShoppingListShowController', ShoppingListShowController)
 		 	.service('ShoppingListService',ShoppingListService);

 		 	ShoppingListAddController.$inject = ['ShoppingListService'];
 		 	function ShoppingListAddController(ShoppingListService){

 		 		var itemAdder = this;
 		 		itemAdder.itemName = "";
 		 		itemAdder.itemQuantity="";

 		 		itemAdder.addItem = function(){

 		 			ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);

 		 		};
 		 	}

 		 	ShoppingListShowController.$inject = ['ShoppingListService'];
 		 	function ShoppingListShowController(ShoppingListService){

 		 		var showList = this;
 		 		showList.items = ShoppingListService.getItems();
 		 		showList.removeItem = function(itemIndex){
 		 			ShoppingListService.removeItem(itemIndex);
 		 		};
 		 	}

 		 	function ShoppingListService(){

 		 		var service = this;
 		 		var items = [];
 		 		service.addItem = function(itemName, qunatity){

 		 			var item = {
 		 				name: itemName,
 		 				quantity: qunatity

 		 			}
 		 			items.push(item);

 		 		};

 		 		service.getItems = function(){
 		 			return items;
 		 		};

 		 		service.removeItem = function(itemIndex){
 		 			items.splice(itemIndex, 1);
 		 		}

 		 	}


 		 })();