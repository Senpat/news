
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownclicked(showid) {
    document.getElementById(showid).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbutton')) {
        var dropdowns = document.getElementsByClassName("dropdowncontent");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

let selectedidtopic="topicall";
function selecttopic(selectedid){
    document.getElementById(selectedid).classList.add("selected");
    if(selectedid !== selectedidtopic){
        document.getElementById(selectedidtopic).classList.remove("selected");
        selectedidtopic=selectedid;
    }
}

let selectedidlang="langall";
function selectlang(selectedid){
    document.getElementById(selectedid).classList.add("selected");
    if(selectedid !== selectedidlang){
        document.getElementById(selectedidlang).classList.remove("selected");
        selectedidlang=selectedid;
    }
}

let selectedidsort="sortpopularity";
function selectsort(selectedid){
    document.getElementById(selectedid).classList.add("selected");
    if(selectedid !== selectedidsort){
        document.getElementById(selectedidsort).classList.remove("selected");
        selectedidsort=selectedid;
    }
}

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
    //build everything url with parameters
	let urlstart = 'https://newsapi.org/v2/everything?';
    let urlq = "";
    let keywords = document.getElementById("keywords").value.trim();
    if(keywords.length > 0){
        urlq = "q=" + keywords + "&";
        console.log("Keywords: " + keywords);
    }
    /*
    let urltopic = "";
    if(selectedidtopic !== "topicall"){
        urltopic = "category=" + selectedidtopic.substring(5) + "&";
    }*/
    let urllang = "";
    if(selectedidlang !== "langall"){
        urllang = "language=" + selectedidlang.substring(4) + "&";
        console.log("Langauge: " + selectedidlang.substring(4));
    }
    let urlsort = "sortBy=" + selectedidsort.substring(4) + "&";
    console.log("Sort by: " + selectedidsort.substring(4));

    let urlend = 'apiKey=c38d6166558c48afb790593c8526d39b';

    let URL = urlstart + urlq + urllang + urlsort + urlend;

	let req = new Request(URL);
	let res = await fetch(req);
	let data = await res.json();
	console.log(data);

	let newshtml = "";

	data.articles.forEach(function(article){
        console.log(article.title);
        newshtml += makeentry(article);
		
	});

	if(newshtml.length == 0){
		newshtml = "No News Found";
	}

	document.getElementById("news section").innerHTML = newshtml;
}

