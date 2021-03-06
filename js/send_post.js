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

function clickSendPost() {
	page.evaluate(function() {
		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);		  	
		document.getElementsByClassName("_9lb")[0].dispatchEvent(ev);								
	});
}

function writeMessage(message) {
	page.evaluate( function(message) {
		document.getElementsByClassName("_55d0")[0].children[1].children[1].children[7].children[0].children[2].value=message;

		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);
		document.getElementsByClassName("_55d0")[0].children[1].children[1].children[15].children[0].children[1].children[1].children[0].dispatchEvent(ev);
	}, message);
}

function done() {	
  	phantom.exit();
}

var system = require('system');

var username = system.args[1];
var password = system.args[2];
var groupName = system.args[3];
var message = system.args[4];

//jobs -> array of [function, [args]]
var jobs = [[login, [username, password]],
			[navigateToGroupsListPage, []],
			[navigateToGroupPage, [groupName]],
			[clickSendPost, []],
			[writeMessage, [message]],
			[done, []]
		   ];
		  
var timeouts = [5000, 5000, 5000, 1000, 1000, 1000]; 

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
  		console.log("Fail");
  	}
});


	   



