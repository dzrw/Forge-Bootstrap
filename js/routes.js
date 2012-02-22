Demo.Router = Backbone.Router.extend({

	routes: {
		"" : "index",         // entry point
		"item/:item_id":"item"// #item/id
	},

	index: function() {
		var index = new Demo.Views.Index({
			collection: Demo.feeds,
			back      : false
		});
		index.show();
	},
	
	item: function(item_id) {
			var item = new Demo.Models.Item(Demo.feeds.models[item_id]);
			var item_view = new Demo.Views.Item({
				model: item,
				back : true
			});
			item_view.show();
	}

});