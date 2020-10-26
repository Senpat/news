

async function refresh(event){
	//var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=c38d6166558c48afb790593c8526d39b';
	let sourcesurl = 'https://newsapi.org/v2/sources?apiKey=c38d6166558c48afb790593c8526d39b';
	
	var req = new Request(sourcesurl);
	let res = await fetch(req);
	let data = await res.json();
	console.log(data);
		// .then(function(response) {
		// 	return response.json();
		// })
		// .then(function(response) {
		// 	console.log(response)
		// })	
}

console.log("javascript")
