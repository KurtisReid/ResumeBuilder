var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=Node.js (1 year), Python (1 year), Git (4 years), SQL (1 year), JavaScript (2 years), JSON and XML (1 year)&month=march';
//Parse the address:
var q = url.parse(adr, true);

/*The parse method returns an object containing url properties*/
//console.log(q.host);
//console.log(q.pathname);
console.log(q.search);

/*The query property returns an object with all the querystring parameters as properties:*/
var qdata = q.query;
console.log(qdata.month);


