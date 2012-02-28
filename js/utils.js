Demo.Utils = {

	parseRSS: function(url, callback) {
		$.ajax({
			url: 'http:' + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
			dataType: 'json',
			success: function(data) {
				callback(data.responseData.feed);
			}
		});
	},
	
	click_or_tap: function(obj) {
		//for property in obj, add "click " to property and use original value
		var new_obj = {};
		for(var property in obj) {
			if (obj.hasOwnProperty(property)) {
				if (forge.is.mobile()) {
					new_obj["tap " + property] = obj[property];
				}
				else {
					new_obj["click " + property] = obj[property];
				}
			}
		}
		return new_obj
	}
}
