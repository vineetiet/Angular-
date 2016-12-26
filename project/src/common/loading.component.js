(function(){

	'use strict'

	angular.module('common')
	.component('loading', {

		template: '<img src="images/spinner.svg" ng-if="$ctrl.show"',
		controller: LoadingController
	});

	LoadingController.$inject = ['$rootScope'];

	function LoadingController($rootScope){

		var $ctrl = this;
		var listner;

		$ctrl.$onInit = function(){

			$ctrl.show = false;
			listner = $rootScope.$on('spinner:activate', onSpinnerActivate);
		};

		$ctrl.$onDestroy = function(){

			listner();

		}

		function onSpinnerActivate(event, data){

			$ctrl.show = data.on;
		}	

	}
})();