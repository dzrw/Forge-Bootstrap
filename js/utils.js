Demo.Utils = {
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
