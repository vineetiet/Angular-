/**
ng-repeat is a directive that extend the functionality 
of HTML elements it's applied to 
ng-repeat="item in collection", where item can now be 
used in interpolation as an item in the collection
at particular index of interaction.
ng-repeat exposes a special $index property to the 
body of its host tag.
	-holds the numberic index of the current item in loop.
**/

(function(){

	'use strict';

	var shoppingList1 = [
		"milk", "Donuts","Cookies","Peanuts","Pepto"];
	var shoppingList2 = [
	{

		name: "milk",
		quantity:"2"
	},
	{

		name: "Donuts",
		quantity:"4"
	},
	{

		name: "Cookies",
		quantity:"5"
	},
	{

		name: "Peanuts",
		quantity:"9"
	},
	{

		name: "Pepto",
		quantity:"10"
	}
	]
		

	angular.module('ShoppingListApp', [])
	.controller('ShoppingListController', ShoppingListController);
	ShoppingListController.$inject = ['$scope'];

	function ShoppingListController($scope){
		$scope.shoppingList1 = shoppingList1;
		$scope.shoppingList2 = shoppingList2;
		
		
		$scope.addToList = function(){
			var newItem = {
			name:$scope.newItemName,
			quantity:$scope.newItemQuantity

			};
			$scope.shoppingList2.push(newItem);
			
		};
	}



})();