
function s(i) {
    if(i == 1)
	return "";
    else
	return "s";
}

function distance(a,b) {
    var x=Math.abs(a[0]-b[0]);
    var y=Math.abs(a[1]-b[1]);
    return Math.sqrt((x*x)+(y*y));
}

function degrees(radians) {
    return (radians/(Math.PI*2))*360;
}

function radians(degrees) {
    return (degrees/360)*(Math.PI*2);
}