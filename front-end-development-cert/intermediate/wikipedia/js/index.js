$(function() {
var searchReady = true; 
	function toggleArea() {
		if (searchReady) {
			$(".search-ready").css("display", "none");
			$(".search-results").css("display", "inline");
		} else {
			$(".search-ready").css("display", "inline");
			$(".search-results").css("display", "none");
		}
		searchReady = !searchReady;	
	}
//  var wikiApiStr1 = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';     
//  var wikiApiStr2 = '&limit=10&namespace=0&format=jsonfm';
	$('#search-button').on('click', function() {
		
		var searchString = $('#search-string').val();

		var myUrl = 'https://en.wikipedia.org//w/api.php' +
      '?callback=?' +
      '&action=opensearch' +
      '&profile=fuzzy' +
      '&limit=10' +
      '&prop=fileinfo' +
      '&format=json' +
      '&search=' +
      encodeURI(searchString);
		
		toggleArea();

		$.getJSON(myUrl ,function(data) {

			var items = [];

			items.push("</br><ul></br>");       
			for (var i = 0 ; i < data[1].length ; i++) {
				items.push('<div class = "btn-group">');
				items.push('<button class = "btn-my-rslt btn-rslt" id=' + i + '>' + data[1][i] + '</button>');
				items.push('<button class = "btn-my-rslt btn-dscrp" id=' + i + '>' + data[2][i] + '</button>');
				items.push('</div></br>');      
			} // for loop
			
			items.push("</ul>"); 
			
			$("#wikiList").html(items.join(""));
			$("#results-summary").html("Returning " + data[1].length + ' item' + ((data[1].length==1)?'':'s') + '.');
			$("#wikiList" ).on( "click", ".btn-my-rslt", function() {
				window.open(data[3][$(this).attr('id')]); 
			}); 

		}); // /ajax call
	}); // /input
		
	$('#reset-button').on('click', function() {
		toggleArea();
	});
		
	$('#random-button').on('click', function() {
		window.open('https://en.wikipedia.org/wiki/Special:Random'); 
	});	
}); // /docready