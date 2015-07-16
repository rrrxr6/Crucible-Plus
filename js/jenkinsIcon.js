$(function() {
	var objectives = $("#objectives-markup");
	var links = $(objectives).find("a");
	
	$(links).each(function() {
		var link = this;
		var url = this.href + "/api/json";
		$.getJSON(url, function(data) {
			if( typeof data.color !== "undefined") {//link to job
				var colorFilename = getColorFilenameFromColor(data.color);
				insertImage(colorFilename, link);
			} else if( typeof data.result !== "undefined") {//link to specific run
				var colorFilename = getColorFilenameFromResult(data.result);
				insertImage(colorFilename, link);
			} else if( typeof data.jobs !== "undefined") {//link to view
				var color = "grey";
				for(var i = 0; i < data.jobs.length; i++) {
					if(data.jobs[i].color == "red" || data.jobs[i].color == "red_anime") {
						color = data.jobs[i].color;
						break;
					} else if(data.jobs[i].color == "yellow" || data.jobs[i].color == "yellow_anime") {
						color = data.jobs[i].color;
					} else if(data.jobs[i].color == "blue" || data.jobs[i].color == "blue_anime") {
						if(color == "grey") {
							color = data.jobs[i].color;
						}
					}
				}
				var colorFilename = getColorFilenameFromColor(color);
				insertImage(colorFilename, link);
			}
		});
	});
})

function getColorFilenameFromColor(color) {
	switch(color) {
		case "blue":
			return "blue.png";
		case "blue_anime":
			return "blue_anime.gif";
		case "yellow":
			return "yellow.png";
		case "yellow_anime":
			return "yellow_anime.gif";
		case "red":
			return "red.png";
		case "red_anime":
			return "red_anime.gif";
	}
	
	if(color.indexOf("anime") > -1) {
		return "grey_anime.gif";
	} else {
		return "grey.png";
	}
}

function getColorFilenameFromResult(result) {
	switch(result) {
		case "SUCCESS":
			return "blue.png";
		case "UNSTABLE":
			return "yellow.png";
		case "FAILED":
			return "red.png";
		default:
			return "grey.png";
	}
}

function insertImage(colorFilename, linkTag) {
	var imageURL = chrome.extension.getURL("images/"+colorFilename);
	var imageTag = "<img src='"+imageURL+"' alt='<"+colorFilename+">'/>";
	$(linkTag).before(imageTag);
}