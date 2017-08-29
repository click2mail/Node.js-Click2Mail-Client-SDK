var c2mAPIBatch = require('./class_c2mAPI_batch.js');
//CHANGE "Stage" TO "Live" to go to production
var c2m = new c2mAPIBatch('username','password','Stage');

var myBatchId = 1234;
checkRestJobStatus(myBatchId);

function checkBatchStatus(id)
{
	c2m.batchID = id
	c2m.getBatchStatus(output);
}

function output(id,body)
{
console.log(body);
}