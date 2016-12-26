$(function(){ // this will be executed after the DOM is loaded.

	//If the button loses the control.
	$("#navbarToggle").blur(function(event){

		var screenWidth = window.innerWidth; //grab the screen width. Width of the browser
		if(screenWidth < 768){

			//collapse is the function provided by bootstrap which uses the JQuery library.
			$("#collapsable-nav").collapse('hide');
		}


	});

});

(function(global){

	var dc = {};

	var homeHtml = "sinppets/home-snippet.html";
	var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleHtml = "sinppets/categories-title-snippet.html";
	var categoryHtml = "sinppets/category-snippet.html";
	var menuItemUrl = "http://davids-restaurant.herokuapp.com/menu_items.json?category=";
	var menuItemsTitleHtml = "sinppets/menu-items-title.html";
	var menuItemHtml = "sinppets/menu-item.html"




	var inserHtml = function(selector, html){

		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	};

	//show loading icon inside element identitfied by 'selector', we need to show the loading icon as 
	// ajax is a asyn request.
	var showLoading = function(selector){

		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>";
		inserHtml(selector, html);
	};

	//Return subsititute of '{{propName}}'
	// with propValue in given 'String', we will pass html sinppet as string.
	// g is it will replace everywhere in the string not just the first place.

	var insertProperty = function(string, propName, propValue){

		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace, "g"), propValue);

		return string;
	}

	//On page load
	document.addEventListener("DOMContentLoaded", function(event){

		//before ajax request, turn on the loading icon.
		showLoading('#main-content');
		$ajaxUtils.sendGetRequest(

			homeHtml, 
			function(responseText){

				document.querySelector('#main-content')
				.innerHTML = responseText;
			}, 

			false);
	});

	dc.loadMenuCategories = function(){

		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			allCategoriesUrl, buildAndShowCategoriesHTML);

	}; //this ajax will return the categories object.

	//This categories will get from Json, builds HTML for the categoriesgories page based on
	// the data from the server. categories is the response from the caller methpd
	function buildAndShowCategoriesHTML(categories){

		$ajaxUtils.sendGetRequest(
			categoriesTitleHtml, function(categoriesTitleHtml){

				// Retrieve single category snipet
				$ajaxUtils.sendGetRequest(
					categoryHtml, function(categoryHtml){

						switchMenuToActive();

						var finalHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
						inserHtml("#main-content", finalHtml);
					}, false);
			}, false);
	}

	dc.loadMenuItems = function(categoryShort){

		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			menuItemUrl + categoryShort,
			buildAndShowMenuItemsHtml);

	};


function buildAndShowMenuItemsHtml(categoryMenuItems){

	$ajaxUtils.sendGetRequest(
		menuItemsTitleHtml, function(menuItemsTitleHtml){

			$ajaxUtils.sendGetRequest(
				menuItemHtml, function(menuItemHtml){

					switchMenuToActive();

					var finalHtml = buildItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml);

					inserHtml('#main-content', finalHtml);
				}, false);
		}, false);

}

function buildItemsViewHtml(categoryMenuItems,
                                menuItemsTitleHtml,
                                menuItemHtml){

	menuItemsTitleHtml =
    insertProperty(menuItemsTitleHtml,
                   "name",
                   categoryMenuItems.category.name);
  menuItemsTitleHtml =
    insertProperty(menuItemsTitleHtml,
                   "special_instructions",
                   categoryMenuItems.category.special_instructions);

  var finalHtml = menuItemsTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over menu items
  var menuItems = categoryMenuItems.menu_items;
  var catShortName = categoryMenuItems.category.short_name;
  for (var i = 0; i < menuItems.length; i++) {
    // Insert menu item values
    var html = menuItemHtml;
    html =
      insertProperty(html, "short_name", menuItems[i].short_name);
    html =
      insertProperty(html,
                     "catShortName",
                     catShortName);
    html =
      insertItemPrice(html,
                      "price_small",
                      menuItems[i].price_small);
    html =
      insertItemPortionName(html,
                            "small_portion_name",
                            menuItems[i].small_portion_name);
    html =
      insertItemPrice(html,
                      "price_large",
                      menuItems[i].price_large);
    html =
      insertItemPortionName(html,
                            "large_portion_name",
                            menuItems[i].large_portion_name);
    html =
      insertProperty(html,
                     "name",
                     menuItems[i].name);
    html =
      insertProperty(html,
                     "description",
                     menuItems[i].description);

    // Add clearfix after every second menu item
    if (i % 2 != 0) {
      html +=
        "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }

    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;


}

// Appends price with '$' if price exists
function insertItemPrice(html,
                         pricePropName,
                         priceValue) {
  // If not specified, replace with empty string
  if (!priceValue) {
    return insertProperty(html, pricePropName, "");;
  }

  priceValue = "$" + priceValue.toFixed(2);
  html = insertProperty(html, pricePropName, priceValue);
  return html;
}


// Appends portion name in parens if it exists
function insertItemPortionName(html,
                               portionPropName,
                               portionValue) {
  // If not specified, return original string
  if (!portionValue) {
    return insertProperty(html, portionPropName, "");
  }

  portionValue = "(" + portionValue + ")";
  html = insertProperty(html, portionPropName, portionValue);
  return html;
}


function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml){

	var finalHtml = categoriesTitleHtml;
	finalHtml += "<section class='row'>"

	for (var i=0; i<categories.length; i++){


		var html = categoryHtml;
		var name = categories[i].name;
		var short_name = categories [i].short_name;

		html = insertProperty(html, "name", name);
		html = insertProperty(html, "short_name", short_name);

		finalHtml += html;


	}

	finalHtml += "</section>";

	return finalHtml;
}


var switchMenuToActive = function(){

	//Remove 'active' from home button.
	var classes = document.querySelector("#navHomeButton").className;
	classes = classes.replace(new RegExp("active","g"), "");
	document.querySelector("#navHomeButton").className = classes;

	//Add active to menu button.
	classes = document.querySelector("#navMenuButton").className;
	if(classes.indexOf("active") == -1){

		classes += " active";
		document.querySelector("#navMenuButton").className = classes;
	}

};


global.$dc = dc // exposing the dc as $dc, dc is an internal namespace.
})(window); // passing the window object. So global is a window object