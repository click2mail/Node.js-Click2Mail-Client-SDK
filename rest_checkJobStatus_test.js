var c2mAPIRest = require('./class_c2mAPI_rest.js');
//CHANGE "Stage" TO "Live" to go to production
var c2m = new c2mAPIRest('username','password','Stage');

var myJobId = 1234;
checkRestJobStatus(myJobId);

function checkRestJobStatus(id)
{
	c2m.jobID = id
	c2m.checkJob(output);
}
function output(id,body)
{
console.log(body);
}