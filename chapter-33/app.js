/**

**/

(function(){
	'use strict';
	angular.module('ShoppingListComponentApp',[])
	.controller('ShoppingListController', ShoppingListController)
	
	.factory('ShoppingListFactory',ShoppingListFactory)
	//.controller('ShoppingListDirectiveController',ShoppingListDirectiveController)
	.component('shoppingList', {

		templateUrl: 'shoppingList.html',
		controller: ShoppingListComponentController,
		bindings:{
				items: '<',
			 	title: '@',
			 	//removeItem: '='
			 	removeItem: '&' 
		}
	})

	// function ShoppingListDirective(){

	// 	var ddo = {

	// 		templateUrl: 'shoppingList.html',

	// 		 scope: {
	// 		 	items: '<',
	// 		 	title: '@',
	// 		 	//removeItem: '='
	// 		 	removeItem: '&' //method execute in parent enviornment
	// 		 },

	// 		 controller: 'ShoppingListDirectiveController as list',
	// 		 bindToController: true


	// 	};

	// 	return ddo;
	// }
	
	ShoppingListComponentController.$inject = ['$scope','$element'];
	function ShoppingListComponentController($scope, $element){
		var $ctrl = this; //this refrence will be used in shoppinglist.html
		$ctrl.cookiesInList = function(){
			for(var i=0; i<$ctrl.items.length; i++){
			if($ctrl.items[i].name.toLowerCase().indexOf('cookie') != -1){
				return true;
			}

			
		}
		return false;
	};

	$ctrl.remove = function(indexItem){
		//this will call the removeItem of the parent controller (it calls the refrence function that is passed in to the parent controller with a map of key value)
		$ctrl.removeItem({index: indexItem}); //this index is the key, and value comes from shoppingList.html
	};

		//lifecycle method
		$ctrl.$onInit = function(){
			console.log("We are in $onInit()"); //it's getting called once when the controller is gettiing instatinitaed.

		};

		$ctrl.$onChanges = function(changeObj){
			
			console.log("changes", changeObj);
		};	

		$ctrl.$postLink = function(){

			console.log("postLink called");

			$scope.$watch('$ctrl.cookiesInList()', function(newValue, oldValue){

				if(newValue == true){

					console.log($element);
					//show warning
					var warningElem = $element.find('div.error');
					warningElem.slideDown(900)
				}else{
					//hide warning
					var warningElem = $element.find('div.error');
					warningElem.slideUp(500)
				}
			});
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
