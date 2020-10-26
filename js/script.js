

var categories = new Set(["entertainment","sports","technology"]);

async function refresh(event){
	let sourcesurl = 'https://newsapi.org/v2/sources?apiKey=c38d6166558c48afb790593c8526d39b';
	
	var sourcesreq = new Request(sourcesurl);
	let sourcesres = await fetch(sourcesreq);
	let sourcesdata = await sourcesres.json();
	console.log(sourcesdata);

	var entertainmentbool = document.getElementById("entertainmentbox").checked;
	var sportsbool = document.getElementById("sportsbox").checked;
	var technologybool = document.getElementById("technologybox").checked;
	var allbool = document.getElementById("allbox").checked;

	var newshtml = "";
	//add that data to the string
	sourcesdata.sources.forEach(function(source){
		if(categories.has(source.category)){
			if(allbool || document.getElementById(source.category+"box").checked){
				//show the news\
				newshtml += "<p>" + source.name + "</p>"
			}
		}
	});

	document.getElementById("news section").innerHTML = newshtml;
}

function otheronclick(clickedid){
	console.log(clickedid)
	if(document.getElementById(clickedid).checked){
		document.getElementById("allbox").checked = false;
	}
}

function allonclick(event){
	console.log(document.getElementById("allbox").checked);
	if(document.getElementById("allbox").checked){
		document.getElementById("entertainmentbox").checked = false;
		document.getElementById("sportsbox").checked = false;
		document.getElementById("technologybox").checked = false;
	}
}


