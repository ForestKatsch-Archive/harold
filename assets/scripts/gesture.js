
function gesture_init() {
    prop.gestures={};
    prop.gestures.current=[];
    prop.gestures.recording=false;
    prop.gestures.loaded=0;
    prop.gestures.gestures={};
    gesture_load("moon");
    $("#canvas").mousedown(gesture_start);
    $("#canvas").mousemove(gesture_move);
    $("#canvas").mouseup(gesture_end);
//    loaded("gestures");
}

function gesture_start(e) {
    prop.gestures.recording=true;
    prop.gestures.current=[];
    prop.gestures.current.push([e.pageX,e.pageY]);
}

function gesture_move(e) {
    if(prop.gestures.recording)
	prop.gestures.current.push([e.pageX,e.pageY]);
}

function gesture_end(e) {
    prop.gestures.recording=false;
    prop.gestures.current.push([e.pageX,e.pageY]);
    console.log(prop.gestures.current);
}

function gesture_load_from_url(url,name) {
    var u=url;
    var n=name;
    prop.gestures.loaded+=1;
    $.getJSON(url).success(function(data) {
	console.log("Loaded gesture "+n+" from "+u);
	prop.gestures.gestures[n]={};
	prop.gestures.gestures[n].about=data;
	prop.gestures.loaded-=1;
	if(prop.gestures.loaded == 0) {
	    loaded("gestures");
	}
    }).error(function(e) {
	console.log("Failed to load "+n+": "+e.statusText);
	prop.gestures.loaded-=1;
    });
}

function gesture_load(name) {
    gesture_load_from_url(prop.network.url.root+"assets/gestures/"+name+".json",name);
}

function gesture_update() {
    
}