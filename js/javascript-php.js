/* Raspberry Tank Web UI JavaScript
   Written by Ian Renton (http://ianrenton.com), February 2013
   Released into the public domain without licence. */

// Executes on page load.
function load() {
  createImageLayer();
  setInterval(updateSensorData, 1000);
}

// Executes on page load.
function loadnoimage() {
  setInterval(updateSensorData, 1000);
}

// Sets a command to either true or false by name, e.g. to go forwards use
// set('forwards', true) and to stop going forwards, use set('forwards', false).
function set(name, value) {
  send(name);
  return true;
}

// Toggles the state of autonomy.
function toggleAutonomy() {
  if (command['autonomy'] == true) {
    command['autonomy'] = false;
    $('span.autonomystate').html("OFF");
    $('span.autonomybutton').html("Switch ON");
  } else {
    command['autonomy'] = true;
    $('span.autonomystate').html("ON");
    $('span.autonomybutton').html("Switch OFF");
  }
  send();
}

// Set all commands to false, in case there's been a glitch and something is
// stuck on.
function stop() {
  send( 'stop' )
}

// Send the current command set to the vehicle.
function send( name ) {
  $.get(window.location.protocol+'//'+window.location.host + '//robot//' + "control.php" + "?set" + name);
}

// Gets the sensor data
function updateSensorData() {
  $.get(window.location.protocol+'//'+window.location.host + "/tmp/sensordata.txt", "", function(data){
    if (data != "") {
      data = data.replace(/^[\r\n]+|[\r\n]+$/g, "");
      //arr = data.split(' ');
      $('div.data').html(data);
      //$('div.data').html("<h1>" + data + "</h1>");
      arr = data.split(' ');

      if ((arr[3] != 'LH0') && (arr[5] != 'LL0')) {
	document.getElementById('left').style.background='red';
      } else { 
      	if (arr[3] != 'LH0'){
		document.getElementById('left').style.background='yellow'; 
	} else {
		document.getElementById('left').style.background='gray'; 
	}
      }

      if ((arr[4] != 'RH0') && (arr[6] != 'RL0')) {
	      document.getElementById('right').style.background='red';
      } else { 
        if (arr[4] != 'RH0') {
	      document.getElementById('right').style.background='yellow';
        } else { 
	      document.getElementById('right').style.background='gray'; 
        }
      }

	//arr[6] = 'RL1';

      if ((arr[5] != 'LL0') && (arr[6] != 'RL0')) {
	      document.getElementById('fwd').style.background='red';
      } else { 
      if ((arr[3] != 'LH0') && (arr[4] != 'RH0')) {
	      document.getElementById('fwd').style.background='yellow';
        } else { 
	      document.getElementById('fwd').style.background='gray'; 
        }
      }


      if (arr[7] != 'B0') {
	      document.getElementById('back').style.background='yellow';
      } else { 
	      document.getElementById('back').style.background='gray';
      }

    }
    else {
      $('div.data').html("<h1>-</h1>");
    }
  }, "html");
}
