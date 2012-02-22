var Demo = {
	Models:      {},
	Collections: {},
	Views:       {},
	Utils:       {},

	init: function () {
		Demo.Utils.parseRSS(rss_url, function(data) {
			Demo.router = new Demo.Router();
			Demo.feeds = new Demo.Collections.Items(data.entries);
			Backbone.history.start();
		});
	}
};
