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

		});
	}
})();