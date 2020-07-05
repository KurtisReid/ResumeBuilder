var http = require('http');
const officegen = require('officegen')
const fs = require('fs')
var url = require('url');
var adr = 'http://localhost:8080/default.htm?skills=Node.js (1 year), Python (1 year), Git (4 years), SQL (1 year), JavaScript (2 years), JSON and XML (1 year)';
//Parse the address:
var q = url.parse(adr, true);
//const current_url = new URL('http://localhost:8080/default.htm?skills=Node.js (1 year),');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  res.end(url);
  
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
 
// Create a new paragraph:
let pObj = docx.createP()
//remove junk from url
var uri_dec = decodeURIComponent(q.search)
var skills = uri_dec.substring('skills='.length+1)
pObj.addText(skills)

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
 

docx.generate(out)
  
}).listen(8080);

