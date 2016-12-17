
/**
ui-router uses independent concepts for URL mapping and UI state representation
Configure ui-router in angular.config:
	- provide alternate URL mapping with
	$urlRouterProvider.otherwise('alternateURL')
	-configure states with optional URLs using $stateprovider.state('name', {url:'..', tempalteURL:'..'})
	-Use ui-sref attibute for constructing links and actions to configured states.
	
**/
(function(){

	angular.module('RoutingApp', ['ui.router'])

	
	.config(RoutersConfig);

	RoutersConfig.$inject = ['$stateProvider','$urlRouterProvider'];
	//Provider are the ones that are going to be configuring state service and and 
	// the url router service.
	function RoutersConfig($stateProvider, $urlRouterProvider){

		//Redirected to tab 1 if no other URL matches.
		$urlRouterProvider.otherwise('/tab1');

		//setup UI state.
		$stateProvider
			.state('tab1',{

				url: '/tab1',
				templateUrl: 'src/tab1.html'
			})
			// UI router will change the state.
			.state('tab2',{
				url: '/tab2',
				templateUrl: 'src/tab2.html'

			});
	}
})();