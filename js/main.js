let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

function drawBox(p0, width, height,color) {
  ctx.fillStyle = color;
  ctx.fillRect(p0.x, p0.y, width, height);
}

boxMinPt = new THREE.Vector2(100,100);
drawBox(boxMinPt,100,100,"red");