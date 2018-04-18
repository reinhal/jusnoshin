$(function () {
	$("#diet-req, #diet-cui, #excl-ing").select2({ // create accessible friendly input fields with bootstrap
		"width": "100%"
	});
	$(".lisa-select2-tags").select2({
		"width": "100%",
		"tags": true
	});
	// Get meal ideas
	var offset = 0;
	$("#eatIn, #eatInAgain, #moreIdeas").click(function (e) {
		// Prevent the default event of submitting the form.
		e.preventDefault();
		if ( this.id == 'moreIdeas') 
			offset += 6;
		// Send a GET Request and fetch JSON.
		var dietReq = $('#diet-req').val();
		var cui = $('#diet-cui').val();
		var intAll = $('#excl-ing').val();
		$.ajax({
			// Generate the URL from the input received.
			"url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?number=6&offset=" + offset + "&diet=" + encodeURIComponent(dietReq) + "&cuisine=" + encodeURIComponent(cui) + "&intolerances=" + encodeURIComponent(intAll),
			"headers": {
				"X-Mashape-Key": "APHt8X9YagmshN6vXr6VkafMcAy1p1sIjtzjsndjj2LopWsrpl",
				"X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
			},
			"method": "GET",
			"success": function (res) {
				$(".results").empty().append(function () { // display data retrieved from URL.  Six recipes. 
					var optionsHTML = "";
					var ress = res.results;
					for (var i = 0; i < ress.length; i++)
						optionsHTML += '<li data-id="' + ress[i].id + '"><figure><img src="' + ress[i].image + '" alt="' + ress[i].title + '" /><figcaption><a target="_blank" href="">' + ress[i].title + '</a></figcaption></figure></li>';
					return optionsHTML;
				});
				//$("#moreIdeas").click(function () {  //allows user to start the search over
					//location.reload();
				//});
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
							$(".recipe").append(function () {   // display the selected recipe which is linked to the complete recipe. 
								var reci = rs;
								console.log(rs);
								var recipeHTML = '<figure><img src="' + reci.image + '" alt="' + reci.title + '" /><figcaption><a target="_blank" href="' + reci.sourceUrl + '">' + reci.title + '</a></figcaption></figure>';
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
								"success": function (wine) {
									$(".wine").append(function () {  //display the paired wine based on cuisine selected.  A default wine is offered if no pairing is available. 
										console.log(wine);
										if (wine.productMatches.length == 0) {
											var defaultWineHTML = '<figure><img target="_blank" src="https://spoonacular.com/productImages/442371-312x231.jpg" alt="Chehalem INOX Chardonnay" /><figcaption><a href="https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fchehalem-inox-chardonnay-2009%2F109305">\'"INOX® takes its name from the abbreviation of the French word for stainless steel, inoxydable. The wine was created differently from most Chardonnay you\'ve had. We think we\'ve succeeded in expressing the crisp, steely, and fruit-rich side that we love about some Old-World Chardonnays. What makes this possible is the use of exclusively Dijon clones, exceptionally well suited to Oregon\'s cool climate and exhibiting a richness that does not depend on oak. INOX screams of the hallmarks of a cool climate-brightness, pinpoint fruit, and explosive aromas and flavors. We intend INOX for a full range of use, from hot weather chilling to elegant dinner complements.Quintessential INOX, with lovely white aromas of gardenia and other flowers, peach, apricot, pear, pineapple, and green apple candy showing on the nose and palate; it shows a great balance with relatively low alcohol for the year and bright acid; the length is lovely and the weight rich, with a supple, silky texture; flavors linger, with cherry and peach accents. Very pleased."\'</a></figcaption></figure>';
											return defaultWineHTML;
										} else {
										var wineHTML = '<figure><img src="' + wine.productMatches[0].imageUrl + '" alt="' + wine.productMatches[0].title + '" /><figcaption><a href="' + wine.productMatches[0].link + '">' + wine.productMatches[0].description + '</a></figcaption></figure>';
										return wineHTML;
										}
									});
								}
							});
							$("#startOver").click(function () {  // allows user to start the search over
							location.reload();
							});
			 			}
					});
				});
			}
		});
	});
});