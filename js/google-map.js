const { Map } = await google.maps.importLibrary("maps");

var google;

function init() {
    // Coordinates for Butuan City, Philippines
    var myLatlng = new google.maps.LatLng(8.9492, 125.5436);

    var mapOptions = {
        // Set the zoom level appropriate for city view
        zoom: 12,

        // Center the map on Butuan City
        center: myLatlng,

        // Map customization options
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    // Get the HTML DOM element that will contain your map 
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    // Define the address for Butuan City
    var addresses = ['Butuan City, Philippines'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
            var p = data.results[0].geometry.location;
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            new google.maps.Marker({
                position: latlng,
                map: map,
                icon: 'images/loc.png'
            });

        });
    }
    
}
google.maps.event.addDomListener(window, 'load', init);
