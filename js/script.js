$(function () {
	$("#diet-req, #diet-cui").select2({
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
		$.ajax({
			// Generate the URL from the input received.
			"url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ranking=1&number=5&ingredients=apples%2Cflour%2Csugar",
			"headers": {
				"X-Mashape-Key": "APHt8X9YagmshN6vXr6VkafMcAy1p1sIjtzjsndjj2LopWsrpl",
				"X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
			},
			"success": function (res) {
				console.log(res);
			},
			"crossDomain": true
		});
	});
});