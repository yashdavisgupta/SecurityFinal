function load()
{
	currentServer();
	showServers();
}

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

function showServers() 
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
	$.ajax({
   	 	type: "GET",
    		url: "ajax.php?request=ping&second=" + ip,
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",
    		success: function(data){ 
			console.log("Successful JSON Response!");

			jQuery(document).ready(function() {
				jQuery('#'+id).html("");
				jQuery('#'+id).append('<div id="' + id + '"> <p>Packets Transmitted: '+ data[0].transmitted + '</p> <p>Packets Received: ' + data[0].received + '</p> <p>Packets Lost: ' + data[0].lost + '</p> <p>Time: ' + data[0].time + 'ms</p> <p>Time Min: ' + data[0].min + 'ms</p> <p>Time Max: ' + data[0].max + 'ms</p> <p>Time Avg: ' + data[0].avg + 'ms</p></div>');
			}); 
		},
    		failure: function(errMsg) {
        		alert(errMsg);
    		}
	});
}

function setCurrentServer(pkey)
{
	$.ajax({
   	 	type: "GET",
    		url: "ajax.php?request=setCS&second=" + pkey,
    		contentType: "application/json; charset=utf-8",
    		dataType: "json",
    		success: function(data){ 
			console.log("Worked - " + data[0].worked);
			currentServer(); 
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
			
			var str1 = '<input type="button" value="Ping" style="display: inline;" onclick="ping(\'';
			str1 = str1.concat(response[i].ip);
			str1 = str1.concat('\', \'');
			str1 = str1.concat(response[i].pkey);
			str1 = str1.concat('info\')">');
			console.log(str1);
			jQuery('#'+response[i].pkey).append(str1);
			jQuery('#'+response[i].pkey).append('<input type="button" value="Select Server" style="display: inline;" onclick="setCurrentServer('+ response[i].pkey +')">');
			jQuery('#'+response[i].pkey).append('<div id="' + response[i].pkey + 'info"></div></div>');		
		}
	});
}












