/**
publish-subscriber design pattern is implemented using the Angular Event system.
You can publish events from anywhere in the system and listen for those events any where 
in the system.
$scope.$emit sends the event up the scope chain 
$scope.$broadcast sends the event down the scope chain
To broadcast all nodes (components), use $rootScope.$bradcast
To listen for event, use either $scope.$on or $rootScope.$on
Deregister listner when using $rootScope.$on
**/
(function(){

	'use strict';
	angular.module('ShoppingListEventsApp', [])
	//This is a parent controller
	.controller('ShoppingListController', ShoppingListController)
	.factory('ShoppingListFactory',ShoppingListFactory)
	.service('WeightLossFilterService', WeightLossFilterService)
	// This is one one of the component ( in the previous session, this use to be directive controller)
	//Components contains, html template, controller (not necessary), bindings (not necessay) for the parent 
	//controllers (to make accessible the parent controller, binding is used. ShoppingListController <- ShoppingListComponentController)
	// This component using ShoppingListComponentController will broadcast message in case of adding or removing
	//item from the list (items) and that message will be listen by the Spinner controller. This controller
	// will broadcast two messages, one is with 'on: true' message, once the Spinner controller receives this mesage
	// an an event listner, it will start spinning by setting $ctrl.showSpinner to true. When it listen the message
	// 'on:false', it will stop the spinning by setting $ctrl.showSpinner to false.
	.component('shoppingList',{
		templateUrl: 'shoppingList.html',
		controller: ShoppingListComponentController,
		//It will create automatic binding with parent controller and populate the items and myTitle from the parent controller
		bindings: {
			items: '<',
			myTitle: '@title',
			onRemove: '&'
		}
	})
	// This is an another component. Now ShoppingListComponentController wants to broadcast the message.
	// since spinner controller does not come 
	.component('loadingSpinner',{
		templateUrl: 'spinner.html',
		controller: SpinnerControlller
	});

	SpinnerControlller.$inject = ['$rootScope']
	function SpinnerControlller($rootScope){
		var $ctrl = this;

		var  cancelListner = $rootScope.$on('shoppinglist:processing', function(event, data){

			console.log("Event: ", event);
			console.log("Data: ", data);

			if(data.on){
				$ctrl.showSpinner = true;
			}else{
				$ctrl.showSpinner = false;
			}
		});


		// this will destory when the scope of this controller will be destroyed
		//deregistered $rootScope.$on
		$ctrl.$onDestroy = function(){
			cancelListner();
		};
	}

	ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];

	function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService){
		var $ctrl = this;
		var totalItems;

		$ctrl.$onInit = function(){
			totalItems = 0;
			console.log($ctrl);
		};

		$ctrl.$doCheck = function(){

			if($ctrl.items.length !== totalItems){
				totalItems = $ctrl.items.length;

				//bradcast with event, when this event is triggered we should show spinner doing processing
				$rootScope.$broadcast('shoppinglist:processing', {on:true}); // data we are pass in this even is on is the property name and true is the value

				var promises = [];
				//for each item in the list, that will be check asyn by WeightLossFilterService class and 
				// receive the promise object and push them into promises object.
				for(var i=0; i<$ctrl.items.length; i++){
					promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
				}

				//all promises will run prallel
				$q.all(promises)
				.then(function(result){

					//If all of them (promises) come back with positive result which means 
					//none of items in the list contains cookies the we simply going to remove the 
					// error message if it's there
					var warningElem = $element.find('div.error');
					warningElem.slideUp(900);
				})
				.catch(function(result){
					//In catch block the rest of the promises automatcally get cancel.
					// if there is any item in the list has cookie element, that will be received by the
					// catch block and will terminate all subsequent promises from run

					var warningElem = $element.find('div.error');
					warningElem.slideDown(900);
				})

				// this block will broadcast the message with {on:false}.
				.finally(function(){
					$rootScope.$broadcast('shoppinglist:processing', {on: false});
				});
				
			}
		};

		$ctrl.remove = function(myIndex){
			$ctrl.onRemove({index: myIndex});
		}
	}

ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory){

	var list = this;
	var shoppingListService = ShoppingListFactory();
	list.itemName = "";
	list.itemQuantity="";

	

	list.items = shoppingListService.getItem();
	var orgTitle = "Shopping List #";
	list.title  = orgTitle + list.items.length;

	list.addItem = function(){

		shoppingListService.addItem(list.itemName, list.itemQuantity);
		list.title = orgTitle + " " + list.items.length
	};

	list.removeItem = function(indexName){
		shoppingListService.removeItem(indexName);
		list.title = orgTitle + " " + list.items.length
	};
}

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

WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout){

		var service = this;
		service.checkName = function(itemName){

			var deferred = $q.defer();
			var result = {

				message: ""
			};	

			$timeout(function(){

				if(itemName.toLowerCase().indexOf('cookie')	=== -1){
					deferred.resolve(result);
				}else{
					result.message = "Stay away from cookies";
					deferred.reject(result);
				}
			}, 3000);

			return deferred.promise;
		}
}

})();