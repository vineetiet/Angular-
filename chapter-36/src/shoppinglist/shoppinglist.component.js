(function(){
	'use strict';

	angular.module('ShoppingList')
	.component('shoppingList',{
		templateUrl: 'src/shoppinglist/shoppinglist.template.html',
		controller: ShoppingListComponentController,
		//It will create automatic binding with parent controller and populate the items and myTitle from the parent controller
		bindings: {
			items: '<',
			myTitle: '@title',
			onRemove: '&'
		}
	});

	ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];

	function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService)
	{
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
})();