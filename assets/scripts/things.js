
function things_init() {
    prop.things={};
    prop.things.loaded=0;
    prop.things.things={};
    thing_load("moon");
//    loaded("things");
}

function thing_load_from_url(url,name) {
    var u=url;
    var n=name;
    prop.things.loaded+=1;
    $.getJSON(url).success(function(data) {
	console.log("Loaded thing "+n+" from "+u);
	prop.things.things[n]={};
	prop.things.things[n].about=data;
	prop.things.loaded-=1;
	if(prop.things.loaded == 0) {
	    loaded("things");
	}
    }).error(function(jqxhr,status,error) {
	if(status == "parsererror")
	    console.log("Failed to load "+n+" from "+u+" because of invalid JSON.");
	prop.things.loaded-=1;
	if(prop.things.loaded == 0) {
	    loaded("things");
	}
    });
}

function thing_load(thing) {
    thing_load_from_url(prop.network.url.root+"assets/things/"+thing+"/thing.json",thing);
}

function things_update() {
    
}