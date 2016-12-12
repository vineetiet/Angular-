
// apply the filter on the array.
var numberArray = [1,2,3,4,5,6,7,8,9,10];
console.log("Number Array: ", numberArray);

var filteredNumberArray = numberArray.filter(function(value){
	return value > 5;
});

console.log("Filtered number array",filteredNumberArray);

var shoppingList = ["Milk","Donuts","Cookies","Peanuts","Pepto"];
console.log("Shopping List: ", shoppingList);

var searchValue = "Cookies";
function containsFilter(value){
	return value.indexOf(searchValue) !== -1;
}

var searchedShoppingList = shoppingList.filter(containsFilter);
console.log("Searched shopping list: ", searchedShoppingList);