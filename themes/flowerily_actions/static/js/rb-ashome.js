// RB Action Streams Home Page
// (c) 2009 Richard Benson.
// Portions Copyright (c) 2008, Yahoo! Inc.
// All rights reserved.

RB.namespace("ashome");

RB.ashome = function() {
	var o = {
		name: "RB Action Stream Home Page",
		version: "1.0.0",
		build: "3",
    	
		init: function() {
			if (RB.Dom.inDocument('action-stream-homepage')) {
				var photoLoader = new RB.Loader({
					require: ['carousel', 'animation'],
					base: RB.YUIBuildPath,
					loadOptional: true,
			
					onSuccess: function() {
						var carousel = new YAHOO.widget.Carousel("home-photos", {
							// specify number of columns and number of rows
							numVisible: 6,
							autoPlayInterval: 5000,
							isCircular: true,
							revealAmount: 50
						});
						carousel.set("animation", { speed: 1 });
						carousel.render(); // get ready for rendering the widget
						carousel.startAutoPlay();
					}
				});
				photoLoader.insert();
			}
		}
        
    }

	return o;
}();

RB.Event.onDOMReady(RB.ashome.init);

// Register with YAHOO object
YAHOO.register("rb-ashome", RB.ashome, {version: RB.ashome.version, build: RB.ashome.build});
