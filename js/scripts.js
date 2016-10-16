function ViewPortHeightCenter() {
    var vph = $(window).innerHeight();
    var elementHeight = $("#vph-center").height();
    var marginTop = (vph / 2) - (elementHeight / 2);
    $("#vph-center").css("margin-top", marginTop + "px");
    $("body.home").height(vph);
}

$(document).ready(function () {
    ViewPortHeightCenter();
    $(".home-form").hide();
    $(".city-select").hide();
    $(".people").hide();

    document.getElementById("image-upload").onchange = function () {
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            $(".photo-upload").css("background-image", "url(" + e.target.result + ")");
            $(".photo-upload>p").hide();
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };
})

$(window).resize(function () {
    ViewPortHeightCenter();
})

var loginOpen = false;
var signUpOpen = false;

function OpenLogin() {

    if (loginOpen) {
        return false;
    } else if (signUpOpen) {
        $("#sign-up").hide();
        $("#log-in").show()
        loginOpen = true;
        signUpOpen = false;
    } else {
        $("#log-in").show();
        loginOpen = true;
    }
}

function OpenSignup() {
    if (signUpOpen) {
        return false;
    } else if (loginOpen) {
        $("#log-in").hide();
        $("#sign-up").show()
        loginOpen = false;
        signUpOpen = true;
    } else {
        $("#sign-up").show();
        signUpOpen = true;
    }
}

function setlocation(location) {
    $("#location-value").val(location);
    $(".city-select").hide();
    $("#location-value").show();
}

function opencities() {
    $(".city-select").show();
    $("#location-value").hide();

}


/* Map*/

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.850033,
            lng: -93.650052
        },
        zoom: 4,
        mapTypeId: 'roadmap'
    });
    var input = document.getElementById('location');
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        var place = places[0];

        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var icon = {
            url: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
        }));

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        };
        map.fitBounds(bounds);
    });
}

var mapLat;
var mapLng;
var mapZoom;
var markers = [];

function SetMapCoords(lat, lng, zoom) {
    mapLat = lat;
    mapLng = lng;
    mapZoom = zoom;

}

function InitMap() {
    var location = new google.maps.LatLng(mapLat, mapLng);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: mapZoom
    });
    var icon = {
        url: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        position: location
    }));
}


/* Show People */

var peopleshowing = false;

function showpeople() {
    if (peopleshowing) {
        $(".people").hide();
        peopleshowing = false;
    } else {
        peopleshowing = true;


        $(".people").show();
    }

}