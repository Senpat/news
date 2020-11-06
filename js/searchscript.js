const APIKEY = "78b9d599c4f94f8fa3afb1a5458928d6";


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownclicked(showid) {
    document.getElementById(showid).classList.toggle("show");

    //close other dropdowns
    var dropdowns = document.getElementsByClassName("dropdowncontent");
    for(var k = 0; k < dropdowns.length; k++){
        var openDropdown = dropdowns[k];
        if(openDropdown.id !== showid && openDropdown.classList.contains('show')){
            openDropdown.classList.remove('show')
        }
    }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event){
    if (!event.target.matches('.dropbutton')){
        var dropdowns = document.getElementsByClassName("dropdowncontent");
        
        for (var k = 0; k < dropdowns.length; k++){
            var openDropdown = dropdowns[k];
            if (openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
}

let selectedidtopic="topicentertainment";
function selecttopic(selectedid){
    document.getElementById(selectedid).classList.add("selected");
    if(selectedid !== selectedidtopic){
        document.getElementById(selectedidtopic).classList.remove("selected");
        selectedidtopic=selectedid;
    }
}

//Makes the list of countries
const idtocountry = {"us":"USA","ae":"United Arab Emirates","ar":"Argentina","at":"Austria","au":"Australia","be":"Belgium","bg":"Bulgaria","br":"Brazil","ca":"Canada","ch":"Switzerland","cn":"China","co":"Colombia","cu":"Cuba",
"cz":"Czechia","de":"Germany","eg":"Egypt","fr":"France","gb":"United Kingdom","gr":"Greece","hk":"Hong Kong","hu":"Hungary","id":"Indonesia","ie":"Ireland","il":"Israel","in":"India","it":"Italy","jp":"Japan",
"kr":"Korea","lt":"Lithuania","lv":"Latvia","ma":"Morocco","mx":"Mexico","my":"Malaysia","ng":"Nigeria","nl":"Netherlands","no":"Norway","nz":"New Zealand","ph":"Philippines","pl":"Poland","pt":"Portugal",
"ro":"Romania","rs":"Serbia","ru":"Russia","sa":"Saudi Arabia","se":"Sweden","sg":"Singapore","si":"Slovenia","sk":"Slovakia","th":"Thailand","tr":"Turkey","tw":"Taiwan","ua":"Ukraine","ve":"Venezuela","za":"South Africa"
}
//sorts the countries

var sortable = [];
for(const [id,countryname] of Object.entries(idtocountry)){
    if(id !== "us"){
        sortable.push([id,countryname]);
    }
}

sortable.sort(function(a,b){
    return a[1].localeCompare(b[1]);
});

sortable.unshift(["us","USA"]);

function makecountrydropdown(dropdownid){
    for(const pair of sortable){
        document.getElementById(dropdownid).innerHTML += `<a href='#' id='country${pair[0]}' onclick='selectcountry(this.id)'>${pair[1]}</a>`
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
    return `<div class='entry'>
        <div class='entryimage'>
            <img src='${article.urlToImage}'>
        </div>
        <div class='entrytext'>
            <a href='${article.url}' target=_blank id='entrytitle'>${article.title}</a>
            <p>${moment(article.publishedAt).fromNow()}</p>
        </div>
        
    </div>`
}

async function refresh(page, obj){
    if(page == 1){
        document.getElementById("news section").innerHTML = "";
    } else {
        //remove view more buttons
        // document.getElementsByClassName("viewmore").forEach(function(button){
        //     button.css("display", 'none');
        // });
        obj.style.display='none';
    }
    

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
    } else {
        urltopic = "category=sports,entertainment,technology&";
    }
    let urlcountry = "";
    if(selectedidcountry !== "countryall"){
        urlcountry = "country=" + selectedidcountry.substring(7) + "&";
        console.log("Country: " + selectedidcountry.substring(7));
    }
    let urlsort = "sortBy=" + selectedidsort.substring(4) + "&";
    console.log("Sort by: " + selectedidsort.substring(4));

    let urlpage = "page=" + page + "&";

    let urlend = 'apiKey=' + APIKEY;

    let URL = urlstart + urlq + urltopic + urlcountry + urlsort + urlpage + urlend;

	let req = new Request(URL);
	let res = await fetch(req);
	let data = await res.json();
	console.log(data);

	let newshtml = "";

	data.articles.forEach(function(article){
        console.log(article.title);
        console.log(article.content);
        newshtml += makeentry(article);
		
	});

	if(newshtml.length == 0){
		newshtml = "No News Found";
	}

    document.getElementById("news section").innerHTML += newshtml;
    
    if(page * 20 < data.totalResults){
        document.getElementById("news section").innerHTML += `<button class='viewmore' onclick='refresh(${page+1}, this)'>View More</button>`;
    }
}

