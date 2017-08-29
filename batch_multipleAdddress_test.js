var c2mAPIBatch = require('./class_c2mAPI_batch.js');
//CHANGE "Stage" TO "Live" to go to production
var c2m = new c2mAPIBatch('username','password','Stage');

//PAGES 1-3 go to these addresses
c2m.addToAddressListBatch("John Smith1","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith2","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith3","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith4","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith5","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","",
c2m.addToBatchListMultiAddress(1,3,"Letter 8.5 x 11","Address on First Page","Next Day","#10 Double Window","Full Color","White 24#","Printing both sides","First Class",function(){
	//console.log(c2m.createBatchListXML());	
}));

//PAGES 4-5 go to these addresses
c2m.addToAddressListBatch("John Smith1","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith2","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith3","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith4","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith5","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","",
c2m.addToBatchListMultiAddress(4,5,"Letter 8.5 x 11","Address on First Page","Next Day","#10 Double Window","Full Color","White 24#","Printing both sides","First Class",function(){

}));

//PAGES 6-10 go to these addresses
c2m.addToAddressListBatch("John Smith1","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith2","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith3","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith4","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","");
c2m.addToAddressListBatch("John Smith5","TEST COMPANY","1235 TEST STREET","APT 3","Oak Brook","IL","60523","",
c2m.addToBatchListMultiAddress(6,10,"Letter 8.5 x 11","Address on First Page","Next Day","#10 Double Window","Full Color","White 24#","Printing both sides","First Class",function(){
	
}));

function startProcessingBatch()
{
	c2m.createBatchMailing("test.pdf",completedBatch);
}

function completedBatch(id,body)
{
	console.log("COMPLETED BatchID:" + id);
	console.log("FINAL RAW BODY" + body);
	checkBatchStatus(id);
}

