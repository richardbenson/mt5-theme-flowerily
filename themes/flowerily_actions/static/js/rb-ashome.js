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
					require: ['carousel', 'animation', 'paginator'],
					base: RB.YUIBuildPath,
					loadOptional: true,
			
					onSuccess: function() {
						var carousel = new YAHOO.widget.Carousel("home-photos", {
							// specify number of columns and number of rows
							numVisible: [ 6, 2 ],
							autoPlayInterval: 5000,
							isCircular: true,
							revealAmount: 20
						});
						carousel.set("animation", { speed: 2 });
						var numItems = carousel.get("numItems");
						var numVisible = carousel.get("numVisible");
						var paginator = new YAHOO.widget.Paginator({
						  containers: "photo-pager",
						  rowsPerPage: 1,
						  template: "{PreviousPageLink} {PageLinks} {NextPageLink}",
						  totalRecords: Math.ceil(numItems / numVisible)
						});
						paginator.subscribe("changeRequest", function (state) {
						  // set the selectedItem so that the Carousel scrolls to the page automatically
						  carousel.set("selectedItem", (state.page - 1) * numVisible);
						  paginator.setState(state);
						  carousel.stopAutoPlay();
						});
						carousel.on("pageChange", function (page) {
						  // Paginator's page begins from 1
						  // Also, we need to suppress this triggering a changeRequest event.
						  paginator.setPage(page + 1, true);
						});
						carousel.render();
						paginator.render();
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
