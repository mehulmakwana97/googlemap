(function($) {

	var googleMap = {
		init: function(params) {
			var theme = [], zoom = 15, options = {}, gMapOptions = new Array();
			if(params.theme != undefined)
				theme = params.theme;
			if(params.zoom != undefined)
				zoom = params.zoom;

			gMapOptions = {
				zoom: zoom,
				center: new google.maps.LatLng(parseFloat(params.vLat), parseFloat(params.vLong)),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: theme,
				disableDefaultUI: true,
				scrollwheel: false,
				draggable: false
			};

			near = "";
			vFrom = "";
			showNearMarker = "false";
			showMapItems = "true";
			siteMarkers = new Array();
			gMapSites = params.location;
			mapLoaded=false;

			_mapLoad(params.id, gMapSites, gMapOptions);

			if(params.disabledSelection != undefined)
				googleMap.disabledSelection(params.disabledSelection);
		},
		initFromAddress: function(params) {
			var theme = [], zoom = 15, options = {}, gMapOptions = new Array();
			if(params.theme != undefined)
				theme = params.theme;
			if(params.zoom != undefined)
				zoom = params.zoom;

			var gMapOptions = {
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true,
				scrollwheel: false,
				draggable: false,
				styles: theme
				//disableDoubleClickZoom: true
			};

			googleMap._mapLoad(params.id, params.location, gMapOptions);

			if(params.disabledSelection != undefined)
				googleMap.disabledSelection(params.disabledSelection);
		},
		_mapLoad: function(mapID, locations, vOptions) {
			var map = new google.maps.Map(document.getElementById(mapID), vOptions);

			for(var i=0; i<locations.length; i++) {
				var loc = locations[i];
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({ 'address': loc[3].replace('<br>', '') }, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: map,
							position: results[0].geometry.location,
							icon: loc[6]
						});
					}
				});
			}
		},
		location: function(params) {
			var marker = 'marker1.png', link = '/#some-link';
			if(params.marker != undefined)
				marker = params.marker;
			if(params.link != undefined)
				link = params.link;

			return [
				parseFloat(params.vLat),
				parseFloat(params.vLong),
				params.title,
				params.address,
				200,
				link,
				"/s/img/"+ marker,
				"/s/img/icons/marker-shadow1.png",
				20, 34, 36, 34, 10, 34, 10, 5
			];
		},
		disabledSelection: function(params) {
			var content = '';
			if(params.content != undefined);
				content = params.content;
			$(params.id).append('<div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1;" class="map-disabled-section">'+ content +'</div>');
			var _rightClicked = false;
			$(document).on('mousedown', '.map-disabled-section', function(e) {
				if(e.button == 0)
					$(this).css('z-index', '1');
				else if(e.button == 2) {
					$(this).css('z-index', '0');
					_rightClicked = true;
				}
			});
			$(document).on('mousemove', params.id, function() {
				_rightClicked = false;
				if(!_rightClicked) {
					$(this).find('.map-disabled-section').css('z-index', '1');
				}
			});
		}
	}

	$(document).ready(function() {

		if (typeof google === 'object') {
			if (typeof google.maps === 'object') {
				if($('#map_canvas').is(':visible')) {
					googleMap.initFromAddress(
						{
							id: "map_canvas",
							vLat: "-34.019223",
							vLong: "151.0601109",
							location:
								[
									googleMap.location(
										{
											vLat: "-34.019223",
											vLong: "151.0601109",
											title: "Community College",
											address: "address",
											marker: 'icons/location-icon.png'
										}
									)
								],
							zoom: 16,
							theme: [
								  {
									"featureType": "administrative",
									"elementType": "labels.text.fill",
									"stylers": [
									  {
										"color": "#444444"
									  }
									]
								  },
								  {
									"featureType": "administrative.country",
									"elementType": "geometry.fill",
									"stylers": [
									  {
										"visibility": "on"
									  }
									]
								  },
								  {
									"featureType": "administrative.province",
									"elementType": "labels.icon",
									"stylers": [
									  {
										"hue": "#ff0000"
									  },
									  {
										"visibility": "on"
									  }
									]
								  },
								  {
									"featureType": "landscape",
									"elementType": "all",
									"stylers": [
									  {
										"color": "#f2f2f2"
									  }
									]
								  },
								  {
									"featureType": "poi",
									"elementType": "all",
									"stylers": [
									  {
										"visibility": "off"
									  }
									]
								  },
								  {
									"featureType": "road",
									"elementType": "all",
									"stylers": [
									  {
										"saturation": -100
									  },
									  {
										"lightness": 45
									  },
									  {
										"visibility": "on"
									  }
									]
								  },
								  {
									"featureType": "road.highway",
									"elementType": "all",
									"stylers": [
									  {
										"visibility": "simplified"
									  }
									]
								  },
								  {
									"featureType": "road.arterial",
									"elementType": "labels.icon",
									"stylers": [
									  {
										"visibility": "off"
									  }
									]
								  },
								  {
									"featureType": "transit",
									"elementType": "all",
									"stylers": [
									  {
										"visibility": "on"
									  }
									]
								  },
								  {
									"featureType": "transit.line",
									"elementType": "geometry.fill",
									"stylers": [
									  {
										"color": "#88bacd"
									  }
									]
								  },
								  {
									"featureType": "water",
									"elementType": "all",
									"stylers": [
									  {
										"color": "#3973bd"
									  },
									  {
										"visibility": "on"
									  }
									]
								  },
								  {
									"featureType": "water",
									"elementType": "labels.text.stroke",
									"stylers": [
									  {
										"color": "#eaeaea"
									  }
									]
								  }
								],
							disabledSelection: {
								id: '#map_canvas',
								content: '<a href="https://www.google.co.in/maps/place/United+States/@36.2127767,-113.7083478,4z" target="_blank" tabindex="-1" style="display: block; height: 100%; outline: none;"></a>'
							}
						}
					);
				}
			}
		}
	})
})(jQuery);