const APIKEY = "78b9d599c4f94f8fa3afb1a5458928d6";


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

//Makes the list of countries
const idtocountry = {"us":"USA","ae":"","ar":"","at":"","au":"","be":"","bg":"","br":"","ca":"","ch":"","cn":"","co":"","cu":"",
"cz":"","de":"","eg":"","fr":"","gb":"","gr":"","hk":"","hu":"","id":"","ie":"","il":"","in":"","it":"","jp":"",
"kr":"","lt":"","lv":"","ma":"","mx":"","my":"","ng":"","nl":"","no":"","nz":"","ph":"","pl":"","pt":"",
"ro":"","rs":"","ru":"","sa":"","se":"","sg":"","si":"","sk":"","th":"","tr":"","tw":"","ua":"","ve":"","za":""
}
function makecountrydropdown(dropdownid){
    for(const [isocode,country] of Object.entries(idtocountry)){
        document.getElementById(dropdownid).innerHTML += `<a href='#' id='country${isocode}' onclick='selectcountry(this.id)'>${isocode}</a>`
    }
}

makecountrydropdown("countrycontent");

let selectedidcountry="countryall";
function selectcountry(selectedid){
    document.getElementById(selectedid).classList.add("selected");
    if(selectedid !== selectedidcountry){
        document.getElementById(selectedidcountry).classList.remove("selected");
        selectedidcountry=selectedid;
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
	let urlstart = 'https://newsapi.org/v2/top-headlines?';
    let urlq = "";
    let keywords = document.getElementById("keywords").value.trim();
    if(keywords.length > 0){
        urlq = "q=" + keywords + "&";
        console.log("Keywords: " + keywords);
    }
    
    let urltopic = "";
    if(selectedidtopic !== "topicall"){
        urltopic = "category=" + selectedidtopic.substring(5) + "&";
    }
    let urlcountry = "";
    if(selectedidcountry !== "countryall"){
        urllang = "country=" + selectedidcountry.substring(7) + "&";
        console.log("Country: " + selectedidcountry.substring(7));
    }
    let urlsort = "sortBy=" + selectedidsort.substring(4) + "&";
    console.log("Sort by: " + selectedidsort.substring(4));

    let urlend = 'apiKey=' + APIKEY;

    let URL = urlstart + urlq + urltopic + urlcountry + urlsort + urlend;

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

