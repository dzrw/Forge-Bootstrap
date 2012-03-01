Demo.Router = Backbone.Router.extend({

	routes: {
        "" : "index",         // entry point: no hash fragment or #
		"item/:item_id":"item"// #item/id
	},

	// main and initial route
	index: function() {
		// we will show a page of all our recent tweets
		var index = new Demo.Views.Index({
				collection: Demo.items,
				back      : false
			});
		// .show() is specific to our Page view class
		index.show();
	},
	
	// for viewing a specific tweet
	item: function(item_id) {
		var item = new Demo.Models.Item(Demo.items.models[item_id]);
		var item_view = new Demo.Views.Item({
			model: item,
			back : true
		});
		item_view.show();
	}
});
