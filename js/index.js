//全局变量
let container, scene, camera, renderer, controls;
let keyboard = new THREEx.KeyboardState();
let clock = new THREE.Clock;
let score = 0;//分数
let player; //车
let lineBox = [];//标线+树
let floorBox = [];//路边
let obstacleBox = [];//障碍物
let vehicleBox = [];//过往车辆
let collideMeshList = [];//障碍物与车辆集合
let speed = 10;//游戏速度
let obstacleNum =8;//障碍物数量
let vehicleNum =5;//过往汽车数量
let active = true;//暂停
let sound = true;//音效
let Score = document.getElementById("score");
let Console = document.getElementById("console");
let up = document.getElementById("up");
let down = document.getElementById("down");
let pause = document.getElementById("active");
let music = document.getElementById("sound");

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
    let roadGeometry = new THREE.PlaneGeometry(600, 8000, 10, 10);
    let road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.position.y = -0.5;
    road.rotation.x = Math.PI / 2;
    scene.add(road);

    // 加入平面
    let floorMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("res/texture/roadtexture.jpg"),
        color: 0xF1E3A7,
        side: THREE.DoubleSide
    });
    let floorGeometry = new THREE.PlaneGeometry(2000, 10000, 10, 10);
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.position.x = -1300;
    floor.position.z = -5000;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    floorBox.push(floor);

    let floor2 = new THREE.Mesh(floorGeometry, floorMaterial);
    floor2.position.y = -0.5;
    floor2.position.x = 1300;
    floor2.position.z = -5000;
    floor2.rotation.x = Math.PI / 2;
    scene.add(floor2);
    floorBox.push(floor2);

    // 加入线
    let lineMaterial = new THREE.MeshBasicMaterial({
        //map: THREE.ImageUtils.loadTexture("res/texture/roadtexture.jpg"),
        color: 0xFFFFFF,
        side: THREE.DoubleSide
    });
    let lineGeometry = new THREE.PlaneGeometry(20, 200, 10, 10);
    for(let i =0;i<7;i++) {
        let line = new THREE.Mesh(lineGeometry, lineMaterial);
        //line.position.y = -0.5;
        line.position.z = -100*(i*5+1);
        line.rotation.x = Math.PI / 2;
        scene.add(line);
        lineBox.push(line);
    }

    // 加入树
    let treeMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("res/texture/tree.png"),
        //side: THREE.FrontSide,
        //alphaMap:0xFFFFFF
    });
    treeMaterial.transparent = true;
    let treeGeometry = new THREE.PlaneGeometry(100, 200, 10, 10);
    for(let i =0;i<7;i++) {
        let treeL = new THREE.Mesh(treeGeometry, treeMaterial);
        let treeR = new THREE.Mesh(treeGeometry, treeMaterial);
        treeL.position.z = -100*(i*5+1);
        treeL.position.x = -350;
        treeL.position.y = 90;
        treeR.position.z = -100*(i*5+1);
        treeR.position.x = 350;
        treeR.position.y = 90;
        //tree.rotation.x = Math.PI / 2;
        scene.add(treeL);
        lineBox.push(treeL);
        scene.add(treeR);
        lineBox.push(treeR);
    }

    // 加入玩家
    let cubeGeometry = new THREE.CubeGeometry(90, 60, 50, 10, 10, 10);
    let wireMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("res/texture/player.png"),
    });
    wireMaterial.transparent = true;
    player = new THREE.Mesh(cubeGeometry, [undefined,undefined,undefined,undefined,wireMaterial,undefined]);
    player.position.set(0, 25, 0);
    scene.add(player);

    // 加入障碍物
    for(let i =0;i<obstacleNum;i++)
    {
        let url = "res/texture/rock"+randomInt(1,4)+".png";
        let obstacleGeometry = new THREE.CubeGeometry(randomInt(50, 80), randomInt(70, 100), 10);
        let obstacleMaterial = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(url),
        });
        obstacleMaterial.transparent = true;
        let obstacle = new THREE.Mesh(obstacleGeometry, [undefined,undefined,undefined,undefined,obstacleMaterial,undefined]);
        obstacle.position.set(randomInt(-250, 250), 25, randomInt(-10000, -500));
        scene.add(obstacle);
        obstacleBox.push(obstacle);
        collideMeshList.push(obstacle);
    }

    // 加入过往车辆
    for(let i =0;i<vehicleNum;i++)
    {
        let url = "res/texture/car"+randomInt(1,3)+".png";
        let vehicleGeometry = new THREE.CubeGeometry(120, 70, 10);
        let vehicleMaterial = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(url),

        });
        vehicleMaterial.transparent = true;
        let vehicle = new THREE.Mesh(vehicleGeometry, [undefined,undefined,undefined,undefined,vehicleMaterial,undefined]);
        vehicle.position.set(randomInt(-250, 250), 25, randomInt(-10000, -500));
        scene.add(vehicle);
        vehicleBox.push(vehicle);
        collideMeshList.push(vehicle);
    }

    //包围盒
    let path = "res/box/";
    let directions  = ["sky_negX", "sky_posX", "sky_posY", "sky_negY", "sky_posZ", "sky_negZ"];//获取对象
    let format = ".png";
    let skyGeometry = new THREE.BoxGeometry( 8000, 8000, 8000 );
    let materialArray = [];
    for (let i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( path + directions[i] + format ),
            side: THREE.BackSide
        }));
    let skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    let skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    skyBox.position.set(300,0,0);
    scene.add(skyBox);

    //按钮事件
    up.addEventListener('click',function(){
        if(speed<100) {
            speed += 10;
            Console.innerText = "目前速度为："+speed;
            setTimeout(function(){Console.innerText = ""},2500);
        }
        else {
            Console.innerText = "目前速度已到最大值！";
            setTimeout(function(){Console.innerText = ""},2500);
        }
    },false)
    down.addEventListener('click',function(){
        if(speed>20) {
            speed -= 10;
            Console.innerText = "目前速度为："+speed;
            setTimeout(function(){Console.innerText = ""},2500);
        }
        else {
            Console.innerText = "目前速度已到最小值！";
            setTimeout(function(){Console.innerText = ""},2500);
        }
    },false)
    pause.addEventListener('click',function(){
        if(active === true)
        {
            active = false;
            pause.innerText = "继续";
        }
        else
        {
            active = true;
            pause.innerText = "暂停";
        }
    },false)
    music.addEventListener('click',function(){
        if(sound === true)
        {
            sound = false;
            music.innerText = "音效：关";
        }
        else
        {
            sound = true;
            music.innerText = "音效：开";
        }
    },false)
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if(active)
        update();
}

