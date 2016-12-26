(function(){

	'use strict';

	angular.module('public')
	.component('menuCategory', {

		templateUrl: 'src/public/menu-category/menu-category.html',
		bindings:{

			category: '<'  //this wil be used in menu-category.html and data will be populated from the menu.html.
		}
	});
})();