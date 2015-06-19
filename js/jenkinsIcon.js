$(function() {
	var objectives = $("#objectives-markup");
	console.dir(objectives);
	var links = $(objectives).find("a[href*='http://build.iaware.cerner.corp/jenkins/']");
	console.dir(links);
	
	$(links).each(function() {
		var link = this;
		var url = this.href + "/api/json";
		console.dir(url);
		$.getJSON(url, function(data) {
			var color = data.color;
			if( typeof color === "undefined") {
				//todo
			} else {
				var ext;
				if(color.indexOf("anime") > -1) {
					ext = ".gif";
				} else {
					ext = ".png";
				}
				var image = "http://build.iaware.cerner.corp/jenkins/static/173caf23/images/16x16/"+color+ext;
				var imageTag = "<img src='"+image+"' />";
				console.dir(imageTag);
				$(link).before(imageTag);
			}
		});
	});
})
