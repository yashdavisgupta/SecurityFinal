<?php

	header('Content-Type: application/json');
	

	
	$input = $_GET['request'];
	$secondInput = $_GET['second'];
	$thirdInput = $_GET['third'];

	switch($input)
	{
		
		case 'servers':
			$servers = array(); 

			$mysqli = new mysqli("127.0.0.1", "root", "root", "SecurityApp");
			$result = $mysqli->query("select * from servers");

			while($row = $result->fetch_array())
			{
				$temp = array('pkey' => $row['pkey'], 'name' => $row['name'], 'ip' => $row['ip']);
				array_push($servers, $temp);
			}

			$mysqli->close();
			echo json_encode($servers);
		break;

		case 'currentServer':
			$servers = array(); 

			$mysqli = new mysqli("127.0.0.1", "root", "root", "SecurityApp");
			$result = $mysqli->query("select * from currentServer");
			$row = $result->fetch_array();
			$fkey = $row['fkey'];
			$result = $mysqli->query("select * from servers where pkey='$fkey'");
			while($row = $result->fetch_array())
			{
				$temp = array('pkey' => $row['pkey'], 'name' => $row['name'], 'ip' => $row['ip']);
				array_push($servers, $temp);
			}

			$mysqli->close();
			echo json_encode($servers); 
		break;

		case 'addServer':
			$response = array(); 

			$mysqli = new mysqli("127.0.0.1", "root", "root", "SecurityApp");
			if($mysqli->query("insert into servers(name, ip) values ('$secondInput', '$thirdInput')"))
			{
				$temp = array('worked' => 'true');
				array_push($response, $temp);
			} else {
				$temp = array('worked' => $mysqli->error);
				array_push($response, $temp);
			}

			$mysqli->close();
			echo json_encode($response);
		break;

		case 'ping':
			$info = array();

			$output = shell_exec("ping -c 4 $secondInput");
			$findme = '---';
			$pos = strpos($output, $findme);
			$out = substr($output, $pos);

			$pos = strpos($out, ' ping');
			$pos = $pos - 4;
			$ip = substr($out, 4, $pos);

			$pos = $pos + 25;
			$nout = substr($out, $pos);

			$npos = strpos($nout, ' packets');
			$ptransmitted = substr($nout, 0, $npos);


			$npos = $npos + 22;
			$nout = substr($nout, $npos);
			$nnpos = strpos($nout, ' received');
			$preceived = substr($nout, 0, $nnpos);

			$nnpos = $nnpos + 11;
			$nout = substr($nout, $nnpos);
			$npos = strpos($nout, ' packet');
			$ploss = substr($nout, 0, $npos);
	
			$nout = substr($nout, $npos + 19);
			$pos = strpos($nout, 'ms');
			$time = substr($nout, 0, $pos);	

			$nout = substr($nout, 30);
			$pos = strpos($nout, '/');
			$min = substr($nout, 0, $pos);
		
			$nout = substr($nout, $pos+1);
			$pos = strpos($nout, '/');
			$avg = substr($nout, 0, $pos);

			$nout = substr($nout, $pos+1);
			$pos = strpos($nout, '/');
			$max = substr($nout, 0, $pos);

			$temp = array('ip' => $ip, 'transmitted' => $ptransmitted, 'received' => $preceived, 'lost' => $ploss, 'time' => $time, 'min' => $min, 'max' => $max, 'avg' => $avg);
			array_push($info, $temp);

			echo json_encode($info);
		break;

		case 'setCS':
			$response = array();

			$mysqli = new mysqli("127.0.0.1", "root", "root", "SecurityApp");
			//$result = $mysqli->query("update currentServer set fkey='$secondInput'");
			if($mysqli->query("update currentServer set fkey='$secondInput'"))
			{
				$temp = array('worked' => 'true');
				array_push($response, $temp);
			} else {
				$temp = array('worked' => 'false');
				array_push($response, $temp);
			}

			$mysqli->close();
			echo json_encode($response);
		break;

		default:
			echo "Nothing";
	}	

?>
