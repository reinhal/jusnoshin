$(function () {
	$("#diet-req, #diet-cui" ).select2({
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
				console.log(res);
			},
			"crossDomain": true
		});
	});
});