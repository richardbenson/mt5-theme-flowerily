// RB Animation Public JS Function
// Authored by Richard Benson
// Portions Copyright (c) 2008, Yahoo! Inc.
// All rights reserved.

RB.namespace("anim");

RB.anim = function() {
	var o = {
		name: "RB animation",
		version: "1.0.0",
		build: "3",
    	
        opacity: 96,
        slowly: {
        	fade : function (id) {
        		this.fadeLoop(id, opacity);
        	},
        	fadeLoop : function (id, opacity) {
        		var o = document.getElementById(id);
        		if (opacity >= 5) {
        			slowly.setOpacity(o, opacity);
        			opacity -= 4;
        			window.setTimeout("slowly.fadeLoop('" + id + "', " + opacity + ")", 50);
        		} else {
        			o.style.display = "none";
        		}
        	},
        	setOpacity : function (o, opacity) {
        		o.style.filter = "alpha(style=0,opacity:" + opacity + ")";	// IE
        		o.style.KHTMLOpacity = opacity / 100;				// Konqueror
        		o.style.MozOpacity = opacity / 100;					// Mozilla (old)
        		o.style.opacity = opacity / 100;					// Mozilla (new)
        	}
        }
        
    }

	return o;
}();

// Register with YAHOO object
YAHOO.register("rb-anim", RB.anim, {version: RB.anim.version, build: RB.anim.build});
