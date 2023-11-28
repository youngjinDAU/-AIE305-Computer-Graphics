import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as CANNON from 'cannon-es'
import CannonUtils from 'CannonUtils'
import CannonDebugRenderer from 'CannonDebugRenderer'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 750 / 750, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
const world = new CANNON.World();
const gui = new GUI();
const stats = Stats();
const clock = new THREE.Clock();
const cannonDebugRenderer = new CannonDebugRenderer(scene, world);

document.getElementById('canv').appendChild(renderer.domElement);
document.body.appendChild(stats.dom);

const normalMaterial = new THREE.MeshNormalMaterial();
const phongMaterial = new THREE.MeshPhongMaterial();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMesh = new THREE.Mesh(cubeGeometry, normalMaterial);
const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
const cubeBody = new CANNON.Body({
        mass: 1
});
const sphereGeometry = new THREE.SphereGeometry();
const sphereMesh = new THREE.Mesh(sphereGeometry, normalMaterial);
const sphereShape = new CANNON.Sphere(1);
const sphereBody = new CANNON.Body({
        mass: 1
});
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 8);
const cylinderMesh = new THREE.Mesh(cylinderGeometry, normalMaterial);
const cylinderShape = new CANNON.Cylinder(1, 1, 2, 8)
const cylinderBody = new CANNON.Body({
        mass: 1
});
const torusKnotGeometry = new THREE.TorusKnotGeometry();
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, normalMaterial);
const torusKnotShape = CannonUtils.CreateTrimesh(torusKnotMesh.geometry);
const torusKnotBody = new CANNON.Body({
        mass: 1
});
const planeGeometry = new THREE.PlaneGeometry(25, 25);
const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial);
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
        mass: 0
});
var modelMesh;
var modelBody;

