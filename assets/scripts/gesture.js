
function gesture_init() {
    prop.gestures={};
    prop.gestures.min_score=.65;
    prop.gestures.dollar={};
    prop.gestures.dollar.recognizer=new DollarRecognizer();
    prop.gestures.current=[];
    prop.gestures.recording=false;
    prop.gestures.matched=true;
    prop.gestures.loaded=0;
    prop.gestures.gestures={};
    $("#canvas").mousedown(gesture_start);
    $("#canvas").mousemove(gesture_move);
    $("#canvas").mouseup(gesture_end);
//    loaded("gestures");
}

function gesture_start(e) {
    prop.gestures.recording=true;
    prop.gestures.matched=true;
    prop.gestures.current=[];
    prop.gestures.current.push([e.pageX,e.pageY]);
}

function gesture_move(e) {
    if(prop.gestures.recording)
	prop.gestures.current.push([e.pageX,e.pageY]);
}

function gesture_recognize() {
    if (prop.gestures.current.length >= 10) {
	var result=prop.gestures.dollar.recognizer.Recognize(to_points(prop.gestures.current),false);
	if(result.name == false) {

	} else if(result.score < prop.gestures.min_score) {
	    prop.gestures.matched=false;
	    console.log("Didn't match.");
	} else {
	    prop.gestures.matched=true;
	    console.log("Matched "+result.name+"; "+Math.round(result.score*100)+"% score");
	    var ax=0;
	    var ay=0;
	    for(var i=0;i<prop.gestures.current.length;i++) {
		ax+=prop.gestures.current[i][0];	
		ay+=prop.gestures.current[i][1];
	    }
	    ax/=prop.gestures.current.length;
	    ay/=prop.gestures.current.length;
	    thing_new(result.name,[ax,ay]);
	}
	var points=prop.gestures.current;
	var t="[";
	for(var i=0;i<points.length-1;i++) {
	    t+="["+points[i][0]+","+points[i][1]+"], ";
	}
	t+="["+points[points.length-1][0]+","+points[points.length-1][1]+"]]\n";
	console.log(t);
    } else {
	console.log("Too few points.");
    }
}

function gesture_end(e) {
    prop.gestures.recording=false;
    prop.gestures.current.push([e.pageX,e.pageY]);
    gesture_recognize();
}

function gesture_load_from_url(url,name) {
    var u=url;
    var n=name;
    prop.gestures.loaded+=1;
    $.getJSON(url).success(function(data) {
	prop.gestures.gestures[n]={};
	prop.gestures.gestures[n].about=data;
	prop.gestures.gestures[n].thing=data.thing;
	prop.gestures.gestures[n].points=data.points;
	if(data.points.length == 0) {
	    console.log("No gesture for "+data.name);
	} else {
	    prop.gestures.dollar.recognizer.AddGesture(data.thing,to_points(data.points));
	}
	prop.gestures.loaded-=1;
	if(prop.gestures.loaded == 0) {
	    loaded("gestures");
	}
    }).error(function(e) {
	console.log("Failed to load "+n+": "+e.statusText);
	prop.gestures.loaded-=1;
	if(prop.gestures.loaded == 0) {
	    loaded("gestures");
	}
    });
}

function gesture_load(name) {
    gesture_load_from_url(prop.network.url.root+"assets/gestures/"+name+".json",name);
}

function gesture_update() {
    
}