$(function () {
	$("#diet-req, #diet-cui, #incl-ing, #excl-ing").select2({
		"width": "100%"
	});
	$(".lisa-select2-tags").select2({
		"width": "100%",
		"tags": true
	});
	// Eat In
	$("#eatIn").click(function (e) {
		// Prevent the default event of submitting the form.
		e.preventDefault();
		// Send a GET Request and fetch JSON.
		var dietReq = $('#diet-req').val();
		var cui = $('#diet-cui').val();
		var desIng = $('#incl-ing').val();
		var intAll = $('#excl-ing').val();
		$.ajax({
			// Generate the URL from the input received.
			"url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?number=6&offset=0&diet=" + encodeURIComponent(dietReq) + "&cuisine=" + encodeURIComponent(cui) + "&includeIngredients=" + encodeURIComponent(desIng).toLowerCase() + "&intolerances=" + encodeURIComponent(intAll),
			"headers": {
				"X-Mashape-Key": "APHt8X9YagmshN6vXr6VkafMcAy1p1sIjtzjsndjj2LopWsrpl",
				"X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
			},
			"method": "GET",
			"success": function (res) {
				data = {
  "results": [
  {
			"id": 487522,
			"usedIngredientCount": 1,
			"missedIngredientCount": 30,
			"likes": 0,
			"title": "veg biryani , how to make hyderabadi veg biryani",
			"image": "https://spoonacular.com/recipeImages/487522-312x231.jpg",
			"imageType": "jpg"
		}, {
			"id": 263868,
			"usedIngredientCount": 1,
			"missedIngredientCount": 10,
			"likes": 0,
			"title": "Red Lentil Curry Soup",
			"image": "https://spoonacular.com/recipeImages/263868-312x231.jpg",
			"imageType": "jpg"
		}, {
			"id": 289532,
			"usedIngredientCount": 1,
			"missedIngredientCount": 14,
			"likes": 0,
			"title": "Saag Paneer: Spinach with Indian Cheese",
			"image": "https://spoonacular.com/recipeImages/289532-312x231.jpeg",
			"imageType": "jpeg"
		}, {
			"id": 516612,
			"usedIngredientCount": 1,
			"missedIngredientCount": 7,
			"likes": 0,
			"title": "Indian Spiced Oatmeal (or a healthy version of Kheer)",
			"image": "https://spoonacular.com/recipeImages/516612-312x231.jpg",
			"imageType": "jpg"
	}, {
			"id": 764910,
			"usedIngredientCount": 1,
			"missedIngredientCount": 11,
			"likes": 0,
			"title": "Red Curry Lemongrass Soup",
			"image": "https://spoonacular.com/recipeImages/764910-312x231.jpg",
			"imageType": "jpg"
		}, {
			"id": 217193,
			"usedIngredientCount": 1,
			"missedIngredientCount": 13,
			"likes": 0,
			"title": "Goat curry",
			"image": "https://spoonacular.com/recipeImages/217193-312x231.jpg",
			"imageType": "jpg"
	  }
  ],
	"baseUri": "https://spoonacular.com/recipeImages/",
  "offset": 0,
	"number": 6,
  "totalResults": 103,
	"processingTimeMs": 188
				}
				$("#num").text(res.totalResults);
				$("#term").text("You searched for " + dietReq + " options under " + cui + " that includes " + desIng + " and not " + intAll);
				$("#resultsPerPage").text(res.number);
				$(".results").append(function () {
					var finalHTML = "";
					var ress = res.results;
					for (var i = 0; i < ress.length; i++)
						finalHTML += '<li><figure><img src="' + ress[i].image + '" alt="' + ress[i].title + '" /><figcaption><a href="">' + ress[i].title + '</a></figcaption></figure></li>';
					return finalHTML;
				});
				$("#intro").addClass("no-intro");
				$("#resRec").prop("hidden", false);
			},
			"crossDomain": true
		});
	});
});