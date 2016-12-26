(function(){

	'use strict';

	angular.module('public')
	.config(routeConfig)

	routeConfig.$inject = ['$stateProvider'];

	function routeConfig($stateProvider){

		console.log("reached");
		$stateProvider
			.state('public', {

				absract: true, //you can never go directily to public state. This state is more like a parent. Parent to
							   // other state that other state can inherit from and share attributes of this state.
				templateUrl: 'src/public/public.html'

				//When the angular ask for these template, it makes the asyn request, which can be easily capture through 
				//interceptor so that we can enable the loading spiiner when this asyn called is made by the angular.

				//public state provides a template URL that is public.html that will get injected inside of
				// our ui-view of index.html. And this template itself has ui-view in it, which means any childeren
				// of that template (public.home) will inject their template inside of ui-view of public.html and which
				// inject in the main page (index.html) of ui-view.

			})

			.state('public.home', { // this state will share this public.html and will inject something in here.

				url: '/',
				templateUrl: 'src/public/home/home.html' //This template will be injected in the parent 
														 // state ('public') public.html.
			})


			.state('public.menu',{

				url: '/menu',
				templateUrl: 'src/public/menu/menu.html',  //this menu.html template will be inserted in the same place (piblic.html) where we previosly inserted home.html */
				controller: 'MenuController', //we need controller to fetch the data.
				controllerAs: 'menuCtrl',
				resolve:{

					menuCategories: ['MenuService', function(MenuService){

						return MenuService.getCategories();

					}]
				}
			})

			.state('public.menuitems', {

				url: '/menu/{category}',  //category value will come from menu-category.html 
				templateUrl: 'src/public/menu-items/menu-items.html',
				controller: 'MenuItemsController',
				controllerAs: 'menuItemCtrl',
				resolve:{
					menuItems: ['$stateParams','MenuService', function($stateParams, MenuService){

						return MenuService.getMenuItem($stateParams.category);
					}]
				}
			});

	}

})();