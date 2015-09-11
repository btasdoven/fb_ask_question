function login(username, password) { 
	page.evaluate(function(args) {
	  	document.getElementById("email").value = args[0];
	 	document.getElementById("pass").value = args[1];
	  	document.querySelectorAll("input[type='submit']")[0].click();
    }, [username, password]);
}

function navigateToGroupsListPage() {
	page.evaluate(function() {    
		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);
		document.getElementById("groupsNav").querySelectorAll(".navHeader")[0].children[0].dispatchEvent(ev);
  	});
}

function navigateToGroupPage(groupName) {
	page.evaluate(function(groupName) {    
		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);
		
		groups = document.querySelectorAll("a.groupsRecommendedTitle");
		for (i = 0; i < groups.length; ++i) {
			if (groups[i].innerHTML == groupName) {
				groups[i].dispatchEvent(ev);
				break;
			}
		}
  	}, groupName);
}

function openVotes(poll_id) {
	page.evaluate(function(poll_id) {
		var root = document.querySelectorAll("div.fbEigenpollRow input[name='qid'][value='" + poll_id + "']")[0].parentNode.parentNode.parentNode;
		var pager = root.querySelectorAll(".fbEigenpollPager");
		if (pager.length > 0) {
			//load more button...
			var ev = document.createEvent("MouseEvent");
			ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);
			pager[0].children[0].dispatchEvent(ev);
		}
	}, poll_id);
}

function getVotes(poll_id) {
	var votes = page.evaluate(function(poll_id) {
		var votes = {};
		qid = "pagelet_question_answers" + poll_id
		
		var options = document.querySelectorAll("div#" + qid + " .fbEigenpollRow");

		for (i = 0; i < options.length; ++i) {
			lbl = options[i].querySelector(".label span").innerHTML;
			votes[lbl] = options[i].querySelectorAll(".fbEigenpollFacepile li.fbQuestionFacepileItem").length;
			
			more = options[i].querySelectorAll(".fbEigenpollFacepile li.fbQuestionFacepileMoreItem").length;
			if (more.length > 0) {
				count = more[0].children[0].innerHTML;
				count = count.slice(1, count.length);
				votes[lbl] += parseInt(count);
			}
		}
		return votes;
	}, poll_id);
	
	return votes;
}

function done() {
//  	page.render("ss2.png");
//  	console.log("Success");
  	phantom.exit();	
}


var system = require('system');

var username = system.args[1];
var password = system.args[2];
var groupName = system.args[3];
var poll_id = system.args[4];

//jobs -> array of [function, [args]]
var jobs = [[login, [username, password]],
			[navigateToGroupsListPage, []],
			[navigateToGroupPage, [groupName]],
			[openVotes, [poll_id]],
			[getVotes, [poll_id]],
			[done, []]
		   ];
		   
var timeouts = [5000, 5000, 5000, 5000, 1000, 1000]; 

function doJob() {
	if (jobs.length > 0) {
		nextJob = jobs.shift();
		timeout = timeouts.shift();
		ret = nextJob[0].apply(this, nextJob[1]);
		if (ret !== undefined)
			console.log(JSON.stringify(ret));
		setTimeout(doJob, timeout);
	}
}

var page = require('webpage').create();

page.open("http://www.facebook.com/login.php", function(status) {
	page.onConsoleMessage = function(msg, lineNum, sourceId) {
		//console.log('CONSOLE: ' + msg);
	};
	
  	if (status === "success") {  	
    	doJob();
  	}
  	else {
		//console.log("Fail");
  	}
});


	   



