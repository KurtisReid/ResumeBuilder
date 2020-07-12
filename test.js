
const officegen = require('officegen')
const fs = require('fs')
var url = require('url');
var http = require('http');
var texty = '';
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.skills;
  res.write(req.url);
  texty = req.url;
  printDoc(txt);
  res.end();
}).listen(8080);

function printDoc(urlParam) {
	console.log("function: " + urlParam);
	let docx = officegen('docx')
 
// Officegen calling this function after finishing to generate the docx document:
	docx.on('finalize', function(written) {
  console.log(
    'Finish to create a Microsoft Word document.'
  )
})
 
// Officegen calling this function to report errors:
docx.on('error', function(err) {
  console.log(err)
})
 
 // split string at / for skills and positions
 var positions = urlParam.split("/");
console.log("skills = " + positions[0]);
console.log("positions = " + positions[1]); 
// Create a new paragraph:
let pObj = docx.createP()
pObj.addText(positions[0]);
pObj = docx.createP();
pObj.addText(positions[1]);
printTechMahindra(pObj, docx);
//remove junk from url
//var uri_dec = decodeURIComponent(urlParam.search)
//var skills = urlParam.substring('skills='.length+1)
//pObj.addText(skills)

// get access to URLSearchParams object
//const search_params = current_url.searchParams;

// get url parameters
//const id = search_params.get('skills');


// "123"
//console.log(id);





 
// We can even add images:
//pObj.addImage('some-image.png')
 
// Let's generate the Word document into a file:
 
let out = fs.createWriteStream('example.docx')


 
out.on('error', function(err) {
  console.log(err)
})
 
// Async call to generate the output file:
docx.generate(out)
   // function body
   // optional return; 
} 
console.log(texty);

function printPositions(orderedPositions, pObj)
{
	// printing the previous positions in document
	var order = orderedPositions.split(",");
	
	
}
function printTechMahindra(pObj, docx)
{
	pObj = docx.createP();
	pObj.addText('Junior Software Developer', { bold: true, underline: true });
	pObj = docx.createP();
	pObj.addText('GE Transportation (Tech Mahindra) - Melbourne, Florida 				March 2018 to November 2019');
	pObj = docx.createP();
	pObj = docx.createListOfDots ();
	pObj.addText ( 'Speed up analysis of train performance data from 3 hours to 15 minutes through the development of MS Excel macros' );
	pObj = docx.createListOfDots ();
	pObj.addText('Collected historical data and third-party data from different data source including Linux environment ');
	pObj = docx.createListOfDots ();
	pObj.addText ( 'Reduced manual effort to a minute by automating file creation' );
}