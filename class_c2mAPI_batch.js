
/**
 * class_class_c2mAPI_batch_batch.js
 */
function class_c2mAPI_batch(username,passw,mode) {
this.username = username;
this.passw = passw;
this.autoProcess =true;
this.addressMappingId =2;
 if(typeof mode === "undefined") {
	this.mode = 'stage';
 }
 else
 {
	 this.mode = mode;
 }
}

var autoProcess;
var restCallBack;
var batchCallBack;
var mode = '';
var addressMappingId ="";
var request = require('request');
var app = require('express')
var parseString = require('xml2js').parseString;
var batchXMLFile = "";
var batchPDFFile = "";
var fs   = require('fs');
var username = "";
var passw = "";
var batchID = '0';
var documentID = '0';
var addressListID = '0';
var jobID = '0';
var stageBatchURL = "https://stage-batch.click2mail.com";
var batchURL = "https://batch.click2mail.com";

var addressList = new Array();
var addressListBatch = new Array();

var batchList = new Array();

var docOptions = {pdfFile:"",docName:"",docFormat:"",contentType:"",docClass:"",layout:"",prodTime:"",envelope:"",color:"",paperType:"",printOption:""};
//createBatch();
//createDocument('test.pdf');

class_c2mAPI_batch.prototype.setAddressList = function (al,aMId,callBack)
{
	addressList = al;
	this.addressMappingId = aMId;
 if(typeof callBack !== "undefined") {
	callBack();
 }
 
}
class_c2mAPI_batch.prototype.getRestURL = function ()
{
	if(this.mode == 'Live')
	{
		return restURL;
	}
	else
	{
		return stageRestURL;
	}
}
class_c2mAPI_batch.prototype.guid = function (){
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
class_c2mAPI_batch.prototype.createBatchMailing=  function(pdfFile,callBack)
{
	this.batchCallBack = callBack;
	this.batchPDFFile = pdfFile;
	//console.log(this.getBatchURL());
	this.createBatch();
}
class_c2mAPI_batch.prototype.createBatchListXML = function ()
{
	var xml = "<batch> \
	<username>" + this.username + "</username> \
	<password>" + this.passw + "</password> \
	<filename>" + this.batchPDFFile + "</filename> \
	<appSignature>c2m NodeJS SDK</appSignature>";
			
			for (index = 0; index < batchList.length; ++index) {
			xml +="<job>";	
		xml +="<startingPage>"+ batchList[index]['startingPage']+"</startingPage>";
		xml +="<endingPage>"+ batchList[index]['endingPage']+"</endingPage>";
		xml +="<printProductionOptions>";
			xml +="<documentClass>" + batchList[index]['docClass'] + "</documentClass>";
			xml +="<layout>" +  batchList[index]['layout'] + "</layout>";
			xml +="<productionTime>"+ batchList[index]['prodTime'] + "</productionTime>";
			xml +="<envelope>" +  batchList[index]['envelope'] + "</envelope>";
			xml +="<color>" + batchList[index]['color'] + "</color>";
			xml +="<paperType>" +  batchList[index]['paperType'] + "</paperType>";
			xml +="<printOption>" +  batchList[index]['printOption'] + "</printOption>";
			xml +="<mailClass>"+ batchList[index]['mailClass'] + "</mailClass>";
		xml +="</printProductionOptions>";
		xml +="<recipients>";
			if(batchList[index]['addressListBatch'] == undefined)
			{
			xml +="<address>";
				xml +="<name>"+ batchList[index]['name'] + "</name>";
				xml +="<organization>" +  batchList[index]['organization'] + "</organization>";
				xml +="<address1>" + batchList[index]['address1'] +"</address1>";
				xml +="<address2>" + batchList[index]['address2'] +"</address2>";
				xml +="<address3 />"
				xml +="<city>" + batchList[index]['city'] +"</city>";
				xml +="<state>" + batchList[index]['state'] +"</state>";
				xml +="<postalCode>" + batchList[index]['zip'] +"</postalCode>";
				xml +="<country>" + batchList[index]['country'] +"</country>";
			xml +="</address>"
			}
			else
			{
			for (indexd = 0; indexd < batchList[index]['addressListBatch'].length; ++indexd) {
			xml +="<address>";
				xml +="<name>"+  batchList[index]['addressListBatch'][indexd]['name'] + "</name>";
				xml +="<organization>" +  batchList[index]['addressListBatch'][indexd]['organization'] + "</organization>";
				xml +="<address1>" + batchList[index]['addressListBatch'][indexd]['address1'] +"</address1>";
				xml +="<address2>" + batchList[index]['addressListBatch'][indexd]['address2'] +"</address2>";
				xml +="<address3 />"
				xml +="<city>" + batchList[index]['addressListBatch'][indexd]['city'] +"</city>";
				xml +="<state>" + batchList[index]['addressListBatch'][indexd]['state'] +"</state>";
				xml +="<postalCode>" +batchList[index]['addressListBatch'][indexd]['zip'] +"</postalCode>";
				xml +="<country>" + batchList[index]['addressListBatch'][indexd]['country'] +"</country>";
			xml +="</address>"
			}
			}			
		xml +="</recipients>";
	xml +="</job>";
			} 
			xml +="</batch>";
			
	 return xml;
}
class_c2mAPI_batch.prototype.addToAddressListBatch = function (name,organization,address1,address2,city,state,zip,country,callBack)
{
	 
	var address =  {
            "name": name,
			"organization": organization,
			"address1": address1,
			"address2": address2,
			"city": city,
			"state": state,
			"zip": zip,
			"country": country,
        }
	
	addressListBatch.push(address);
 if(typeof callBack !== "undefined") {
	callBack();
 }
 
	
}
class_c2mAPI_batch.prototype.addToBatchListMultiAddress = function (startingPage,endingPage,docClass,lay,prodTime,env,col,papType,printOpt,mClass,callBack)
{
	 
	var batchItem =  {
            "addressListBatch": addressListBatch,
			"docClass":docClass,
			"layout":lay,
			"prodTime":prodTime,
			"envelope":env,
			"color":col,
			"paperType":papType,
			"printOption":printOpt,
			"startingPage":startingPage,
			"endingPage":endingPage,
			"mailClass":mClass
        }
	
	batchList.push(batchItem);
	
 if(typeof callBack !== "undefined") {
	addressListBatch =  new Array();
	callBack();

 }
 
	
}

class_c2mAPI_batch.prototype.addToBatchList = function (startingPage,endingPage,docClass,lay,prodTime,env,col,papType,printOpt,mClass,name,organization,address1,address2,city,state,zip,country,callBack)
{
	 
	var batchItem =  {
            "name": name,
            "organization": organization,
			"address1": address1,
			"address2": address2,
			"city": city,
			"state": state,
			"zip": zip,
			"country": country,
			"docClass":docClass,
			"layout":lay,
			"prodTime":prodTime,
			"envelope":env,
			"color":col,
			"paperType":papType,
			"printOption":printOpt,
			"startingPage":startingPage,
			"endingPage":endingPage,
			"mailClass":mClass
        }
	
	batchList.push(batchItem);
 if(typeof callBack !== "undefined") {
	callBack();
 }
 
	
}
class_c2mAPI_batch.prototype.getBatchURL = function ()
{
	if(this.mode == 'Live')
	{
		return batchURL;
	}
	else
	{
		return stageBatchURL;
	}
}

class_c2mAPI_batch.prototype.createBatch = function (callBack)
{
	//console.log(auth);
	self = this;
	var options ={
        url : this.getBatchURL() + "/v1/batches",
		//port: 443,
		method: 'POST',
		 headers: {
      'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	}};
   

request(options, function (err, res, body) {
  if (err) {
    console.dir(err)
    return
  }
  //console.dir('headers', res.headers)
  //console.dir('status code', res.statusCode)
  //console.dir(body)
	parseString(body, function (err, result) {
		//console.log(batchID);
    self.batchID = result.batchjob.id.toString();
	
	console.log("BatchID:" + self.batchID);
		if(this.autoProcess)
	{
	self.uploadBatchXML();

}
	else
	{
	if(typeof callBack !== "undefined") {
	callBack();
	}

	});
  
});
}
class_c2mAPI_batch.prototype.uploadBatchXML = function (callBack)
{
	self = this;
	
	var fileName =this.guid() + ".tmp";
	fs.writeFile(fileName, this.createBatchListXML(), function(err) {
    if(err) {
        return console.log(err);
    }
	const stats = fs.statSync(fileName);
	const fileSize = stats.size;
	 var file = fs.createReadStream(fileName)
      .pipe(request.put({url: self.getBatchURL() + "/v1/batches/" + self.batchID, headers:{ 'Authorization': 'Basic ' + new Buffer(self.username + ':' + self.passw).toString('base64')
	  ,'Content-Type': 'application/xml',
	  'Content-Length': fileSize}}, function(err, res, body){
        if(err) {
          console.log('error', err);
        } else {
          console.log('status', res.statusCode);
          if(res.statusCode === 200) {
            console.log('success'); 
			fs.unlinkSync("./" + fileName);
			
	if(this.autoProcess)
	{
	self.uploadBatchPDF();
}
	else
	{
	if(typeof callBack !== "undefined") {
	callBack();
	}

	}     
     }
        }
      }));
	});
	};

class_c2mAPI_batch.prototype.uploadBatchPDF =function (callBack)
{

self = this;
	var fileName = this.batchPDFFile;
	const stats = fs.statSync(fileName);
	const fileSize = stats.size;
	 var file = fs.createReadStream(fileName)
      .pipe(request.put({url: this.getBatchURL() + "/v1/batches/" + this.batchID, headers:{ 'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	  ,'Content-Type': 'application/pdf',
	  'Content-Length': fileSize}}, function(err, res, body){
        if(err) {
          console.log('error', err);
        } else {
          //console.log('status', res.statusCode);
          if(res.statusCode === 200) {
            console.log("successful Upload of PDF"); 
			if(this.autoProcess)
	{
	self.submitBatch();
}
	else
	{
	if(typeof callBack !== "undefined") {
	callBack();
	}

	}
          }
        }
      }));
};
class_c2mAPI_batch.prototype.submitBatch = function (callBack)
{
	console.log("SUBMITTING BATCH");
	self = this;
	var options ={
        url : this.getBatchURL() + "/v1/batches/" + this.batchID,
		//port: 443,
		method: 'POST',
		 headers: {
      'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	}};
   

request(options, function (err, res, body) {
  if (err) {
    console.dir(err)
    return
  }
  //console.dir('headers', res.headers)
  //console.dir('status code', res.statusCode)
  //console.dir(body)
	parseString(body, function (err, result) {
		//console.log(body);
	if(this.autoProcess)
	{
	self.getBatchStatus()
	
}
	else
	{
	if(typeof callBack !== "undefined") {
	callBack();
	}

	}   
   });
  
});
}
class_c2mAPI_batch.prototype.getBatchStatus = function (callback)
{
	//console.log(auth);

	self = this;
	var options ={
        url : this.getBatchURL() + "/v1/batches/" + this.batchID,
		//port: 443,
		method: 'GET',
		 headers: {
      'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	}};
   

request(options, function (err, res, body) {
  if (err) {
    console.dir(err)
    return
  }
  //console.dir('headers', res.headers)
  //console.dir('status code', res.statusCode)
  //console.dir(body)
	parseString(body, function (err, result) {
	
	//	console.log(body);
		if(typeof self.batchCallBack !== "undefined") {
		self.batchCallBack(self.batchID,body);
		self.batchCallBack = undefined;
		}
		if(typeof callback !== "undefined") {
		callback(self.batchID,body);
		}
		
	});
 
  
});

}


module.exports = class_c2mAPI_batch;