/**
transclude allows whole templates to be into a directive.
The wrapper content is evaluated in the parent's context, not in the directive's context.
In the DDO: 
	- transclude: true
In the directive template 
	-ng-transclude attribute designates place for evaluated wrapper content
**/

(function(){
	'use strict';
	angular.module('ShoppingListApp',[])
	.controller('ShoppingListController', ShoppingListController)
	//.controller('ShoppingListController1', ShoppingListController1)
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
			 bindToController: true,
			 link: ShoppingListDirectiveLink,
			 transclude: true


		};

		return ddo;
	}

	function ShoppingListDirectiveLink(scope, element, attrs, controller){

		console.log("link scope is: ", scope);
		console.log("controller instance is ", controller);
		console.log("Element is: ", element);

		scope.$watch('list.cookiesInList()', function(newValue, oldValue){ //watch this property

			console.log("Old value: ", oldValue);
			console.log("new value: ", newValue);

			if(newValue === true){
				displayCookieWarning();
			}else{
				removeCookieWarning();
			}
		});

		function displayCookieWarning(){

			//using Angular JqLite.
			// var warningElem = element.find("div");
			// warningElem.css('display','block');

			//If JQuery included before Angular.
			var warningElem = element.find("div.error");
			warningElem.slideDown(900);
		}

		function removeCookieWarning(){
			//using Angular JqLite.
			// var warningElem = element.find("div");
			// warningElem.css('display','none');

			//If JQuery included before Angular.
			var warningElem = element.find("div.error");
			warningElem.slideUp(900);
		}
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

			list.warning="COOKIES DETECTED";

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
