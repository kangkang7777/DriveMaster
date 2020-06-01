//全局变量
let container, scene, camera, renderer, controls;
//let keyboard = new THREEx.KeyboardState();
let clock = new THREE.Clock;

let movingCube;
let cubes = [];
let message = document.getElementById("message");
let crash = false;
let score = 0;
let scoreText = document.getElementById("score");

init();
animate();

function init() {
    scene = new THREE.Scene();

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 1, 20000);
    camera.position.set(0, 150, 400);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(screenWidth, screenHeight);
    container = document.getElementById("index");
    container.appendChild(renderer.domElement);

    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 加入一个平面
    let floorMaterial = new THREE.MeshBasicMaterial({
        color: 0x222222,
        side: THREE.DoubleSide
    });
    let floorGeometry = new THREE.PlaneGeometry(600, 10000, 10, 10);
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // 加入控制的cube
    let cubeGeometry = new THREE.CubeGeometry(50, 50, 50, 10, 10, 10);
    let wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xfff000,
        wireframe: true
    });
    movingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
    movingCube.position.set(0, 25, 0);
    scene.add(movingCube);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    update();
}

function update() {

}