var Demo = {
	Models:      {},
	Collections: {},
	Views:       {},
	Utils:       {},

	// Called once, at app startup
	init: function () {
		// Grab the Trigger twitter feed
		forge.request.ajax({
			url: "https://twitter.com/statuses/user_timeline/14972793.json",
			dataType: "json",
			success: showIndex
		});

		// to be called once we have the Trigger twitter feed
		function showIndex(data) {
			// Save away initial data
			Demo.items = new Demo.Collections.Items(data);

			// Set up Backbone
			Demo.router = new Demo.Router();
			Backbone.history.start();
		}
	}
};
