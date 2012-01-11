Demo.Router = Backbone.Router.extend({

	routes: {
		"" : "index" //entry point
	},

	index: function() {
		var index = new Demo.Views.Index({
			collection: Demo.feeds
		});
		index.show();
	}

});