/**
 * class_class_class_c2mAPI_rest_rest_rest.js
 */
function class_c2mAPI_rest(username,passw,mode,autoProcess) {
this.username = username;
this.passw = passw;
this.addressMappingId =2;
	if(autoProcess ==="undefined")
	{
			this.autoProcess =true;
	}
	else
	{
			this.autoProcess = false;
	}


 if(typeof mode === "undefined") {
	this.mode = 'stage';
 }
 else
 {
	 this.mode = mode;
 }
}

var restCallBack;
var batchCallBack;
var mode = '';
var addressMappingId ="";
var request = require('request');
var app = require('express')
var parseString = require('xml2js').parseString;
var batchXMLFile = "";
var batchPDFFile = "";
var autoProcess;
var fs   = require('fs');
var username = "";
var passw = "";
var batchID = '0';
var documentID = '0';
var addressListID = '0';
var jobID = '0';
var stageRestURL = "https://stage-rest.click2mail.com";
var restURL = "https://rest.click2mail.com";
var addressList = new Array();
var addressListBatch = new Array();

var batchList = new Array();

var docOptions = {pdfFile:"",docName:"",docFormat:"",contentType:"",docClass:"",layout:"",prodTime:"",envelope:"",color:"",paperType:"",printOption:""};
//createBatch();
//createDocument('test.pdf');

