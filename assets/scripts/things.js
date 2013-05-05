
var THING_NEEDED=["name","type","physics","shape"];

var Thing=function(data) {
    this.data=data;
    for(var i=0;i<THING_NEEDED.length;i++) {
	if(!(THING_NEEDED[i] in this.data)) {
	    console.log("Thing "+this.name+" doesn't have "+THING_NEEDED[i]);
	    return;
	}
    }
    if(!("default" in data.shape)) {
	console.log("Thing "+this.name+" doesn't have the 'default' shape.");
	return;
    }
    this.type=data.type;
    this.position=data.position?data.position:[0,0];
    this.events=data.events;
    this.physics=data.physics;
    this.shape=data.shape;
    this.status="default";
    this.draw_move_to=function(i) {
	var x=u(i[1][0]);
	var y=u(i[1][1]);
	prop.canvas.context.moveTo(x,y);
    };
    this.draw_line_to=function(i) {
	var x=u(i[1][0]);
	var y=u(i[1][1]);
	prop.canvas.context.lineTo(x,y);
    };
    this.draw_arc_to=function(i) {
	var x=u(i[1][0]);
	var y=u(i[1][1]);
	var radius=u(i[2]);
	var start=radians(i[3]);
	var end=radians(i[4]);
	var backwards=false;
	if(end < start)
	    backwards=true;
	prop.canvas.context.arcTo(x,y,radius,start,end,backwards);
    };
    this.draw_stroke=function(i) {
	prop.canvas.context.stroke();
    };
    this.draw_fill=function(i) {
	prop.canvas.context.fill();
    };
    this.draw_begin=function(i) {
	prop.canvas.context.beginPath();
    };
    this.draw_rotate=function(i) {
	prop.canvas.context.rotate(radians(i[1]));
    };
    this.draw_color=function(i) {
	if(i[1] == "sky")
	    i[1]="#fff";
	prop.canvas.context.fillStyle=i[1];
	prop.canvas.context.strokeStyle=i[1];
    };
    this.draw_item=function(i) {
	if(i[0] == "line_to") {
	    this.draw_line_to(i);
	} else if(i[0] == "move_to") {
	    this.draw_move_to(i);
	} else if(i[0] == "arc_to") {
	    this.draw_arc_to(i);
	} else if(i[0] == "stroke") {
	    this.draw_stroke(i);
	} else if(i[0] == "fill") {
	    this.draw_fill(i);
	} else if(i[0] == "color") {
	    this.draw_color(i);
	} else if(i[0] == "begin") {
	    this.draw_begin(i);
	} else if(i[0] == "rotate") {
	    this.draw_rotate(i);
	}
    };
    this.draw=function() {
	if(typeof this.position == typeof []) {
	    var px=(this.position[0]/100)*prop.canvas.size.width;
	    var py=(this.position[1]/100)*prop.canvas.size.height;
	} else if(this.position == "draw") {
	    var px=this.gesture_position[0];
	    var py=this.gesture_position[1];
	}
	prop.canvas.context.save();
	prop.canvas.context.translate(px,py);
	var s=this.shape["default"];
	if(this.status in this.shape)
	    s=this.shape[this.status];
	for(var i=0;i<s.length;i++) {
	    this.draw_item(s[i]);
	}
	prop.canvas.context.restore();
    };
};

function things_init() {
    prop.things={};
    prop.things.loaded=0;
    prop.things.things={};
    prop.things.instances=[];
//    loaded("things");
}

function thing_load_from_url(url,name) {
    var u=url;
    var n=name;
    prop.things.loaded+=1;
    $.getJSON(url).success(function(data) {
	prop.things.things[n]={};
	prop.things.things[n].data=data;
	prop.things.things[n].data.thing=n;
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
    thing_load_from_url(prop.network.url.root+"assets/things/"+thing+".json",thing);
}

function thing_new(name,position) {
    if(!(name in prop.things.things)) {
	console.log("Nothing thing "+name);
	return;
    }
    var d=prop.things.things[name].data;
    var m=1;
    if(d.maximum == undefined)
	m=Infinity;
    if(m == 1) {
	for(var i=prop.things.instances.length-1;i>-1;i--) {
	    console.log(prop.things.instances[i]);
	    if(prop.things.instances[i].data.thing == name) {
		prop.things.instances.splice(i,1);
		i-=1;
	    }
	}
    }
    if(!(name in prop.things.things))
	return false;
    var t=new Thing(d);
    t.gesture_position=position;
    prop.things.instances.push(t);
}

function things_update() {
    
}