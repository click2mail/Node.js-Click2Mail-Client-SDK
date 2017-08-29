var c2mAPIBatch = require('./class_c2mAPI_batch.js');
//CHANGE "Stage" TO "Live" to go to production
var c2m = new c2mAPIBatch('username','password','Stage');

c2m.addToBatchList(1,3,"Letter 8.5 x 11","Address on First Page","Next Day","#10 Double Window","Full Color","White 24#","Printing both sides","First Class","John Smith1","TEST COMPANY","12356 TEST STREET","UNIT 2","Oak Brook","IL","60523","US");
c2m.addToBatchList(4,5,"Letter 8.5 x 11","Address on First Page","Next Day","#10 Double Window","Full Color","White 24#","Printing both sides","First Class","John Smith2","TEST COMPANY","12356 TEST STREET","UNIT 2","Oak Brook","IL","60523","US");
c2m.addToBatchList(6,10,"Letter 8.5 x 11","Address on First Page","Next Day","#10 Double Window","Full Color","White 24#","Printing both sides","First Class","John Smith3","TEST COMPANY","12356 TEST STREET","UNIT 2","Oak Brook","IL","60523","US",startProcessingBatch);

function startProcessingBatch()
{
	c2m.createBatchMailing("test.pdf",completedBatch);
}

function checkBatchStatus(id)
{
	c2m.batchID = id
	c2m.getBatchStatus(output);
}