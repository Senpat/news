const APIKEY = "78b9d599c4f94f8fa3afb1a5458928d6";

let categories = new Set(["entertainment","sports","technology"]);


function makeentry(article){
	return `<div id='entry'>
			<div id='entrytext'>
				<a href='${article.url}' target=_blank id='entrytitle'>${article.title}</a>
				<p id='date'>${article.publishedAt}</p>
			</div>
			<div id='entryimage'>
				<img src='${article.urlToImage}'>
			</div>
		</div>`;
}

async function refresh(event){
	let sourcesurl = 'https://newsapi.org/v2/sources?apiKey=' + APIKEY;
	
	let sourcesreq = new Request(sourcesurl);
	let sourcesres = await fetch(sourcesreq);
	let sourcesdata = await sourcesres.json();
	console.log(sourcesdata);

	let entertainmentbool = document.getElementById("entertainmentbox").checked;
	let sportsbool = document.getElementById("sportsbox").checked;
	let technologybool = document.getElementById("technologybox").checked;
	let allbool = document.getElementById("allbox").checked;

	let filterids = new Set()
	//add the allowed ids to the set
	sourcesdata.sources.forEach(function(source){
		if(categories.has(source.category)){
			if(allbool || document.getElementById(source.category+"box").checked){
				//add the id
				filterids.add(source.id);
			}
		}
	});

	let topurl = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + APIKEY;

	let topreq = new Request(topurl);
	let topres = await fetch(topreq);
	let topdata = await topres.json();
	console.log(topdata);

	let newshtml = "";

	topdata.articles.forEach(function(article){
		if(filterids.has(article.source.id)){
			console.log(article.title);
			newshtml += makeentry(article);
		}
	});

	if(newshtml.length == 0){
		newshtml = "No News Found";
	}

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


