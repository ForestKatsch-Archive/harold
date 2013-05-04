
function canvas_init() {
    prop.canvas={};
    prop.canvas.size={};
    prop.canvas.context=$("#canvas").get(0).getContext("2d");
    prop.canvas.loading={};
    prop.canvas.loading.context=$("#loading-animation").get(0).getContext("2d");
    prop.canvas.loading.rotation=0;
    prop.canvas.loading.rotation_speed=.5; // revolutions per second
    prop.canvas.loading.rotation_angle=90; // angle of arc
    $("#loading-animation").addClass("loading");
    $(window).resize(canvas_resize);
    canvas_resize();
    loaded("canvas");
    canvas_update_loading_animation();
}

function canvas_resize() {
    prop.canvas.size.width=$(window).width();
    prop.canvas.size.height=$(window).height();
    prop.canvas.context.canvas.width=prop.canvas.size.width;
    prop.canvas.context.canvas.height=prop.canvas.size.height;
    prop.canvas.loading.context.canvas.width=prop.canvas.size.width;
}

function canvas_update_loading_animation() {
    if(prop.canvas.loading.redraw == false)
	return;
    requestAnimationFrame(canvas_update_loading_animation);
    prop.canvas.loading.context.canvas.width=prop.canvas.loading.context.canvas.width;
    prop.canvas.loading.context.strokeStyle=prop.crayon.color;
    prop.canvas.loading.context.fillStyle=prop.crayon.color;
    prop.canvas.loading.context.lineWidth=prop.crayon.size;
    prop.canvas.loading.context.lineCap="round";
    prop.canvas.loading.context.line=prop.crayon.size;
    prop.canvas.loading.context.shadowBlur=prop.crayon.shadow.blur;
    prop.canvas.loading.context.shadowColor=prop.crayon.shadow.color;
    prop.canvas.loading.context.shadowOffsetX=prop.crayon.shadow.offset.x;
    prop.canvas.loading.context.shadowOffsetY=prop.crayon.shadow.offset.y;
    prop.canvas.loading.context.beginPath();
    prop.canvas.loading.context.arc(prop.canvas.loading.context.canvas.width/2,prop.canvas.loading.context.canvas.height/2,
				    prop.canvas.loading.context.canvas.height/2-10,
				    radians(prop.canvas.loading.rotation),
				    radians(prop.canvas.loading.rotation+prop.canvas.loading.rotation_angle));
    prop.canvas.loading.context.stroke();
    prop.canvas.loading.rotation+=(prop.canvas.loading.rotation_speed)*6;
}

function canvas_update() {
    if(prop.canvas.loading.redraw) {
	prop.canvas.loading.redraw=false;
    }
}