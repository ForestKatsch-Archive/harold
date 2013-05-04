
function u(m) {
    return m*prop.canvas.scale; // meters to pixels
}

function canvas_init() {
    prop.canvas={};
    prop.canvas.scale=24; // pixels per meter
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
    prop.canvas.context.line=prop.crayon.size;
    prop.canvas.context.shadowBlur=prop.crayon.shadow.blur;
    prop.canvas.context.shadowColor=prop.crayon.shadow.color;
    prop.canvas.context.shadowOffsetX=prop.crayon.shadow.offset.x;
    prop.canvas.context.shadowOffsetY=prop.crayon.shadow.offset.y;
}

function canvas_draw_ground() {
    prop.canvas.context.beginPath();
    prop.canvas.context.moveTo(-prop.crayon.size,prop.canvas.size.height-u(prop.world.ground.height));
    prop.canvas.context.lineTo(prop.canvas.size.width+prop.crayon.size,prop.canvas.size.height-u(prop.world.ground.height));
    prop.canvas.context.stroke();
}

function canvas_update() {
    canvas_clear();
    canvas_draw_ground();
}