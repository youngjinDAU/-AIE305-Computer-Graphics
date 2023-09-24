let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//Make data
let linePts = [];
linePts.push(new THREE.Vector2(50, 50));
linePts.push(new THREE.Vector2(450, 450));

linePts.push(new THREE.Vector2(50, 250));
linePts.push(new THREE.Vector2(300, 50));

function draw_line(p0, p1) {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

function draw_point(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function draw_image()
{
    ctx.strokeStyle = "blue";
    draw_line(linePts[0], linePts[1]);
    ctx.strokeStyle = "red";
    draw_line(linePts[2], linePts[3]);

    ctx.fillStyle = "green"
    line_line_intersection(linePts[0],linePts[1],linePts[2],linePts[3]);
}

function line_line_intersection(p0, p1, p2, p3) {

    // y=ax+b : 직선의 방정식
    // a:기울기 : y증가량 / x증가량
    // y=a0x+b0            
    let a0 = (p1.y - p0.y) / (p1.x - p0.x);
    let b0 = p0.y - a0 * p0.x;

    // y=a1x+b1
    let a1 = (p3.y - p2.y) / (p3.x - p2.x);
    let b1 = p2.y - a1 * p2.x;

    //직선의 교점? a0x+b0=a1x+b1 --> (a0-a1)x = b1 -b0
    let intersectionX = (b1 - b0) / (a0 - a1);
    let intersectionY = a0 * intersectionX + b0;

    console.log(intersectionX);
    console.log(intersectionY);

    let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    draw_point(intersectionPt);
}

//Keyboard Input
function keyDown(e) {
    let xValue = 0, yValue = 0;
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        xValue += 5;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        xValue -= 5;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        yValue -= 5;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        yValue += 5;
    }

    linePts[2].x = linePts[2].x;
    linePts[3].x = linePts[3].x + xValue;
    linePts[2].y = linePts[2].y;
    linePts[3].y = linePts[3].y + yValue;
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