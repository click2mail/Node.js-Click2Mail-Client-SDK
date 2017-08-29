var c2mAPIRest = require('./class_c2mAPI_rest.js');
//CHANGE "Stage" TO "Live" to go to production
var c2m = new c2mAPIRest('username','password','Stage');

/*REST TEST ADD ITEMS*/
c2m.addToAddressList("John","Smith1","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressList("John","Smith2","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressList("John","Smith3","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressList("John","Smith5","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","",startProcessingRest);

function startProcessingRest()
{
	/*Unique pdf name for click2mail*/
	id = c2m.guid() + ".pdf";
					//(pdfFile,docName,docClass,docFormat,contentType,layout,prodTime,envelope,color,paperType,printOption)
	c2m.createRestJob("test.pdf",id,"Letter 8.5 x 11","PDF","application/PDF","Address on First Page","Next Day","#10 Double Window","Full Color","White 24#","Printing both sides",completedJob)
}
function completedJob(id,body)
{
	console.log("COMPLETED JobID:" + id);
	console.log("FINAL RAW BODY" + body);
}