
/**
What we learned as part of this lecture applies to much 
more than the controller as syntax.
Inheritance in general is used for code re use 
Prototypal inheritance in JS is based on object instances rather than classes.
	- Property is inherited from parent, looked up through Prototype chain.
	- Property is local if it is declared on the child with the same name as the parent
	and therefore masking the parent's property.
$scope is based on prototypal inheritance.
	-child controller's $scope inherits from parent controller's $scope.
Controller as syntax is ControllerName as label
Angular creates property 'label' on the $scope
	- The label is a referance to 'this' i.e: instance of Controller.
	- Works becuase .controller treats it as a function constructor.
Attach properties to 'this' inside of controller, not $Scope
	- Easy sysntax in HTML and JS- no masking occurs
**/
(function(){

	'use strict';

	angular.module('ControllerAsApp', [])
	.controller('ParentController1',ParentController1)
	.controller('ChildController1',ChildController1)
	.controller('ParentController2',ParentController2)
	.controller('ChildController2',ChildController2);

	ParentController1.$inject = ['$scope'];
	function ParentController1($scope){
		$scope.parentValue = 1;
		$scope.pc = this;
		$scope.pc.parentValue = 1;

	}

	ChildController1.$inject = ['$scope'];
	function ChildController1($scope){
		console.log("$scope.parentValue: ", $scope.parentValue);
		console.log("CHILD $scope: ", $scope);

		$scope.parentValue = 5;
		console.log("**CHANGED: $scope.parentValue = 5 ***");
		console.log("$scope.parentValue: ", $scope.parentValue);
		console.log($scope);

		console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
		$scope.pc.parentValue = 5;
		console.log("** CHANGED: $scope.pc.parentValue = 5; ***");
		console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
		console.log("$scope: ",$scope);
		console.log("$scope.$parent.parentValue ", $scope.$parent.parentValue);
		


}

//ParentController2.$inject = ['$scope'];
function ParentController2(){ //assigning the $scope behind the scene because we are using instance here.

	var parent = this;
	parent.value = 1;
}

ChildController2.inject=['$scope'];
function ChildController2($scope){
	var child = this;
	child.value = 5;
	console.log("ChildController2 $scope: ", $scope);
	console.log("Par value ", $scope.parent.value);

}
})();