class_c2mAPI_rest.prototype.setAddressList = function (al,aMId,callBack)
{
	addressList = al;
	this.addressMappingId = aMId;
 if(typeof callBack !== "undefined") {
	callBack();
 }
 
}
class_c2mAPI_rest.prototype.getRestURL = function ()
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
class_c2mAPI_rest.prototype.guid = function (){
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


class_c2mAPI_rest.prototype.createRestJob =  function(pdfFile,docName,docClass,docFormat,contentType,lay,prodTime,env,col,papType,printOpt,callBack)
{
/* if(documentClass.indexOf(docClass) <= -1)
	 {
		 console.log(docClass + 'is not a valid Document Class\nChoose from '+ documentClass);
		 return;
	 }
	 else if(layout.indexOf(lay) <= -1)
	 {
		 console.log(lay + 'is not a valid Layout\nChoose from '+ layout);
		 return;
	 }
	 else if(productionTime.indexOf(prodTime) <= -1)
	 {
		 console.log(prodTime + 'is not a valid ProductionTime\nChoose from '+ productionTime);
		 return;
	 }
	 else if(color.indexOf(col) <= -1)
	 {
		 console.log(col + 'is not a valid Color Option\nChoose from '+ color);
		 return;
	 }
	 else if(paperType.indexOf(papType) <= -1)
	 {
		 console.log(papType + 'is not a valid Color Option\nChoose from '+ paperType);
		 return;
	 }
	 else if(printOption.indexOf(printOpt) <= -1)
	 {
		 console.log(printOpt + 'is not a valid Color Option\nChoose from '+ printOption);
		 return;
	 }
	
	*/
this.restCallBack= callBack;
docOptions.pdfFile = pdfFile;
docOptions.docName = docName;
docOptions.docClass = docClass;
docOptions.docFormat = docFormat;
docOptions.layout = lay;
docOptions.contentType = contentType;
docOptions.prodTime= prodTime;
docOptions.envelope = env;
docOptions.color = col;
docOptions.paperType = papType;
docOptions.printOption = printOpt;

this.createDocument();
}

class_c2mAPI_rest.prototype.createDocument = function (callBack)
{
	//console.log(auth);
	var self = this;
	var options ={
        url :  this.getRestURL()+ "/molpro/documents/",
		//port: 443,
		method: 'POST',
		 headers: {
      'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	}};
   
   //console.log(options);
var req = request(options, function (err, resp, body) {
  if (err) {
    console.log('Error!');
  } else {
    	parseString(body, function (err, result) {
		//console.log(batchID);
    self.documentID = result.document.id.toString();
	
	console.log("DOC:" +self.documentID);
	if(this.autoProcess)
	{
	self.createAddressList();
	}
	else
	{
	if(typeof callBack !== "undefined") {
	callBack();
	}

	}
	});
  }
});
var form = req.form();
form.append('file',fs.createReadStream(docOptions.pdfFile), {contentType: docOptions.contentType});
form.append('documentName',docOptions.docName);
form.append('documentClass',docOptions.docClass);
form.append('documentFormat',docOptions.docFormat);
};

class_c2mAPI_rest.prototype.addToAddressList = function (fname,lname,organization,address1,address2,city,state,zip,country,callBack)
{
	 
	 
			/*xml += "<First_name>" + addressList[index]['firstName'] + "</First_name>";
			xml += "<Last_name>" + addressList[index]['lastName'] + "</Last_name>";
			xml += "<Organization>" + addressList[index]['organization'] + "</Organization>";
			xml += "<Address1>" + addressList[index]['address1'] + "</Address1>";
			xml += "<Address2>" + addressList[index]['address2'] + "</Address2>";
			xml += "<City>" + addressList[index]['city'] + "</City>";
			xml += "<State>" + addressList[index]['state'] + "</State>";
			xml += "<zip>" + addressList[index]['zip'] + "</zip>";
			xml += "<Country_non-US>" + addressList[index]['country'] + "</Country_non-US>";
			xml +="</address>";
			*/
	var address =  {
            "First_name": fname,
            "Last_name": lname,
			"Organization": organization,
			"Address1": address1,
			"Address2": address2,
			"City": city,
			"State": state,
			"zip": zip,
			"Country_non-US": country,
        }
	
	addressList.push(address);
 if(typeof callBack !== "undefined") {
	callBack();
 }
 
	
}

class_c2mAPI_rest.prototype.createAddressListXML = function ()
{
	var xml = "<addressList>	\
			 <addressListName>" + this.guid() + "</addressListName>	\
			<addressMappingId>"+this.addressMappingId+"</addressMappingId>	\
			<addresses>	";
			for (index = 0; index < addressList.length; ++index) {
			xml +="<address>";	
			address =addressList[index];
				for (var k in address)
				{
				xml += "<"+	k +'>'+ address[k] +"</"+k+">";
				}
			xml +="</address>";	
	
			/*xml += "<First_name>" + addressList[index]['firstName'] + "</First_name>";
			xml += "<Last_name>" + addressList[index]['lastName'] + "</Last_name>";
			xml += "<Organization>" + addressList[index]['organization'] + "</Organization>";
			xml += "<Address1>" + addressList[index]['address1'] + "</Address1>";
			xml += "<Address2>" + addressList[index]['address2'] + "</Address2>";
			xml += "<City>" + addressList[index]['city'] + "</City>";
			xml += "<State>" + addressList[index]['state'] + "</State>";
			xml += "<zip>" + addressList[index]['zip'] + "</zip>";
			xml += "<Country_non-US>" + addressList[index]['country'] + "</Country_non-US>";
			xml +="</address>";
			*/
			}
			xml +="</addresses>	\
			</addressList>";	
	 return xml;
}

class_c2mAPI_rest.prototype.createAddressList = function(callBack)
{
	self= this;
	var options ={
        url :  this.getRestURL()+ "/molpro/addressLists/",
		//port: 443,
		method: 'POST',
		 headers: {
      'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	  ,ContentType: 'application/xml'
	}};
	
	var req = request(options, function (err, resp, body) {
  
	if (err) {
		console.log('Error!');
	} else {
      	parseString(body, function (err, result) {
		//console.log(batchID);
		self.addressListID = result.addressList.id.toString();
	
		console.log("Address List:" + self.addressListID);
if(this.autoProcess)
	{
	self.createJob();
	}
	else
	{
	if(typeof callBack !== "undefined") {
	callBack();
	}

	}	
	
	});
  }
});

	
req.write( this.createAddressListXML() );
req.end();
	
}

class_c2mAPI_rest.prototype.createJob = function(callBack)
{
self = this;
var urlencode = require('urlencode');
	 
 var querystring = "documentClass=" + urlencode.encode(docOptions.docClass);
 querystring +="&layout="+ urlencode.encode(docOptions.layout)	;
querystring +="&productionTime="+ urlencode.encode(docOptions.prodTime)	;
querystring +="&envelope="+ urlencode.encode(docOptions.envelope)	;
querystring +="&color="+ urlencode.encode(docOptions.color)	;
querystring +="&paperType="+ urlencode.encode(docOptions.paperType)	;
querystring +="&printOption="+ urlencode.encode(docOptions.printOption)	;
querystring +="&documentId="+ this.documentID	;
querystring +="&addressId="+ this.addressListID;

//console.log(querystring);
//return;
  
	
	var options ={
        url :  this.getRestURL()+ "/molpro/jobs/?" + querystring,
		//port: 443,
		method: 'POST',
		 headers: {
	   'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	   ,'Content-Type': 'application/x-www-form-urlencoded'
	},
//	 formData: formData
	};
   
   //console.log(options);
  

   
   
var req = request(options, function (err, resp, body) {
  if (err) {
    console.log('Error!');
  } else {
    	//parseString(body, function (err, result) {
		//console.log(batchID);
    
		     parseString(body, function (err, result) {
			//console.log(body);
				self.jobID = result.job.id.toString();
				console.log("JobID:" + self.jobID);
				if(self.jobID == 0)
				{
					console.log(body);
					return;
				}
if(this.autoProcess)
	{
				self.submitJob();
	}
	else
	{
	if(typeof callBack !== "undefined") {
	callBack();
	}
				
	});
	
	
  }
});
	
}

class_c2mAPI_rest.prototype.submitJob = function ()
{
self = this;
var urlencode = require('urlencode');
	 
 var querystring = "billingType=" + urlencode.encode("User Credit");
 

  
	
	var options ={
        url :  this.getRestURL()+ "/molpro/jobs/" +this.jobID +'/submit/?' + querystring,
		//port: 443,
		method: 'POST',
		 headers: {
	   'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	   ,'Content-Type': 'application/x-www-form-urlencoded'
	},
//	 formData: formData
	};
   
   //console.log(options);
  

   
   
var req = request(options, function (err, resp, body) {
  if (err) {
    console.log('Error!');
  } else {
    	  	
			parseString(body, function (err, result) {
		//console.log(batchID);
    
		      	
		console.log(result.job.description);
		self.checkJob();
	
	
	});
		
	
	
	
  }
});
	
}

class_c2mAPI_rest.prototype.checkJob = function (callback)
{

self = this;	
	var options ={
        url :  this.getRestURL()+ "/molpro/jobs/" +this.jobID ,
		//port: 443,
		method: 'GET',
		 headers: {
	   'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	   ,'Content-Type': 'application/x-www-form-urlencoded'
	},
//	 formData: formData
	};
   

   //console.log(options);
  

   
   
var req = request(options, function (err, resp, body) {
  if (err) {
    console.log('Error!');
  } else {
    
    
	//		console.log(body);
			
        if(typeof self.restCallBack !== "undefined") {
		self.restCallBack(self.jobID,body);
		self.restCallBack = undefined;
	}
	if(typeof callback !== "undefined") {
		callback(self.jobID,body);
	}
	
	
  }
});
	
}
class_c2mAPI_rest.prototype.checkJobTracking = function (trackType,callback)
{

self = this;	
	var options ={
        url :  this.getRestURL()+ "/molpro/jobs/" +this.jobID +"/tracking?trackingType=" + trackType,
		//port: 443,
		method: 'GET',
		 headers: {
	   'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	   ,'Content-Type': 'application/x-www-form-urlencoded'
	},
//	 formData: formData
	};
   

   //console.log(options);
  

   
   
var req = request(options, function (err, resp, body) {
  if (err) {
    console.log('Error!');
  } else {
    
    
	//		console.log(body);
			
	if(typeof callback !== "undefined") {
		callback(self.jobID,body);
	}
	
	
  }
});
	
}
class_c2mAPI_rest.prototype.checkJobTrackingUnique = function (trackType,callback)
{

self = this;	
	var options ={
        url :  this.getRestURL()+ "/molpro/jobs/" +this.jobID +"/uniqueid/tracking?trackingType=" + trackType,
		//port: 443,
		method: 'GET',
		 headers: {
	   'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	   ,'Content-Type': 'application/x-www-form-urlencoded'
	},
//	 formData: formData
	};
   

   //console.log(options);
  

   
   
var req = request(options, function (err, resp, body) {
  if (err) {
    console.log('Error!');
  } else {
    
    
	//		console.log(body);
			
	if(typeof callback !== "undefined") {
		callback(self.jobID,body);
	}
	
	
  }
});
	
}

class_c2mAPI_rest.prototype.requestUSPSReturnReceipt = function (barcode,filename,callback)
{


self = this;	
barcodeQuery = "";
  if(barcode !="undefined" && barcode !="")
  {
barcodeQuery = "barcode=" + barcode;
  }
	var options ={
        url :  this.getRestURL()+ "/molpro/jobs/" +this.jobID +"/returnReceipt?" + barcodeQuery,
		//port: 443,
		method: 'GET',
		 headers: {
	   'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	   ,'Content-Type': 'application/x-www-form-urlencoded'
	},
//	 formData: formData
	};
   

   //console.log(options);
  var f= "";
  
  if(filename !="undefined" && filename !="")
  {
	f = filename;
  }
  else if(barcode !="" && barcode != "undefined")
  {
	f=this.jobID +"_BC_"+ barcode+ ".pdf"; 
  }
  else
  {
	  f=this,jobID +".zip";
	  
  }
  
var file = fs.createWriteStream(filename);   
   
var req = request(options, function (res) {
  		res.pipe(file);
	if(typeof callback !== "undefined") {
		callback(self.jobID,"Completed Download");
	}
	
	
  
});
	
}

class_c2mAPI_rest.prototype.requestUSPSReturnReceiptUnique = function (uniqueID,filename,callback)
{

self = this;	

  
	var options ={
        url :  this.getRestURL()+ "/molpro/jobs/" +this.jobID +"/uniqueid/returnReceipt?uniqueId" + uniqueID,
		//port: 443,
		method: 'GET',
		 headers: {
	   'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.passw).toString('base64')
	   ,'Content-Type': 'application/x-www-form-urlencoded'
	},
//	 formData: formData
	};
   

   //console.log(options);
  var f= "";
  
  if(filename !="undefined" && filename !="")
  {
	f = filename;
  }
  else if(barcode !="" && barcode != "undefined")
  {
	f=this.jobID +"_UID_"+ uniqueID + ".pdf"; 
  }
  else
  {
	  f=this,jobID +".pdf";
	  
  }
  
var file = fs.createWriteStream(filename);   
   
var req = request(options, function (res) {
  		res.pipe(file);
	if(typeof callback !== "undefined") {
		callback(self.jobID,"Completed Download");
	}
	
	
  
});
	
}

module.exports = class_c2mAPI_rest;