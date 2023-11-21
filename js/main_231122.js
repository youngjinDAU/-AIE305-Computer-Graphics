// Scene, Camera, Renderer 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 750 / 750, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new THREE.OrbitControls(camera, renderer.domElement);
var cameraIndex=0;
renderer.setSize(750, 750);
document.getElementById('canv').appendChild(renderer.domElement);

var gui = new dat.GUI();
var torus;
//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
const pointLight0 = new THREE.PointLight(0xff9000, 0.9, 15, 3);
const pointLightHelper = new THREE.PointLightHelper(pointLight0, 1);

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
    scene.add(ambientLight);
    pointLight0.position.set(-2, -2, 2);
    scene.add(pointLight0);
    scene.add(pointLightHelper);
}

function initGeometry() {
    const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);

  var material0 = new THREE.MeshLambertMaterial({ color: "#ffffff", side: THREE.DoubleSide });
  var geometryPlane = new THREE.PlaneGeometry(10, 10);
  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(-5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(-5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);



  var material1 = new THREE.MeshPhongMaterial({ color: "#ff0000" });
  var geoCube = new THREE.BoxGeometry();
  var cube = new THREE.Mesh(geoCube, material1);
  cube.castShadow = true;
  cube.translateX(-1.0);
  cube.translateY(-1.0);
  cube.translateZ(0.5);
  scene.add(cube);

  var material2 = new THREE.MeshNormalMaterial();
  var geoTorus = new THREE.TorusGeometry(0.5, 0.2);
  torus = new THREE.Mesh(geoTorus, material2);
  torus.castShadow = true;
  torus.translateX(1.0);
  torus.translateY(1.0);
  torus.translateZ(0.5);
  scene.add(torus);

  var material3 = new THREE.MeshStandardMaterial({ color: "#fed136" });
  var geoCone = new THREE.ConeGeometry(0.5, 1);
  var cone = new THREE.Mesh(geoCone, material3);
  cone.translateX(1.0);
  cone.translateY(-1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);

  var material4 = new THREE.MeshPhysicalMaterial({ color: "#3333cc" });
  var geoCone = new THREE.SphereGeometry(0.5);
  var cone = new THREE.Mesh(geoCone, material4);
  cone.translateX(-1.0);
  cone.translateY(1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);
}

function initRenderer() {
    // 카메라 위치 설정
    camera.position.z = 10;
    controls.update();
    renderer.setClearColor("#000000");
}

function initGUI() {
    gui.add(ambientLight, "visible").name("Ambient Light");
    gui.add(pointLight0, "visible").name("Point Light");
  
    gui.add(ambientLight, "intensity", 0, 1.0);
    
    const pointFolder = gui.addFolder('PointLight')
    pointFolder.add(pointLight0.position, 'x', -10, 10);
    pointFolder.add(pointLight0.position, 'y', -10, 10);
    pointFolder.add(pointLight0.position, 'z', -10, 10);
    pointFolder.add(pointLight0, 'distance', 0, 100);
    pointFolder.add(pointLight0, 'decay', 0, 10);
  
    const torusFolder = gui.addFolder('torus')
    torusFolder.add(torus.position, 'x', -10, 10);
    torusFolder.add(torus.position, 'y', -10, 10);
    torusFolder.add(torus.position, 'z', -10, 10);
  }

function init() {
    initLight();
    initGeometry();
    initRenderer();
    initGUI();
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