Demo.Views.Page = Backbone.View.extend({
	className: "page",

	initialize: function () {
		this.render();
	},
	show: function () {
		direction_coefficiant = this.options.back? 1 : -1
		var el = this.el;
		if ($('.page').length) {
			var $old = $('.page').not(el);
			
			//This fix was hard-won, just doing .css(property, '') doesn't work!
			$old.get(0).style["margin-left"] = ""
			$old.get(0).style["-webkit-transform"] = ""
			
			$(el).appendTo('body').hide();
			$(el).show().css({"margin-left": 320 * direction_coefficiant});
			$(el).anim({translate3d: -320 * direction_coefficiant +'px,0,0'}, 0.3, 'linear');
			$old.anim({translate3d: -320 * direction_coefficiant + 'px,0,0'}, 0.3, 'linear', function() {
				$old.remove();
			});
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
		"click .feed-odd" : "expand_item"
	},

	expand_item: function () {
		console.log(this.model.cid);
		Demo.router.navigate("item/" + this.model.cid.split("").slice(1), true);
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


Demo.Views.Item = Demo.Views.Page.extend({

	events: {
		//TODO: click is sub-optimal on phones, use forge.is to use tap on phones
		"click .item": "expand_item",
		"click #back": "go_back"
	},

	expand_item: function () {
		forge.tabs.open(this.model.get("link"));
	},

	initialize: function() {
		this.render();
	},

	go_back: function() {
		Demo.router.navigate("", true);
	},
	
	render: function() {
		var author = this.model.get("author");
		var author_line = (author ? " by " + author : "");

		$(this.el).append('<div id="back", class="feed-even">Back</div>');
		
		$(this.el).append('<li class="feed-odd">' +
							this.model.get("title") +
							'<div class="author">' +
								author_line +
							'</div>' +
							'<div class="date">' +
								this.model.get("publishedDate").split(" ").slice(0, -1).join(" ") +
							'</div>' +
						  '</li>');
		return this;
	}
});