var modelLoaded = false;
function loadOBJ(url) {
        // instantiate a loader
        const loader = new OBJLoader();
        // load a resource
        loader.load(
            url, // resource URL
            // called when resource is loaded
            function (object) {
                scene.add(object)
                modelMesh = object.children[0]
                modelMesh.material = normalMaterial
                modelMesh.position.x = -2
                modelMesh.position.y = 20

                const monkeyShape = CannonUtils.CreateTrimesh(modelMesh.geometry)
                
                modelBody = new CANNON.Body({
                        mass: 1
                })

                modelBody.addShape(monkeyShape)
                modelBody.position.x = modelMesh.position.x
                modelBody.position.y = modelMesh.position.y
                modelBody.position.z = modelMesh.position.z
                world.addBody(modelBody)
                scene.add(object);
                modelLoaded = true;
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

function initGUI(){
        const physicsFolder = gui.addFolder('Physics');
        physicsFolder.add(world.gravity, 'x', -10.0, 10.0, 0.1);
        physicsFolder.add(world.gravity, 'y', -10.0, 10.0, 0.1);
        physicsFolder.add(world.gravity, 'z', -10.0, 10.0, 0.1);
        physicsFolder.open();
        
}

function initRenderer(){
        scene.add(new THREE.AxesHelper(5));

        camera.position.set(0, 3, 6);

        renderer.setSize(750, 750);
        renderer.shadowMap.enabled = true;
        
        controls.enableDamping = true;
        controls.target.y = 0.5;
        
        world.gravity.set(0, -9.82, 0); 
}

function initLight(){
        const light1 = new THREE.SpotLight();
        const light2 = light1.clone();

        //SpotLight
        light1.position.set(2.5, 5, 5);
        light1.angle = Math.PI / 4;
        light1.penumbra = 0.5;
        light1.castShadow = true;
        light1.shadow.mapSize.width = 1024;
        light1.shadow.mapSize.height = 1024;
        light1.shadow.camera.near = 0.5;
        light1.shadow.camera.far = 20;
        scene.add(light1);

        //Light1 Clone
        light2.position.x = -2.5;
        scene.add(light2);
}

function initGeometry(){
        //Cube   
        cubeMesh.position.x = -4;
        cubeMesh.position.y = 3;
        cubeMesh.castShadow = true;
        scene.add(cubeMesh);

        cubeBody.addShape(cubeShape);
        cubeBody.position.x = cubeMesh.position.x;
        cubeBody.position.y = cubeMesh.position.y;
        cubeBody.position.z = cubeMesh.position.z;
        world.addBody(cubeBody);

        //Sphere
        sphereMesh.position.x = -2;
        sphereMesh.position.y = 3;
        sphereMesh.castShadow = true;
        scene.add(sphereMesh);

        sphereBody.addShape(sphereShape);
        sphereBody.position.x = sphereMesh.position.x;
        sphereBody.position.y = sphereMesh.position.y;
        sphereBody.position.z = sphereMesh.position.z;
        world.addBody(sphereBody);

        //Cylinder
        cylinderMesh.position.x = 0;
        cylinderMesh.position.y = 3;
        cylinderMesh.castShadow = true;
        scene.add(cylinderMesh);

        cylinderBody.addShape(cylinderShape, new CANNON.Vec3());
        cylinderBody.position.x = cylinderMesh.position.x;
        cylinderBody.position.y = cylinderMesh.position.y;
        cylinderBody.position.z = cylinderMesh.position.z;
        world.addBody(cylinderBody);

        //Torus
        torusKnotMesh.position.x = 4;
        torusKnotMesh.position.y = 3;
        torusKnotMesh.castShadow = true;
        scene.add(torusKnotMesh);

        torusKnotBody.addShape(torusKnotShape);
        torusKnotBody.position.x = torusKnotMesh.position.x;
        torusKnotBody.position.y = torusKnotMesh.position.y;
        torusKnotBody.position.z = torusKnotMesh.position.z;
        world.addBody(torusKnotBody);

        //Plane
        planeMesh.position.y = -0.01;
        planeMesh.rotateX(-Math.PI / 2);
        planeMesh.receiveShadow = true;
        scene.add(planeMesh);
        
        planeBody.addShape(planeShape);
        planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        world.addBody(planeBody);

        //Model - Monkey
        loadOBJ('https://cdn.jsdelivr.net/gh/Sean-Bradley/Three.js-TypeScript-Boilerplate@cannonjs/dist/client/models/monkey.obj');
}

let delta;
function calcPhysics(){
        delta = Math.min(clock.getDelta(), 0.1);
        world.step(delta);
        cannonDebugRenderer.update();

        // Copy coordinates from Cannon to Three.js
        cubeMesh.position.set(cubeBody.position.x, cubeBody.position.y, cubeBody.position.z);
        cubeMesh.quaternion.set(
                cubeBody.quaternion.x,
                cubeBody.quaternion.y,
                cubeBody.quaternion.z,
                cubeBody.quaternion.w
        );
        sphereMesh.position.set(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
        sphereMesh.quaternion.set(
                sphereBody.quaternion.x,
                sphereBody.quaternion.y,
                sphereBody.quaternion.z,
                sphereBody.quaternion.w
        );
        cylinderMesh.position.set(
                cylinderBody.position.x,
                cylinderBody.position.y,
                cylinderBody.position.z
        );
        cylinderMesh.quaternion.set(
                cylinderBody.quaternion.x,
                cylinderBody.quaternion.y,
                cylinderBody.quaternion.z,
                cylinderBody.quaternion.w
        );
        torusKnotMesh.position.set(
                torusKnotBody.position.x,
                torusKnotBody.position.y,
                torusKnotBody.position.z
        );
        torusKnotMesh.quaternion.set(
                torusKnotBody.quaternion.x,
                torusKnotBody.quaternion.y,
                torusKnotBody.quaternion.z,
                torusKnotBody.quaternion.w
        );
        if (modelLoaded) {
                modelMesh.position.set(
                        modelBody.position.x,
                        modelBody.position.y,
                        modelBody.position.z
                );
                modelMesh.quaternion.set(
                        modelBody.quaternion.x,
                        modelBody.quaternion.y,
                        modelBody.quaternion.z,
                        modelBody.quaternion.w
                );
        }
        

}

function animate() {
        requestAnimationFrame(animate);

        calcPhysics();      
        
        controls.update();
        stats.update();
        render();
}

function render() {
        renderer.render(scene, camera);
}

function init(){
        initRenderer();
        initLight();
        initGUI();
        initGeometry();
}

init();
animate();