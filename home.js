var http = require('http');
const officegen = require('officegen')
const fs = require('fs')
var url = require('url');
var adr = 'http://localhost:8080/default.htm?skills=Node.js (1 year), Python (1 year), Git (4 years), SQL (1 year), JavaScript (2 years), JSON and XML (1 year)';
//Parse the address:
var q = url.parse(adr, true);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(8080);

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


pObj.addText(' with color', { color: '000088' })
pObj.addText(' and back color.', { color: '00ffff', back: '000088' })
 
pObj = docx.createP()
 
pObj.addText('Since ')
pObj.addText('officegen 0.2.12', {
  back: '00ffff',
  shdType: 'pct12',
  shdColor: 'ff0000'
}) // Use pattern in the background.
pObj.addText(' you can do ')
pObj.addText('more cool ', { highlight: true }) // Highlight!
pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.
 
pObj = docx.createP()
 
pObj.addText('Even add ')
pObj.addText('external link', { link: 'https://github.com' })
pObj.addText('!')
 
pObj = docx.createP()
 
pObj.addText('Bold + underline', { bold: true, underline: true })
 
pObj = docx.createP({ align: 'center' })
 
pObj.addText('Center this text', {
  border: 'dotted',
  borderSize: 12,
  borderColor: '88CCFF'
})
 
pObj = docx.createP()
pObj.options.align = 'right'
 
pObj.addText('Align this text to the right.')
 
pObj = docx.createP()
 
pObj.addText('Those two lines are in the same paragraph,')
pObj.addLineBreak()
pObj.addText('but they are separated by a line break.')
 
docx.putPageBreak()
 
pObj = docx.createP()
 
pObj.addText('Fonts face only.', { font_face: 'Arial' })
pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })
 
docx.putPageBreak()
 
pObj = docx.createP()
 
// We can even add images:
//pObj.addImage('some-image.png')
 
// Let's generate the Word document into a file:
 
let out = fs.createWriteStream('example.docx')
 
out.on('error', function(err) {
  console.log(err)
})
 
// Async call to generate the output file:
docx.generate(out)