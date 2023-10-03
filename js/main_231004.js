let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let circleData = { center: new THREE.Vector2(200, 200), radius: 50 };

let boxData = { min: new THREE.Vector2(300, 300), max: new THREE.Vector2(400, 400) };

function draw_circle(data) {
    ctx.beginPath();
    ctx.arc(data.center.x, data.center.y, data.radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function draw_box(data) {
    ctx.beginPath();
    ctx.rect(data.min.x, data.min.y, data.max.x - data.min.x, data.max.y - data.min.y);
    ctx.stroke();
}

function draw_point(pt, color, size) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, size, 0, 2 * Math.PI);
    ctx.fill();
}

function is_pt_inside_circle(pt, circle) {
    return pt.distanceTo(circle.center) <= circle.radius;
}

function is_pt_inside_box(pt, box) {
    return false; //Need to write!
}

function draw_sample_point() {
    for (i = 0; i <= 500; i += 10) {
        for (j = 0; j <= 500; j += 10) {
            let pt = new THREE.Vector2(i, j);
            let color = 'black';
            let size = 1;
            if (is_pt_inside_circle(pt, circleData)) {
                color = 'blue';
                size = 2;
            }
            else if (is_pt_inside_box(pt, boxData)) {
                color = 'purple';
                size = 2;
            }
            draw_point(pt, color, size);
        }
    }
}

function draw_image() {
    ctx.strokeStyle = "blue";
    draw_circle(circleData);

    ctx.strokeStyle = "purple";
    draw_box(boxData);

    draw_sample_point();
}

//Keyboard Input
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right')
        circleData.center.x += 5;
    else if (e.key === 'ArrowLeft' || e.key === 'Left')
        circleData.center.x -= 5;
    else if (e.key === 'ArrowUp' || e.key === 'Up')
        circleData.center.y -= 5;
    else if (e.key === 'ArrowDown' || e.key === 'Down')
        circleData.center.y += 5;
}

//Animation Callback
function clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
    clear();
    draw_image();
    requestAnimationFrame(update);
}
update();
document.addEventListener('keydown', keyDown);