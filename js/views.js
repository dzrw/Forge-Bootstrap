Demo.Views.Page = Backbone.View.extend({
	className: "page",

	initialize: function () {
		this.render();
	},
	show: function () {
		var el = this.el;
		if ($('.page, .loading').length) {
			// TODO: reuse pages.
			$('.page, .loading').not(el).remove();
			$(el).appendTo('body').hide();
			$(el).show();
		} else {
			$(el).appendTo('body').hide();
			$(el).show();
		}
	window.scrollTo(0, 0);/* TODO: This is not cross platform. Jquery has
							 .scrollTop(), but zepto does not. Port? */
	}
});


Demo.Views.Index = Demo.Views.Page.extend({

	initialize: function() {
		this.render();
	},

	render: function() {
		var that = this;
		this.collection.each(function(feed_item, index){
				if (index % 2 === 1) {
					var new_view = new Demo.Views.Feed({
						model: feed_item,
						odd: true}
					);
				} else {
					var new_view = new Demo.Views.Feed({
						model: feed_item,
						odd: false
					});
				}
				$(that.el).append(new_view.el);
		});
		return this;
	}
});


Demo.Views.Feed = Backbone.View.extend({

	events: {
		//TODO: click is sub-optimal on phones, use forge.is to use tap on phones
		"click .feed-even": "expand_item",
		"click.feed-odd" : "expand_item"
	},

	expand_item: function () {
		Demo.router.navigate("feed/" + this.model.get("slug"), true);
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		var feed_class = (this.options.odd? "feed-odd" : "feed-even");
		$(this.el).append('<div class="' + feed_class + '">' +
							this.model.get("title") +
							"</div>");
		return this;
	},
});
