/**
 *  gmap-extra.js
 *
 */

/**
 * Creates the Map components for div with the given id and options, sets markers to the given sites.
 * @param mapID
 * @param vSites
 * @param vOptions
 * @returns {String}
 */
function _mapLoad(mapID, vSites, vOptions) {
	map = new google.maps.Map(document.getElementById(mapID), vOptions);
	_setMarkers(map, vSites);
	mapLoaded=true;
	return "success";
}

/**
 * Creates the markers for the given locations and bounds them to the given map.
 * @param map
 * @param locations
 */
function _setMarkers(map, locations) {
	//new empty array
	sites = new Array();
	//new empty bounds
	var latlngbounds = new google.maps.LatLngBounds();

	//iterate throught locations:
	for (var i = 0; i < locations.length; i++) {
		var loc = locations[i];
		var siteLatLng = new google.maps.LatLng(loc[0], loc[1]);
		//TODO var image = new google.maps.MarkerImage("path");
		//TODO var shadow = new google.maps.MarkerImage("path");

		//create marker for the location
		var marker = new google.maps.Marker({
			position : siteLatLng,
			map : map,
			//TODO shadow: shadow,
			title : loc[2],
			id : loc[4],
			suburb : loc[3],
			url : loc[5],
			icon: loc[6] //image

		});
		//create infowindow for the location
		var info = attachMessage(map, marker, infoWindowContent(marker));
		//set new item to the sites array
		sites[i] = new Array(marker, info);
		//extend the common bounds with this location
		latlngbounds.extend(siteLatLng);

	}
	//fit result bounds for all the locations
	if (sites.length > 1) {
		map.fitBounds(latlngbounds);
	}
}