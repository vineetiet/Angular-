// Http interceptor use to boradcast event so that spinner coild be turned on. This inteceptor will be called when http request will be 
// made, like requesting for http templates by angular using http request.
// It's an asyn request, when there is delay in response, it will broadcast a message to spinner, and spinner module has configure 
// the httpProvider, which is used to register the interceptor or add interceptor into the arror of interceptor. So that interceptor
//will be called while making request and sending response.
(function(){

	'use strict';
	angular.module('common')
	.factory('loadingHttpInterceptor', loadingHttpInterceptor);

	loadingHttpInterceptor.$inject = ['$rootScope', '$q'];

	//Tracks when a request begins and finishes. When a request starts,
	// a progress event is emitted to allow listners to determine
	// when a request has been initiated. When the response completes
	// or a response error occurs, We assume the request has ended 
	// and emit a finish event.
	function loadingHttpInterceptor($rootScope, $q){

		var loadingCount = 0;
		var loadingEventName = 'spinner:activate';

		return{

			//http request
			request: function(config){

				console.log("Inside interceptor, config", config);
				if(++loadingCount === 1){

					$rootScope.$broadcast(loadingEventName, {on : true});
				}

				return config;
			},

			response: function(response){

				if(--loadingCount === 0){

					$rootScope.$broadcast(loadingEventName, {on : false});
				}

				return response;
			},

			responseError: function(response){

				if(--loadingCount === 0){

					$rootScope.$broadcast(loadingEventName, {on:false});
				}

				return $q.reject(response) //returning promise
			}
		}



	}



})();