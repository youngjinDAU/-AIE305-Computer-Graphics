import * as THREE from '//cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from '//cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 750/750, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls( camera, renderer.domElement );

renderer.setSize(750,750);
document.getElementById('canv').appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);

// 큐브 생성
// const geometry = new THREE.BoxGeometry(1,1,1);
const geometry = new THREE.SphereGeometry(0.5,20,20);

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        var material = new THREE.MeshBasicMaterial({ color: 0xfed136 });
        if(i % 2 == 0)
            material.wireframe=true;
        var object = new THREE.Mesh(geometry, material);
        object.translateX(-2.0 + 2.0 * i);
        object.translateY(-2.0 + 2.0 * j);
        scene.add(object);
    }
}

// 카메라 위치 설정
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
controls.update();

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

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