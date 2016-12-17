(function(){
	'use strict';

	angular.module('Spinner')
	.component('loadingSpinner',{
		templateUrl: 'src/spinner/loadingspinner.template.html',
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
})();