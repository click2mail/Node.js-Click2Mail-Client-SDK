var c2mAPIRest = require('./class_c2mAPI_rest.js');
//CHANGE "Stage" TO "Live" to go to production
var c2m = new c2mAPIRest('username','password','Stage');

	var address1 =  {
            "First_name": 'john',
            "Last_name": 'smith',
			"Organization": '',
			"Address1": '1234 test st',
			"Address2": 'apt 2',
			"City": 'oak brook',
			"State": 'il',
			"zip": '60523',
			"Country_non-US": country,
        }

	var address2 =  {
            "First_name": 'john',
            "Last_name": 'smith',
			"Organization": '',
			"Address1": '1234 test st',
			"Address2": 'apt 2',
			"City": 'oak brook',
			"State": 'il',
			"zip": '60523',
			"Country_non-US": country,
        }		var ar = new Array();
		
		ar.push(address1);
		ar.push(address2);
		var addressMappingId = 2;
		c2m.setAddressList(ar,addressMappingId,startProcessingRest);



function startProcessingRest()
{
	/*Unique pdf name for click2mail*/
	id = c2m.guid() + ".pdf";
					//(pdfFile,docName,docClass,docFormat,contentType,layout,prodTime,envelope,color,paperType,printOption)
	c2m.createRestJob("test.pdf",id,"Letter 8.5 x 11","PDF","application/PDF","Address on First Page","Next Day","#10 Double Window","Full Color","White 24#","Printing both sides",completedJob)
}