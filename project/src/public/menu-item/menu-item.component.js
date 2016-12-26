(function(){

	'use strict';

	angular.module('public')
	.component('menuItems', {

		templateUrl: 'src/public/menu-item/menu-item.html',
		bindings:{
				
				menuItems: '<' //we are not going to modify that's why it's one way binding, this can we accessed  in html template through $ctrl.menuItem, here 
								//$ctrl is a defualt controller
		},

		controller: MenuItemController //Now we need ApiPath (server path) in its template, which is not avail in menuItem, SO in this case we need a controller and 
										// and have ApiPath service injected to ii.. once injected ApiPath value can be accessed through controller.ApiPath
	});

	MenuItemController.$inject = ['ApiPath'];

	function MenuItemController(ApiPath){

		var $ctrl = this;
		$ctrl.basePath = ApiPath;



	}
})();