
function crayon_init() {
    prop.crayon={};
    prop.crayon.color="#828";
    prop.crayon.size=8; // diameter
    prop.crayon.shadow={};
    prop.crayon.shadow.offset={};
    prop.crayon.shadow.offset.x=0;
    prop.crayon.shadow.offset.y=1;
    prop.crayon.shadow.blur=2;
    prop.crayon.shadow.color="rgba(0,0,0,0.5)";
    loaded("crayon");
}