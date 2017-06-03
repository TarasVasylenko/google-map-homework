	function initMap() {

		var chernihiv = {lat:51.4938438, lng: 31.2999212};
		var map = new google.maps.Map(document.getElementById('map'), {
			center: chernihiv,
			zoom: 10,
	    scrollwheel: false,
	    mapTypeControl: false
	});

		$('button').on('click', function(){
			var firstInputVal = $('#firstPoint').val();
			var secondInputVal = $('#secondPoint').val();

			var firstPoint = firstInputVal.split(',');
			var secondPoint = secondInputVal.split(',');

			var firstPlace = {lat: parseFloat(firstPoint[0]), lng: parseFloat(firstPoint[1])};
			var secondPlase = {lat: parseFloat(secondPoint[0]), lng: parseFloat(secondPoint[1])};

			var marker = new google.maps.Marker({
				position: firstPlace,
				map: map   
			});

			var marker = new google.maps.Marker({
				position: secondPlase,
				map: map   
			});

			var directionsDisplay = new google.maps.DirectionsRenderer();
			var directionsService = new google.maps.DirectionsService();
			directionsDisplay.setMap(map);
			directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );

			var request = {
				origin: firstPlace,
				destination: secondPlase,
				travelMode: google.maps.TravelMode.WALKING
			};

			directionsService.route(request, function(result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
					console.log(result);
					var routes = result.routes;
					var leg = routes[0].legs;
					var lenght = leg[0].distance.text;
					var duration = leg[0].duration.text;
				}});

		});

		google.maps.event.addDomListener(window, 'resize', function() {
			var center = map.getCenter()
			google.maps.event.trigger(map, "resize")
			map.setCenter(center)
		});
	}

	$(document).ready(function(){
		initMap();
	}); 





