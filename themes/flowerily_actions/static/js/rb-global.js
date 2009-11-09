// Global and universal object for all RB JS operations
// Requires yuiloader-dom-event.js to be loaded
// (c) 2008 Richard Benson
// Portions Copyright (c) 2008, Yahoo! Inc.
// All rights reserved.

// Create root object if it doesn't exist
if (typeof RB == "undefined" || !RB) {
    var RB = {};
}

RB.name = "RBs Global object";
RB.version = "1.2.0";
RB.build = "1";
RB.YUIVersion = "2.8.0r4";

// Function to aid in making new namespaces
RB.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=RB;

        // RB is implied, so it is ignored if it is included
        for (j=(d[0] == "RB") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }

    return o;
}

// Pull global vars into our object
if (typeof RBBasePath == "undefined") {
	RB.basePath = "http://www.richardbenson.co.uk/js/1.2/";
} else { 
	RB.basePath = RBBasePath;
	RBBasePath = undefined;
};
if (typeof YUIBuildPath == "undefined") {
	RB.YUIBuildPath = "http://yui.yahooapis.com/2.8.0r4/build/";
} else {
	RB.YUIBuildPath = YUIBuildPath;
	YUIBuildPath = undefined;
};
if (!(typeof RBModules == "undefined")) {
	RB.required = RBModules;
	RBModules = undefined;
};

// Check if the YAHOO object is available, if it is then re-use some elements
if (typeof YAHOO == "object") {
	RB.Loader = YAHOO.util.YUILoader;
	RB.Dom = YAHOO.util.Dom;
	RB.Event = YAHOO.util.Event;
} else {
	alert("YUI not loaded, functions will be impaired and other errors may occur.");
}


// Define the modules available
RB.module = {
	youtube: {
		friendlyName: "YouTube Video Panel",
		fileName: "rb-youtube.js"
	},
	
	anim: {
		friendlyName: "Animation",
		fileName: "rb-anim.js"
	},
	
	lightbox: {
		friendlyName: "Lightbox",
		fileName: "rb-lightbox.js"
	},
	
	map: {
		friendlyName: "Map",
		fileName: "rb-map.js"
	},

	ashome: {
		friendlyName: "Action Stream Home",
		fileName: "rb-ashome.js"
	}
	
}

RB.loadModules = function() {
	var moduleLoader = new RB.Loader();
	
	for (i = 0; i < RB.required.length; i++) {
		curr = RB.required[i];
		moduleLoader.addModule({
			name: "rb-" + RB.required[i],
			type: "js",
			fullpath: RB.basePath + RB.module[RB.required[i]].fileName
		});
		moduleLoader.require("rb-" + RB.required[i]);
	};
	
	moduleLoader.insert();
};

RB.init = function() {

	// Add the yui skin class to the body
	RB.Dom.addClass(document.body, 'yui-skin-sam');

    // Load the modules requested
    if (!typeof RB.required == "undefined" || RB.required) {
		RB.loadModules();
    }
	
};

RB.Event.onDOMReady(RB.init);

YAHOO.register("rb-global", RB, {version: RB.version, build: RB.build});