function update() {
    let delta = clock.getDelta();
    score+=delta*speed/20;
    keyboardEvent();
    sceneUpdate();
    obstacleUpdate();
    vehicleUpdate();
    collisionUpdate();
}



function vehicleUpdate() {
    for(let i =0;i < vehicleBox.length;i++)
    {
        vehicleBox[i].position.z +=speed*0.5+i/10;
        if(vehicleBox[i].position.z>150)
            vehicleBox[i].position.set(randomInt(-250, 250), 25,-2000+randomInt(-8000,-2000));
    }
}

function obstacleUpdate() {
    for(let i =0;i < obstacleBox.length;i++)
    {
        obstacleBox[i].position.z +=speed;
        if(obstacleBox[i].position.z>150)
            obstacleBox[i].position.set(randomInt(-250, 250), 25,-2000+randomInt(-8000,-2000));
    }
}

function sceneUpdate() {
    for(let i =0;i < lineBox.length;i++)
    {
        lineBox[i].position.z +=speed;
        if(lineBox[i].position.z>150) {
            lineBox[i].position.z = -3350;
            Score.innerText = "Score : " +parseInt(score);
        }
    }
    for (let i =0;i < floorBox.length;i++)
    {
        floorBox[i].position.z +=speed;
        if(floorBox[i].position.z>0) {
            floorBox[i].position.z = -5000;
            Score.innerText = "Score : " +parseInt(score);
        }
    }
}

function collisionUpdate() {
    let originPoint = player.position.clone();

    for (let vertexIndex = 0; vertexIndex < player.geometry.vertices.length; vertexIndex++) {
        // 顶点原始坐标
        let localVertex = player.geometry.vertices[vertexIndex].clone();
        // 顶点经过变换后的坐标
        let globalVertex = localVertex.applyMatrix4(player.matrix);
        let directionVector = globalVertex.sub(player.position);

        let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        let collisionResults = ray.intersectObjects(collideMeshList);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            console.log("撞上辣");
            crash();
            break;
        }
    }

    function crash() {
        if(sound)
            document.getElementById('crash').play()
        score-=5+speed/5;
        Score.innerText = "Score : " +parseInt(score);
        Console.innerText = "撞上了";
        setTimeout(function(){Console.innerText = ""},2500);
    }
}


function keyboardEvent() {
    let moveDistance = speed;
    if (keyboard.pressed("left") || keyboard.pressed("A")) {
        if (player.position.x > -270)
            player.position.x -= moveDistance;
        if (camera.position.x > -150) {
            camera.position.x -= moveDistance * 0.6;
            if (camera.rotation.z > -5 * Math.PI / 180) {
                camera.rotation.z -= 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("right") || keyboard.pressed("D")) {
        if (player.position.x < 270)
            player.position.x += moveDistance;
        if (camera.position.x < 150) {
            camera.position.x += moveDistance * 0.6;
            if (camera.rotation.z < 5 * Math.PI / 180) {
                camera.rotation.z += 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("up") || keyboard.pressed("W")) {
        if(player.position.z>-3500)
            player.position.z -= moveDistance;
    }
    if (keyboard.pressed("down") || keyboard.pressed("S")) {
        if(player.position.z<0)
            player.position.z += moveDistance;
    }
    if (!(keyboard.pressed("left") || keyboard.pressed("right") ||
        keyboard.pressed("A") || keyboard.pressed("D"))) {
        delta = camera.rotation.z;
        camera.rotation.z -= delta / 10;
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}