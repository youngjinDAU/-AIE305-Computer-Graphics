// Scene, Camera, Renderer 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 750 / 750, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new THREE.OrbitControls(camera, renderer.domElement);
var cameraIndex=0;
renderer.setSize(750, 750);
document.getElementById('canv').appendChild(renderer.domElement);

function loadOBJ(url) {
    // instantiate a loader
    const loader = new THREE.OBJLoader();
    // load a resource
    loader.load(
        url, // resource URL
        // called when resource is loaded
        function (object) {
            scene.add(object);
        },
        // called when loading is in progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened');
        }
    );
}

function initLight() {
    var pointLight0 = new THREE.PointLight(0xffffff);
    pointLight0.position.set(10, 0, 10);
    scene.add(pointLight0);
}

function initGeometry() {
    const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
    scene.add(axesHelper);
    loadOBJ("../models/kitten.obj");
}

function initRenderer() {
    // 카메라 위치 설정
    camera.position.z = 1;
    controls.update();
    renderer.setClearColor("#000000");
}

function init() {
    initLight();
    initGeometry();
    initRenderer();
}

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);
    
    // Camera 이동
    // cameraIndex++;
    // camera.position.x = Math.sin(cameraIndex/100.0);
    // camera.position.z = Math.cos(cameraIndex/100.0);

    controls.update();
    renderer.render(scene, camera);
}

init();
animate();

// ---- Not used ----
//화면 크기가 변경될 때 렌더러와 카메라 조정
// window.addEventListener('resize', function() {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     renderer.setSize(width, height);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
// });