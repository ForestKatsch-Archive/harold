
function u(m) {
    return m*prop.canvas.scale; // meters to pixels
}

function canvas_init() {
    prop.canvas={};
    prop.canvas.anim={};
    prop.canvas.fade_timeout=null;
    prop.canvas.fade_time=300;
    prop.canvas.anim.gesture_opacity=0;
    prop.canvas.scale=48; // pixels per meter
    prop.canvas.smooth_distance=20; // distance before new line with gesture
    prop.canvas.pan=0; // horizontal pan in pixels (if(prop.canvas.pan == 0 && position == 0) centered)
    prop.canvas.size={};
    prop.canvas.context=$("#canvas").get(0).getContext("2d");
    $(window).resize(canvas_resize);
    canvas_resize();
    loaded("canvas");
}

function canvas_resize() {
    prop.canvas.size.width=$(window).width();
    prop.canvas.size.height=$(window).height();
    prop.canvas.context.canvas.width=prop.canvas.size.width;
    prop.canvas.context.canvas.height=prop.canvas.size.height;
}

function canvas_clear() {
    prop.canvas.context.clearRect(0,0,prop.canvas.size.width,prop.canvas.size.height);
    prop.canvas.context.strokeStyle=prop.crayon.color;
    prop.canvas.context.fillStyle=prop.crayon.color;
    prop.canvas.context.lineWidth=prop.crayon.size;
    prop.canvas.context.lineCap="round";
    prop.canvas.context.lineJoin="round";
    prop.canvas.context.line=prop.crayon.size;
    prop.canvas.context.shadowBlur=prop.crayon.shadow.blur;
    prop.canvas.context.shadowColor=prop.crayon.shadow.color;
    prop.canvas.context.shadowOffsetX=prop.crayon.shadow.offset.x;
    prop.canvas.context.shadowOffsetY=prop.crayon.shadow.offset.y;
}

function canvas_draw_ground() {
    prop.canvas.context.beginPath();
    prop.canvas.context.moveTo(-prop.crayon.size,prop.canvas.size.height-u(prop.world.ground.horizon_height));
    prop.canvas.context.lineTo(prop.canvas.size.width+prop.crayon.size,prop.canvas.size.height-u(prop.world.ground.horizon_height));
    prop.canvas.context.stroke();
}

function canvas_fade() {
    prop.canvas.anim.gesture_opacity-=0.01;
    if(prop.canvas.anim.gesture_opacity < 0)
	prop.canvas.anim.gesture_opacity=0;
    else
	setTimeout(canvas_fade,1000/60);
}

function canvas_draw_current() {
    if(prop.gestures.current.length <= 1)
	return;
    if(prop.gestures.recording == true) {
	clearTimeout(prop.canvas.fade_timeout);
	prop.canvas.anim.gesture_opacity=1;
    } else {
	if(prop.gestures.matched == false)
	    prop.canvas.fade_timeout=setTimeout(canvas_fade,prop.canvas.fade_time);
	else
	    canvas_fade();
    }
    prop.canvas.anim.gesture_opacity=Math.max(prop.canvas.anim.gesture_opacity,0);
    if(prop.gestures.matched == false)
	prop.canvas.context.strokeStyle="#f22";
    prop.canvas.context.globalAlpha=prop.canvas.anim.gesture_opacity;
    prop.canvas.context.beginPath();
    prop.canvas.context.moveTo(prop.gestures.current[0][0],prop.gestures.current[0][1]);
    var lp=[prop.gestures.current[0][0],prop.gestures.current[0][1]];
    var p;
    for(var i=1;i<prop.gestures.current.length-2;i++) {
	p=prop.gestures.current[i];
	if(distance(lp,p) < prop.canvas.smooth_distance && i != 1)
	    continue;
	if(i < 3)
	    continue;
	var xc=(lp[0]+p[0])/2;
	var yc=(lp[1]+p[1])/2;
	prop.canvas.context.quadraticCurveTo(lp[0],lp[1],xc,yc);
	lp=p;
    }
    if(p != undefined)
	prop.canvas.context.quadraticCurveTo(lp[0],lp[1],
					     p[0],p[1]);
    // prop.canvas.context.moveTo(prop.gestures.current[0][0],prop.gestures.current[0][1]);
    // var lp=[0,0];
    // for(var i=1;i<prop.gestures.current.length;i++) {
    // 	var p=prop.gestures.current[i];
    // 	if(distance(lp,p) < prop.canvas.smooth_distance && i != 1)
    // 	    continue;
    // 	prop.canvas.context.lineTo(p[0],p[1]);
    // 	lp=prop.gestures.current[i];
    // }
    // var p=prop.gestures.current[prop.gestures.current.length-1];
    // prop.canvas.context.lineTo(p[0],p[1]);
    prop.canvas.context.stroke();
    prop.canvas.context.globalAlpha=1;
}

function canvas_draw_elements() {
    for(var i=0;i<prop.things.instances.length;i++) {
//	prop.things.instances[i].draw();
    }
}

function canvas_draw_sky() {
    for(var i=0;i<prop.things.instances.length;i++) {
	if(prop.things.instances[i].type == "sky")
	    prop.things.instances[i].draw();
    }
}

function canvas_update() {
    canvas_clear();
    prop.canvas.context.save();
    canvas_draw_ground();
    canvas_draw_sky();
    prop.canvas.context.translate(prop.canvas.pan+prop.canvas.size.width/2,
				  prop.canvas.size.height-u(prop.world.ground.height));
    canvas_draw_elements();
    prop.canvas.context.restore();
    canvas_draw_current();
}