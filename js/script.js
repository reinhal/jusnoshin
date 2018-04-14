$(function () {
	$("#diet-req, #diet-cui").select2({
		"width": "100%"
	});
	$(".lisa-select2-tags").select2({
		"width": "100%",
		"tags": true
	});
	// Get meal ideas
	$("#eatIn").click(function (e) {
		// Prevent the default event of submitting the form.
		e.preventDefault();
		// Send a GET Request and fetch JSON.
		var dietReq = $('#diet-req').val();
		var cui = $('#diet-cui').val();
		var intAll = $('#excl-ing').val();
		$.ajax({
			// Generate the URL from the input received.
			"url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?number=6&offset=0&diet=" + encodeURIComponent(dietReq) + "&cuisine=" + encodeURIComponent(cui) + "&intolerances=" + encodeURIComponent(intAll),
			"headers": {
				"X-Mashape-Key": "APHt8X9YagmshN6vXr6VkafMcAy1p1sIjtzjsndjj2LopWsrpl",
				"X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
			},
			"method": "GET",
			"success": function (res) {
				$(".results").append(function () {
					var optionsHTML = "";
					var ress = res.results;
					for (var i = 0; i < ress.length; i++)
						optionsHTML += '<li data-id="' + ress[i].id + '"><figure><img src="' + ress[i].image + '" alt="' + ress[i].title + '" /><figcaption><a href="">' + ress[i].title + '</a></figcaption></figure></li>';
					return optionsHTML;
				});
				$("#moreIdeas").click(function () {
					location.reload();
				});
				$("#intro").addClass("no-intro");
				$("#eatIn").addClass("hidden");
				$("#resRec").prop("hidden", false);
				$(".results li").click(function (e) {
					e.preventDefault();
					var recId = $(this).data("id");  //id.results  this is the variable for the id of the recipe the user clicks
					$.ajax({
						"url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recId + "/information",
						"headers": {
							"X-Mashape-Key": "APHt8X9YagmshN6vXr6VkafMcAy1p1sIjtzjsndjj2LopWsrpl",
							"X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
						},
						"method": "GET",
						"success": function (rs) {
							$(".recipe").append(function () {
								var reci = rs;
								console.log(rs);
								var recipeHTML = '<figure><img src="' + reci.image + '" alt="' + reci.title + '" /><figcaption><a href="' + reci.sourceUrl + '">' + reci.title + '</a></figcaption></figure>';
								return recipeHTML;
							});
							$("#resRec").prop("hidden", true);
							$("#recView").prop("hidden", false);
							$.ajax({
								"url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/pairing?food=" + cui,
								"headers": {
									"X-Mashape-Key": "APHt8X9YagmshN6vXr6VkafMcAy1p1sIjtzjsndjj2LopWsrpl",
									"X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
								},
								"method": "GET",
								"success": function (r) {
									$(".wine").append(function () {
										var wine = r;
										console.log(r);
										var wineHTML = '<figure><img src="' + wine.productMatches[0].imageUrl + '" alt="' + wine.productMatches[0].title + '" /><figcaption><a href="' + wine.productMatches[0].link + '">' + wine.productMatches[0].description + '</a></figcaption></figure>';
										return wineHTML;
									});
								}
							});
							$("#startOver").click(function () {
							location.reload();
							});
			 			}
					});
				});
			}
		});
	});
});