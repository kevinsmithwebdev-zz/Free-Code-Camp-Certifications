$().ready( function() {


var accounts = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
								"habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"]
var logo = 'http://i.imgur.com/vPEp5RQ.png';
var streams = 'https://api.twitch.tv/kraken/streams/';
var users = 'https://api.twitch.tv/kraken/users/';
var pulseSts = true;

var $fccStatus = $('#fcc-status');

var $streamingArea = $("#streaming-area");
var $iconArea = $("#icon-area");
var $nameArea = $("#name-area");
var $statusArea = $("#status-area");

$.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?client_id=6qo8lq2dhzoqc76h768dh8effzop1u', function(data1) {
		$fccStatus.html('<a id = "fcc-link" href = "https://www.twitch.tv/freecodecamp?" '+
					'target = "_blank">Free Code Camp is currently ' +
					statusStr('#fcc-status', data1.stream !== null) + '.');
});	// /getJSON data1


for (var i=0 ; i < accounts.length ; i++)	{

//********************************************

	function addUser(account) {
		var clientId = '?client_id=6qo8lq2dhzoqc76h768dh8effzop1u&callback=?';
		var deadLogo = 'https://image.flaticon.com/icons/png/128/96/96354.png';
		var noLogo = 'https://image.flaticon.com/icons/png/512/8/8235.png';
		$.ajax({
				type: "GET",
				url: users + account + clientId,
				dataType: "jsonp",
				success: function(data2){
					var online;

					$.getJSON('https://api.twitch.tv/kraken/streams/' + account +
										'?client_id=6qo8lq2dhzoqc76h768dh8effzop1u', function(data3) {

						if ( data3.stream !== null) {
							online = "online";
							$streamingArea.append('<p class = "data ' + online + '">' + data3.stream.game + '</p>');
						} else {
							online = "offline";
							$streamingArea.append('<p class = "data ' + online + '">&nbsp;</p>');
						} // if else
						console.log(data2.logo);
						if (data2.logo != null)
							$iconArea.append('<p class = "data ' + online + '"><img src=' + data2.logo +
											' alt="' + account + ' logo" height="42"></p>');
						else
							$iconArea.append('<p class = "data ' + online + '"><img src=' + noLogo +
										' alt="' + account + ' logo" height="42"></p>');

						$nameArea.append('<p class = "data ' + online
											+ '"><a id = "fcc-link" href = "https://www.twitch.tv/'
											+ account + '" target = "_blank">' + account + '</a></p>');
						$statusArea.append('<p class = "data ' + online + ' sts-' + online + '">' + online + '</p>');

					}); // getJSON data3
				}, // success for getJSON data2
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$iconArea.append('<p class = "data dead"><img src="' + deadLogo + '" alt="'
																 + account + ' dead logo" height="42" ></p>');
					$nameArea.append('<p class = "data dead">' + account + '</p>');
					$statusArea.append('<p class = "data dead">' + 'dead account' + '</p>');
					$streamingArea.append('<p class = "data dead">&nbsp;</p>');
				} // error for getJSON data2
		}); // JSON call data2
	} // addUser
	addUser(accounts[i]);
}	// for loop



// ****************************************************
// return status (online/offline) string and format line
function statusStr(obj, online) {
	var myStatStr;

  if (!online) {
    myStatStr = 'offline';
		$(obj).css('color', '#939393');
  } else {
    myStatStr = '<span class="sts-online">online</span>';
		$(obj).css('color', 'green');
  }
	return myStatStr;
}	// statusStr


// pulse online
function pulse() {
if (pulseSts) {
	$('.sts-online').fadeTo(200,0);
	$('.sts-online').fadeTo(200,1);
}
}
setInterval(pulse, 1000);


$('#radioBtn a').on('click', function(){
  var sel = $(this).data('title');
  var tog = $(this).data('toggle');
  $('#'+tog).prop('value', sel);

  $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
  $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');


	switch(sel) {
  case "All":
		pulseSts = true;
		$('.online').css('display', 'block');
		$('.offline').css('display', 'block');
		$('.dead').css('display', 'block');
    break;
  case "On":
		pulseSts = true;
		$('.online').css('display', 'block');
		$('.offline').css('display', 'none');
		$('.dead').css('display', 'none');
    break;
  case "Off":
		pulseSts = false;
			$('.online').css('display', 'none');
		$('.offline').css('display', 'block');
		$('.dead').css('display', 'none');
    break;
  case "Dead":
		pulseSts = false;
			$('.online').css('display', 'none');
		$('.offline').css('display', 'none');
		$('.dead').css('display', 'block');
    break;

	}
})

}); // /doc ready
