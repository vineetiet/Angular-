(function(){
	'use strict';
	angular.module('ShoppingList')
	.service('WeightLossFilterService', WeightLossFilterService);

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