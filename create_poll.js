function login(username, password) { 
	page.evaluate(function(args) {
	  	document.getElementById("email").value = args[0];
	 	document.getElementById("pass").value = args[1];
	  	document.getElementById("login_button_inline").children[0].children[0].click();
    }, [username, password]);
}

function navigateToGroupsListPage() {
	page.evaluate(function() {    
		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);
		document.querySelector("a[href='/groups/?category=membership&ref=bookmark_header']").dispatchEvent(ev);
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

function clickAskQuestion() {
	page.evaluate(function() {
		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);		  	
		document.getElementsByClassName("_9lb")[2].dispatchEvent(ev);								
	});
}

function writeMessageAndClickPollOptions(message) {
	page.evaluate( function(message) {
		document.getElementsByClassName("_55d0")[0].children[1].children[1].children[7].children[1].children[0].value=message;
		
		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);  
		document.getElementsByClassName("_55d0")[0].children[1].children[1].children[8].children[0].children[0].children[0].dispatchEvent(ev);
	}, message);
}

function fillTheOptionsAndPost(options) {
	page.evaluate(function(options) {
		for (i = 0; i < options.length; i++) {
			document.getElementsByClassName("_55d0")[0].children[1].children[1].children[7].children[2].children[i].children[0].children[1].children[0].value=options[i];	
		}
		
		// allow anyone to add option -> false
		//document.querySelector("input[name='create_eigenpoll']").checked=false;
		
		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0 , null);
		document.getElementsByClassName("_55d0")[0].children[1].children[1].children[8].children[0].children[1].children[1].children[0].dispatchEvent(ev);
	},options);
	
	return ret;
}

function afterPost() {
	var pollid = page.evaluate(function() {
		return document.querySelectorAll("div.fbEigenpollRow input[name='qid']")[0].value;
	});		
  	return pollid;
}

function done() {	
  	phantom.exit();
}

var system = require('system');

var username = system.args[1];
var password = system.args[2];
var groupName = system.args[3];
var message = system.args[4];
var options = system.args.slice(5, system.args.length);

//jobs -> array of [function, [args]]
var jobs = [[login, [username, password]],
			[navigateToGroupsListPage, []],
			[navigateToGroupPage, [groupName]],
			[clickAskQuestion, []],
			[writeMessageAndClickPollOptions, [message]],
			[fillTheOptionsAndPost, [options]],
			[afterPost, []],
			[done, []]
		   ];
		  
var timeouts = [5000, 5000, 5000, 1000, 1000, 10000, 1000, 1000]; 

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
		console.log('CONSOLE: ' + msg);
	};
	
  	if (status === "success") {  	
    	doJob();
  	}
  	else {
  		console.log("Fail");
  	}
});


	   



