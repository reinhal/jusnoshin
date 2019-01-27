
var offset = 0;
let pageLimit = 6;
let apiBaseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';
let apiRecipeBaseUrl =  apiBaseUrl + '/recipes'; 
let apiWineBaseUrl = apiBaseUrl + '/food/wine';
let apiHeaderAuthorization = {
	"X-Mashape-Key": "APHt8X9YagmshN6vXr6VkafMcAy1p1sIjtzjsndjj2LopWsrpl",
	"X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
}

function displayInputDropdowns() {
	$("#diet-req, #diet-cui, #excl-ing").select2({ // create accessible friendly input fields with bootstrap
		"width": "100%"
	});
	$(".lisa-select2-tags").select2({
		"width": "100%",
		"tags": true
	});
}

function getHtmlForRecipe(recipe) {
	return '<li data-id="' + recipe.id + '">'
	+ '<figure>'
	   + '<img src="' + recipe.image + '" alt="' + recipe.title + '" />'
	   + '<figcaption>'
		   + '<a target="_blank" href="">' + recipe.title + '</a>'
	   + '</figcaption>' 
   + '</figure>' 
+ '</li>';
}
function handleGetMealIdeasSubmit() {
	$("#eatIn, #eatInAgain, #moreIdeas").click(function (e) {
		e.preventDefault();
		if ( this.id == 'moreIdeas') 
			offset += pageLimit;

		var dietRequirements = $('#diet-req').val();
		var typeOfCuisine = $('#diet-cui').val();
		var intolerancesAndAllergies = $('#excl-ing').val();
		$.ajax({
			// Generate the URL from the input received.
			"url": apiRecipeBaseUrl 
				+ "/searchComplex"
				+ "?number=6"
				+ "&offset=" + offset
				+ "&diet=" + encodeURIComponent(dietRequirements)
				+ "&cuisine=" + encodeURIComponent(typeOfCuisine) 
				+ "&intolerances=" + encodeURIComponent(intolerancesAndAllergies),
			'headers': apiHeaderAuthorization,
			"method": "GET",
			"success": function (res) {
				$(".results").empty().append(function () { // display data retrieved from URL.  Six recipes. 
					var recipes = res.results;
					return recipes.map(value => {
						return getHtmlForRecipe(value)
					});
				});
				hideButtons();
				handleDrilldownIntoSingleRecipe();
			}
		});
	});
}

function handleDrilldownIntoSingleRecipe() {
	$(".results li").click(function (e) {
		e.preventDefault();
		var recipeId = $(this).data("id");  //id.results  this is the variable for the id of the recipe the user clicks
		$.ajax({
			"url": apiRecipeBaseUrl + '/' + recipeId + "/information",
			'headers': apiHeaderAuthorization,
			"method": "GET",
			"success": function (rs) {
				$(".recipe").append(function () {   // display the selected recipe which is linked to the complete recipe. 
					var recipe = rs;
					console.log(rs);
					var recipeHTML = getHtmlForRecipe(recipe)
					return recipeHTML;
				});
				$("#resRec").prop("hidden", true);
				$("#recView").prop("hidden", false);
				displayWinePairing();
			}
		});
	});
}

function displayWinePairing() {
	var cui = $('#diet-cui').val();
	$.ajax({
		"url": apiWineBaseUrl + "/pairing?food=" + cui,
		"headers": apiHeaderAuthorization,
		"method": "GET",
		"success": function (wine) {
			$(".wine").append(function () {  //display the paired wine based on cuisine selected.  A default wine is offered if no pairing is available. 
				if (wine.productMatches.length == 0) {
					var defaultWineHTML = 
						'<figure>'
							+ '<img target="_blank" src="https://spoonacular.com/productImages/442371-312x231.jpg" alt="Chehalem INOX Chardonnay" />'
							+ '<figcaption>'
								+'<a href="https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fchehalem-inox-chardonnay-2009%2F109305">'
								+ '\'"INOX® takes its name from the abbreviation of the French word for stainless steel, inoxydable. The wine was created differently from most Chardonnay you\'ve' 
								+ ' had. We think we\'ve succeeded in expressing the crisp, steely, and fruit-rich side that we love about some Old-World Chardonnays. What makes this possible is'
								+ ' the use of exclusively Dijon clones, exceptionally well suited to Oregon\'s cool climate and exhibiting a richness that does not depend on oak. INOX screams' 
								+ ' of the hallmarks of a cool climate-brightness, pinpoint fruit, and explosive aromas and flavors. We intend INOX for a full range of use, from hot weather'
								+ ' chilling to elegant dinner complements.Quintessential INOX, with lovely white aromas of gardenia and other flowers, peach, apricot, pear, pineapple,'
								+ ' and green apple candy showing on the nose and palate; it shows a great balance with relatively low alcohol for the year and bright acid; the length' 
								+ ' is lovely and the weight rich, with a supple, silky texture; flavors linger, with cherry and peach accents. Very pleased."\'</a>'
							+ '</figcaption>'
						+ '</figure>';
					return defaultWineHTML;
				}
				let getWineHTML =
				'<figure>'
					+ '<img src="' + wine.productMatches[0].imageUrl + '" alt="'+ wine.productMatches[0].title + '" />'
					+ '<figcaption>'
						+ '<a target="_blank" href="' + wine.productMatches[0].link + '">' + wine.productMatches[0].description + '</a>'
					+ '</figcaption>'
				+ '</figure>';
				return getWineHTML;	
			});
		}
	});
	$("#startOver").click(function () {  // allows user to start the search over
	location.reload();
	});
}

function hideButtons() {
	$("#intro").addClass("no-intro");
	$("#eatIn").addClass("hidden");
	$("#resRec").prop("hidden", false);
}

$(function () {
	displayInputDropdowns();
	handleGetMealIdeasSubmit();
	handleDrilldownIntoSingleRecipe();
});