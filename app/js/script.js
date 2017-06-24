function displayReponse()
{
	var tmp = document.getElementById("input").value;
	var request = webOS.service.request("luna://com.yourdomain.helloworldservice.service/", {
		method:"hello",
		parameters: {name: tmp},	
		onFailure: showFailure,
		onComplete: showResponse,
	//	subscribe = false,
	//	resubscribe = false
	});
}

function showResponse(inResponse)	{
	if(inResponse.returnValue) {
		document.getElementById("result1").innerHTML = inResponse.data;		
		document.getElementById("result2").innerHTML = "Service Responded";		
	}
	else {
		document.getElementById("result1").innerHTML = "Failed!";
	}
	return true;
}

function showFailure(inError){
	document.getElementById("result1").innerHTML = "Failed!";
}