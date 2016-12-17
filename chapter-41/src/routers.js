(function(){

	'use strict';
	angular.module('ShoppingList')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home',{

			url: '/',
			templateUrl: 'src/shoppinglist/templates/home.template.html'
		})

		.state('mainList', {

			url: '/main-list',
			templateUrl: 
			'src/shoppinglist/templates/main-shoppinglist.template.html',
			controller: 'MainShoppingListController as mainList', // you can use your main controller here instead of using in html to make the html generic so that that html template can be used by other controllers.
			resolve: {
				items: ['ShoppingListService', function(ShoppingListService){

                       // this will return a promise and then UI router will then
                       //wait for the items property to get resolved before it takes 
                       // us to mainList UI state.
						return ShoppingListService.getItems();
				}]
			}

		})

		// In previous chapter, this itemDetail is completely diffrent one, not related to parent ('mainList').
		// making the child state, now this state became a child state. we can now
		// remove the resolve property because we are already doing the ShoppingListService.getItems() in
		// parent state. we can directly inject the 'items' into our 'ItemDetailController'
		.state('mainList.itemDetail',{

			//url: '/item-detail/{itemId}',  we can comment out child URL, we can uncomment and test it
			                                  //if it's comment out, then add one more property params
			templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
			controller: 'ItemDetailController as itemdetail',
			params: {
				itemId: null // name of the param with some value
							// now we  don't have child URL but we 
							// still able to get the child state 
							// we do not assoiciate the child url but the state.

			}
			// resolve: {
			// 	//$stateParams will give us the value of {{itemId}}
			// 	item:['$stateParams', 'ShoppingListService',
			// 	 function($stateParams, ShoppingListService){

			// 	 	return ShoppingListService.getItems()
			// 	 		.then(function(items){

			// 	 			//itemId will be 0,1,2..
			// 	 			return items[$stateParams.itemId];
			// 	      	});

			// 	}]
			// }
            });
	}
})();