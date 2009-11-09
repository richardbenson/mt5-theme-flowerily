// RB Mapping Public JS Function
// Authored by Richard Benson
// Portions Copyright (c) 2008, Yahoo! Inc.
// All rights reserved.

RB.namespace("map");

RB.canvas = [];

RB.map = function() {
	var o = {
		name: "RB Mapping",
		version: "1.0.0",
		build: "1",
		
		init: function(){
			RB.map.links = RB.Dom.getElementsByClassName('map-link', 'a');	

			// If there are map link on the page
			if (RB.map.links.length > 0) {
				var gLoader = new RB.Loader();
				gLoader.addModule({
					name: "gAJAX",
					type: "js",
					fullpath: "http://www.google.com/jsapi?key=" + gAPIKey,
					varName: "google"
				});

				gLoader.require("gAJAX");
				gLoader.onSuccess = function() {
					google.load("maps", "2", {"callback":RB.map.callback});
				}
				gLoader.insert();
			}

		},
			
		callback: function() {
			if (google.maps.BrowserIsCompatible()) {
				for (i=0; i<RB.map.links.length; i++) {
				
					var strKML = RB.map.links[i].href;
					var newEl = document.createElement('div');
					newEl.id = 'canvas_' + i;
					RB.Dom.insertBefore(newEl, RB.map.links[i]);
					newEl.style.height = "300px";
					newEl.style.width = "480px";
					RB.map.links[i].geoXml = new google.maps.GeoXml(strKML);
					RB.map.links[i].geoXml.myID = i;
					//alert("add overlay");
					//RB.map.links[i].map.setCenter(RB.map.links[i].geoXml.getDefaultCenter());
					//RB.map.links[i].map.addOverlay(RB.map.links[i].geoXml);
					//alert("done add");
					google.maps.Event.addListener(RB.map.links[i].geoXml, "load", function() {
						var j = this.myID;
						if (!RB.map.links[j].loaded) {
							RB.map.links[j].map = new google.maps.Map2(document.getElementById("canvas_" + j)); 
							RB.map.links[j].map.addControl(new GSmallMapControl());
							RB.map.links[j].map.addControl(new GMapTypeControl());
							//RB.map.links[j].map.setCenter(this.getDefaultCenter()) 
							this.gotoDefaultViewport(RB.map.links[j].map);
							RB.map.links[j].map.addOverlay(this);
							RB.map.links[j].loaded = true;
						}
					});
					//, function() {
					//	this.gotoDefaultViewport(RB.map.links[i].map);
					//	RB.map.links[i].map.addOverlay(RB.map.links[i].geoXml);
					//});
					//map.addControl(new GSmallMapControl());
					//map.addControl(new GLargeMapControl());
				}
			}
		}

    }

	return o;
}();

RB.Event.onDOMReady(RB.map.init);

// Register with YAHOO object
YAHOO.register("rb-map", RB.map, {version: RB.map.version, build: RB.map.build});
