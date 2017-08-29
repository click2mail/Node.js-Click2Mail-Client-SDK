var c2mAPIRest = require('./class_c2mAPI_rest.js');
//CHANGE "Stage" TO "Live" to go to production
var c2m = new c2mAPIRest('username','password','Stage');
//SET JOB ID YOU ARE WORKING WITH
c2m.jobId = '1234'

var uniqueID = '12345'
//Unique Return Receipt
var localFileNameToSaveUnique = 'myFileTestUNQIUE.pdf' //Note if ommitted UniqueID is used

c2m.requestUSPSReturnReceiptUnique(uniqueID,localFileNameToSave,callbackUniqueRR)

//Return Receipt
var localFileNameToSave = 'myFileTest.pdf' //Note if ommitted Barcode is used or Job if no barcode
var barcode = '1232131'
c2m.requestUSPSReturnReceipt(barcode,localFileNameToSave,callbackRR)

var trackType = 'IMB'
c2m.checkJobTrackingUnique(trackType,callbackUnique)

c2m.checkJobTracking(trackType,callback)

function callbackUniqueRR(id,body)
{
	//if output is blank that means no error and file has downloaded
	console.log("Return Receipt Unique JOBID:" + id +"\n" + body);
}

function callbackRR(id,body)
{
	console.log("JOBID:" + id +"\n" + body);
}

function callbackUnique(id,body)
{
	console.log("REQUEST JOB TRACKING UNIQUE JOBID:" + id +"\n" + body);
}

function callback(id,body)
{
	console.log("REQUEST JOB TRACKING UNIQUE JOBID:" + id +"\n" + body);
}
