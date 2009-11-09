// RB Lightbox Public JS Function
// Authored by Richard Benson
// Portions Copyright (c) 2008, Yahoo! Inc.
// All rights reserved.

RB.namespace("lightbox");

RB.lightbox = function() {
	var o = {
		name: "RB lightbox",
		version: "1.2.0",
		build: "1",
		panelLoaded: false,
		
		loadImage: function(image) {
			RB.lightbox.imageEl.style.visibility = "hidden";
			RB.lightbox.imageOffScreen.src = "";
			RB.lightbox.imageOffScreen.src = image.href;
			RB.lightbox.panel.setHeader(image.title || "Lightbox");
			//RB.lightbox.navigation.description.innerHTML = (image.alt || "No description");
			RB.lightbox.navigation.description.innerHTML = (image.imageOrder + 1) + ' of ' + RB.lightbox.links.length + '<br>' + (RB.Dom.getFirstChild(image).alt || "");
			if (RB.lightbox.links.length > 1) {
				if (((image.imageOrder +1) < RB.lightbox.links.length)) {
					RB.lightbox.navigation.nextButton.button.set("disabled", false);
					RB.lightbox.navigation.nextButton.button.removeListener("click");
					RB.lightbox.navigation.nextButton.button.addListener("click", function(){RB.lightbox.loadImage(RB.lightbox.links[image.imageOrder +1])});
				} else {
					RB.lightbox.navigation.nextButton.button.set("disabled", true);
				}
				if (image.imageOrder > 0) {
					RB.lightbox.navigation.prevButton.button.set("disabled", false);
					RB.lightbox.navigation.prevButton.button.removeListener("click");
					RB.lightbox.navigation.prevButton.button.addListener("click", function(){RB.lightbox.loadImage(RB.lightbox.links[image.imageOrder -1])});
				} else {
					RB.lightbox.navigation.prevButton.button.set("disabled", true);
				}
			}
		},
		
		centerPanel: function () {
			RB.lightbox.panel.cfg.setProperty('fixedcenter', true);
		},
		
		onImageLoad: function(e) {
			var el = RB.lightbox.imageOffScreen;
			var panel = RB.lightbox.panel;
			if (el.width > 800 || el.height > 600) {
				var imageWidth = el.width;
				var imageHeight = el.height;
				var maxHeight = 600;
				var maxWidth = 800;
				var newWidth = maxWidth;
				var newHeight = (newWidth * imageHeight) / imageWidth;
				if (newHeight > maxHeight) {
					newHeight = maxHeight;
					newWidth = (newHeight * imageWidth) / imageHeight;
				}
			} else {
				newHeight = el.height;
				newWidth = el.width;
			}
			panel.cfg.setProperty('width', (newWidth + 20) + 'px');
			//panel.cfg.setProperty('height', (newHeight + 85) + 'px');
			RB.lightbox.imageEl.height = newHeight;
			RB.lightbox.imageEl.width = newWidth;
			RB.lightbox.imageEl.src = RB.lightbox.imageOffScreen.src;
			RB.lightbox.imageEl.style.visibility = "";
			panel.center();
			panel.show();
		},

		openPanel: function(e) {
			RB.Event.preventDefault(e);
			if (!RB.lightbox.panelLoaded) {
				// We need to create the lightbox panel
				RB.lightbox.panel = new YAHOO.widget.Panel("lightbox-panel", { 
					//width: "200px",
					//height: "70px",
					visible: false,
					draggable: false,
					close: true, 
					modal: true, 
					effect: {effect:YAHOO.widget.ContainerEffect.FADE, duration:0.25}
				});
				RB.lightbox.panel.setHeader("Lightbox");
				RB.lightbox.panel.setBody(RB.lightbox.imageHolder);
				RB.lightbox.imageHolder.style.backgroundImage = 'url(http://yui.yahooapis.com/2.7.0/build/assets/skins/sam/ajax-loader.gif)';
				RB.lightbox.imageHolder.style.backgroundRepeat = "no-repeat";
				RB.lightbox.imageHolder.style.backgroundPosition = "center";
				RB.lightbox.panel.setFooter(RB.lightbox.navigation);
				RB.lightbox.panel.render(document.body);
				RB.lightbox.panelLoaded = true;
				RB.lightbox.loadImage(this);
			} else {
				RB.lightbox.loadImage(this);
			}
			
		},


		init: function() {
			// First determine if there are any lightbox-links on the page
			RB.lightbox.links = YAHOO.util.Dom.getElementsByClassName('lightbox-link', 'a'); 
			
			// If there are links then we need to attach our event to them
			if (RB.lightbox.links.length > 0) {
				var panelLoader = new RB.Loader({
					require: ['container', 'animation'],
					base: RB.YUIBuildPath,
					loadOptional: false,
			
					onSuccess: function() {
				
						// Add the click listener to the links				
						RB.Event.addListener(RB.lightbox.links, "click", RB.lightbox.openPanel);
						for (i=0; i<RB.lightbox.links.length; i++) {
							RB.lightbox.links[i].imageOrder = i;
						}
						
						// Create some elements to use later
						RB.lightbox.imageHolder = document.createElement('div');
						RB.lightbox.imageEl = document.createElement('img');
						RB.lightbox.imageOffScreen = document.createElement('img');
						RB.lightbox.imageHolder.appendChild(RB.lightbox.imageEl);
						RB.Event.on(RB.lightbox.imageOffScreen, 'load', RB.lightbox.onImageLoad);
						
						RB.lightbox.navigation = document.createElement('div');
						var nav = RB.lightbox.navigation;
						nav.id = "rb-lb-footer";
						RB.Dom.setStyle(nav, 'min-height', '25px');
						RB.Dom.setStyle(nav, 'text-align', 'left');
						if (RB.lightbox.links.length >= 2) {
							nav.nextButton = document.createElement('div');
							RB.Dom.setStyle(nav.nextButton, 'float', 'right');
							nav.prevButton = document.createElement('div');
							RB.Dom.setStyle(nav.prevButton, 'float', 'right');
							nav.appendChild(nav.nextButton);
							nav.appendChild(nav.prevButton);
							var lightboxLoader = new RB.Loader({
								require: ['button'],
								base: RB.YUIBuildPath,
								loadOptional: false,
								
								onSuccess: function() {
									// Add the previous and next buttons
									nav.nextButton.button = new YAHOO.widget.Button({
										id: "nextbutton",
										type: "button",
										label: "Next",
										disabled: true,
										container: RB.lightbox.navigation.nextButton
									});
									nav.prevButton.button = new YAHOO.widget.Button({
										id: "prevbutton",
										type: "button",
										label: "Previous",
										disabled: true,
										container: RB.lightbox.navigation.prevButton
									});
								}
							});
							lightboxLoader.insert();
						}
						nav.description = document.createElement('div');
						nav.appendChild(nav.description);
					}
				});
				panelLoader.insert();
			}
			
		}
        
    }

	return o;
}();

RB.Event.onDOMReady(RB.lightbox.init);

// Register with YAHOO object
YAHOO.register("rb-lightbox", RB.lightbox, {version: RB.lightbox.version, build: RB.lightbox.build});
