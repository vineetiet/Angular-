/**
'&' binding allows us to execute an expression (such as function value) in the 
context of the parent scope
Parent template must declare an attribute providing:
	- Method refrence to call on the parent 
	- Arguments keys for directive to bind values to 
Directive: 
	- calls the refrenced method 
	- Provide a map of argument key to value pairs
	- Allows directive to pass data back to parent from isolate scope.
**/

(function(){
	'use strict';
	angular.module('ShoppingListApp',[])
	.controller('ShoppingListController', ShoppingListController)
	.controller('ShoppingListController1', ShoppingListController1)
	.factory('ShoppingListFactory',ShoppingListFactory)
	.controller('ShoppingListDirectiveController',ShoppingListDirectiveController)
	.directive('shoppingList', ShoppingListDirective)

	function ShoppingListDirective(){

		var ddo = {

			templateUrl: 'shoppingList.html',

			 scope: {
			 	items: '<',
			 	title: '@',
			 	//removeItem: '='
			 	removeItem: '&' //method execute in parent enviornment
			 },

			 controller: 'ShoppingListDirectiveController as list',
			 bindToController: true


		};

		return ddo;
	}
	
	function ShoppingListDirectiveController(){
		var list = this;
		list.cookiesInList = function(){
			for(var i=0; i<list.items.length; i++){
			if(list.items[i].name.toLowerCase().indexOf('cookie') != -1){
				return true;
			}

			
		}
		return false;
	};
		
	}

	ShoppingListController1.$inject = ['ShoppingListFactory'];
	function ShoppingListController1(ShoppingListFactory){
			var list1 = this;
			list1.itemName = "";
			list1.itemQuantity = "";

			var shoppingListService = ShoppingListFactory();

			//list.items = "0";
			list1.items = shoppingListService.getItems();

			var orginalTitle = "Shopping List #";
			list1.title = orginalTitle + " " + list1.items.length;

			list1.addItem = function(){

				try{
					shoppingListService.addItem(list1.itemName, list1.itemQuantity);
					list1.title = orginalTitle + " " + list1.items.length;
				}catch(error){
					list1.errorMessage = error.message
				}
				
			};
	}

	ShoppingListController.$inject = ['ShoppingListFactory'];
	function ShoppingListController(ShoppingListFactory){

			var list = this;
			list.itemName = "";
			list.itemQuantity = "";

			var shoppingListService = ShoppingListFactory();

			//list.items = "0";
			list.items = shoppingListService.getItems();

			var orginalTitle = "Shopping List #";
			list.title = orginalTitle + " " + list.items.length;

			list.addItem = function(){

				try{
					console.log(this);
					shoppingListService.addItem(list.itemName, list.itemQuantity);
					list.title = orginalTitle + " " + list.items.length;
				}catch(error){
					list.errorMessage = error.message
				}
				
			};

			list.removeItem = function(itemIndex){
				console.log(this);
				shoppingListService.removeItem(itemIndex);
				list.title = orginalTitle + " " + list.items.length;
			};
	}

	function ShoppingListFactory(){
		var factory = function(maxItems){
			return new ShoppingListService(maxItems);
		};

		return factory;
	}

	function ShoppingListService(maxItems){

		var service = this
		var items = [];

		service.getItems = function(){
			return items;
		}

		service.addItem = function(itemName, itemQuantity){

			if(maxItems === undefined || (maxItems !== undefined && maxItems <3)){

				var item = {
					name: itemName,
					quantity:itemQuantity 
				};

				items.push(item);
			}else{
				throw new Error("Max items limit has reached " +maxItems);
			}
		}

		service.removeItem = function(itemIndex){
			items.splice(itemIndex, 1);
		}
	}
})();
