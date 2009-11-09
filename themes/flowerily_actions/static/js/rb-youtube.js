// RB YouTube Public JS Function
// Authored by Richard Benson
// Portions Copyright (c) 2008, Yahoo! Inc.
// All rights reserved.

RB.namespace("youtube");

RB.youtube = function() {
	var o = {
		name: "RB youtube",
		version: "1.0.0",
		build: "1",
		panelLoaded: false,
		
        clearVideo: function() {
			RB.youtube.panel.setBody("");
		},
		
		loadVideo: function(strYTID, strTitle) {
			RB.youtube.panel.setHeader(RB.youtube.currentVideo.title);
			RB.youtube.panel.setBody("<object width='534' height='300'><param name='movie' value='http://www.youtube.com/v/" + RB.youtube.currentVideo.id + "&hl=en&fs=0&rel=0&autoplay=1'></param><param name='allowFullScreen' value='false'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/" + RB.youtube.currentVideo.id + "&hl=en&fs=0&rel=0&autoplay=1' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='false' width='534' height='300'></embed></object>");
		},
		
		currentVideo: {
			id: "",
			title: ""
		},
		
		openPanel: function(e) {
			RB.Event.preventDefault(e);
			var strYTID = this.href.replace("http://www.youtube.com/watch?v=", "");
			var strTitle = this.title;
			if (!RB.youtube.panelLoaded) {
				// Load up the SWF object
				var SWFLoader = new RB.Loader();
				
				SWFLoader.require("dragdrop");
				SWFLoader.require('container');
				SWFLoader.require('button');
				SWFLoader.onSuccess = function() {
					// We need to create the youtube panel
					RB.youtube.panel = new YAHOO.widget.Panel("panel2", { 
						width: "555px",
						height: "352px",
						visible: false,
						draggable: true,
						close: true, 
						modal: false,
						fixedcenter: true,
						constraintoviewport: true
					});
					RB.youtube.panel.setHeader(strTitle);
					RB.youtube.panel.setBody("<object width='534' height='300'><param name='movie' value='http://www.youtube.com/v/" + strYTID + "&hl=en&fs=0&rel=0&autoplay=1'></param><param name='allowFullScreen' value='false'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/" + strYTID + "&hl=en&fs=0&rel=0&autoplay=1' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='false' width='534' height='300'></embed></object>");
					RB.youtube.panel.render(document.body);
					RB.youtube.panelLoaded = true;
					
					RB.youtube.currentVideo.id = strYTID;
					RB.youtube.currentVideo.title = strTitle;
					RB.youtube.panel.hideEvent.subscribe(function(){
						RB.youtube.clearVideo();
					});
					RB.youtube.panel.show();
				}
				
				SWFLoader.insert();
				
				
			} else {
				RB.youtube.currentVideo.id = strYTID;
				RB.youtube.currentVideo.title = strTitle;
				RB.youtube.loadVideo();
				RB.youtube.panel.show();
			}
			
		},
		
		init: function() {
			// First determine if there are any youtube-links on the page
			RB.youtube.links = YAHOO.util.Dom.getElementsByClassName('youtube-link', 'a'); 
			
			// If there are links then we need to attach our event to them
			if (RB.youtube.links.length > 0) {
				// Add the click listener to the links				
				RB.Event.addListener(RB.youtube.links, "click", RB.youtube.openPanel);
			}
		}	
        
    }

	return o;
}();

RB.Event.onDOMReady(RB.youtube.init);

// Register with YAHOO object
YAHOO.register("rb-youtube", RB.youtube, {version: RB.youtube.version, build: RB.youtube.build});
