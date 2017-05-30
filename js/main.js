	function initMap() {

		var chernihiv = {lat:51.4938438, lng: 31.2999212};
		var map = new google.maps.Map(document.getElementById('map'), {
			center: chernihiv,
			zoom: 10,
	    scrollwheel: false,
	    mapTypeControl: false
	});

		$('button').on('click', function(){
			var firstPointLet = parseFloat($('#firstPoint').val().substring( 0, 10 ));
			var firstPointLng = parseFloat($('#firstPoint').val().substring( 10, 20 ));
			var secondPointLet = parseFloat($('#secondPoint').val().substring( 0, 10 ));
			var secondPointLng = parseFloat($('#secondPoint').val().substring( 10, 20 ));
			
			var firstPlace = {lat: firstPointLet, lng: firstPointLng};
			var secondPlase = {lat: secondPointLet, lng: secondPointLng};

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





