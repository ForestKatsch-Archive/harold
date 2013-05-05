
var THINGS=["moon"];
var GESTURES=["moon_crescent"];

function load_init() {
    // dummy function to load all assets
    for(var i=0;i<THINGS.length;i++)
	thing_load(THINGS[i]);
    for(var i=0;i<GESTURES.length;i++)
	gesture_load(GESTURES[i]);
    loaded("load");
}