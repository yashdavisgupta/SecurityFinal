
function currentServer()
{
	$.ajax({
   	 	type: "GET",
    		url: "ajax.php?request=currentServer",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",
    		success: function(data){ 
			jQuery(document).ready(function() {
				console.log("Successful JSON Response!");
				console.log(data[0].name + ", " + data[0].ip);
				jQuery('#currentServer').html('<b>Current Server</b><p>Name: ' + data[0].name + '</p><p>IP: ' + data[0].ip + '</p>');
			}); 
		},
    		failure: function(errMsg) {
        		alert(errMsg);
    		}
	});
}

function get() 
{
	$.ajax({
   	 	type: "GET",
    		url: "ajax.php?request=servers",
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",
    		success: function(data){ 
			update(data); 
		},
    		failure: function(errMsg) {
        		alert(errMsg);
    		}
	});
}

function ping(ip, id)
{
	alert(ip + ", " + id);
	$.ajax({
   	 	type: "GET",
    		url: "ajax.php?request=" + ip,
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",
    		success: function(data){ 
			jQuery(document).ready(function() {
				console.log("Successful JSON Response!");
				jQuery('#'+id).html("");
				jQuery('#'+id).append('<div id="' + id + '"> <p>Packets Transmitted: '+ data[i].transmitted + '</p> <p>Packets Received: ' + data[i].received + '</p> <p>Packets Lost: ' + data[i].lost + '</p> <p>Time: ' + data[i].time + 'ms</p> <p>Time Min: ' + data[i].min + 'ms</p> <p>Time Max: ' + data[i].max + 'ms</p> <p>Time Avg: ' + data[i].avg + 'ms</p></div>');
			}); 
		},
    		failure: function(errMsg) {
        		alert(errMsg);
    		}
	});
}

function update(response)
{
	console.log(response.length);
	console.log(response);

	jQuery(document).ready(function()
	{
		jQuery('#servers').html("");
		for(i = 0; i < response.length; i++)
		{	
			jQuery('#servers').append('<div id="'+ response[i].pkey +'"> <p>'+ response[i].name + '</p> <p>' + response[i].ip + '</p>'); 
			jQuery('#servers').append('<input type="button" value="Ping" onclick=ping("' + response[i].ip + '", "' + response[i].pkey + 'info")>');
			jQuery('#servers').append('<div id="' + response[i].pkey + 'info"></div></div>');		
		}
	});
}












