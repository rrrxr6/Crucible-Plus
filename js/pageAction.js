$(function() {
	$("#review-info").append("<textarea>[JIRA|http://some.jira/browse/EXAMPLE-####][JENKINS|http://example.build/jenkins/job/best-build-ever/][SVN|http://scm.example/svn/path/to/project]</textarea>");
	$("#review-info").append("<div id='paste'>Paste</div>");
	
	chrome.storage.local.get("toPaste", function (result) {
		if( typeof result.toPaste !== "undefined") {
			$("textarea").val(result.toPaste);
		}
    });
	$("#paste").click(function() {
		chrome.tabs.executeScript(null, {file : "js/jquery.js"}, function() {
			chrome.tabs.executeScript(null, {code : "var textToPaste ='"+$('textarea').val()+"';"}, function() {
				chrome.tabs.executeScript(null, {
					file : "js/injected.js"
				}, function() {
					//do nothing
				});
			});
		});
		
		chrome.storage.local.set({"toPaste": $('textarea').val()});
	});
});