//全局变量
let container, scene, camera, renderer, controls;
let keyboard = new THREEx.KeyboardState();
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

    //主场景
    scene = new THREE.Scene();
    //摄像机
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 1, 20000);
    camera.position.set(0, 150, 400);
    //渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(screenWidth, screenHeight);
    container = document.getElementById("index");
    container.appendChild(renderer.domElement);
    //窗口大小
    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 加入路面
    let roadMaterial = new THREE.MeshBasicMaterial({
        color: 0x222222,
        side: THREE.DoubleSide
    });
    let roadGeometry = new THREE.PlaneGeometry(600, 10000, 10, 10);
    let road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.position.y = -0.5;
    road.rotation.x = Math.PI / 2;
    scene.add(road);

    // 加入平面
    let floorMaterial = new THREE.MeshBasicMaterial({
        color: 0xF1E3A7,
        side: THREE.DoubleSide
    });
    let floorGeometry = new THREE.PlaneGeometry(2000, 10000, 10, 10);
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.position.x = -1300;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    let floor2 = new THREE.Mesh(floorGeometry, floorMaterial);
    floor2.position.y = -0.5;
    floor2.position.x = 1300;
    floor2.rotation.x = Math.PI / 2;
    scene.add(floor2);

    // 加入控制的cube
    let cubeGeometry = new THREE.CubeGeometry(50, 50, 50, 10, 10, 10);
    let wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xfff000,
        wireframe: true
    });
    movingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
    movingCube.position.set(0, 25, 0);
    scene.add(movingCube);

    //包围盒
    let path = "res/";
    let directions  = ["sky_negX", "sky_posX", "sky_posY", "sky_negY", "sky_posZ", "sky_negZ"];//获取对象
    let format = ".png";
    let skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );
    let materialArray = [];
    for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( path + directions[i] + format ),
            side: THREE.BackSide
        }));
    let skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    let skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    skyBox.position.set(300,0,0)
    scene.add(skyBox);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    update();
}

function update() {
    let delta = clock.getDelta();
    let moveDistance = 200 * delta;

    if (keyboard.pressed("left") || keyboard.pressed("A")) {
        if (movingCube.position.x > -270)
            movingCube.position.x -= moveDistance;
        if (camera.position.x > -150) {
            camera.position.x -= moveDistance * 0.6;
            if (camera.rotation.z > -5 * Math.PI / 180) {
                camera.rotation.z -= 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("right") || keyboard.pressed("D")) {
        if (movingCube.position.x < 270)
            movingCube.position.x += moveDistance;
        if (camera.position.x < 150) {
            camera.position.x += moveDistance * 0.6;
            if (camera.rotation.z < 5 * Math.PI / 180) {
                camera.rotation.z += 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("up") || keyboard.pressed("W")) {
        movingCube.position.z -= moveDistance;
    }
    if (keyboard.pressed("down") || keyboard.pressed("S")) {
        movingCube.position.z += moveDistance;
    }

    if (!(keyboard.pressed("left") || keyboard.pressed("right") ||
        keyboard.pressed("A") || keyboard.pressed("D"))) {
        delta = camera.rotation.z;
        camera.rotation.z -= delta / 10;
    }
}