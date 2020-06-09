//全局变量
let container, scene, camera, renderer, controls;
let keyboard = new THREEx.KeyboardState();
let clock = new THREE.Clock;
let score = 0;//分数
let player; //车
let playerBox;
let wheels = [];
let lineBox = [];//标线+树
let road;
let floorBox = [];//路边
let obstacleBox = [];//障碍物
let vehicleBox = [];//过往车辆
let vehicleWheelsBox = [];//车轮子
let vehicleHelper = [];
let collideMeshList = [];//障碍物与车辆集合
let speed = 20;//游戏速度
let obstacleNum =8;//障碍物数量
let vehicleNum =5;//过往汽车数量
let bonus20;
let bonus50;
let bonus100;
let buff;
let buffTime=0;
let match;
let matchTime=120;
let matchFlag = false;
let active = true;//暂停
let sound = true;//音效
let firstPersonCamera = false;
let textureLoader;
let maxAnisotropy;
let car;
let bonus;
let floor;
let obstacle;
let roAd;
let tree;
let event;
let line;
let Score = document.getElementById("score");
let Console = document.getElementById("console");
let pause = document.getElementById("active");
let music = document.getElementById("sound");
let buffText = document.getElementById("buff");
let matchText = document.getElementById("match");
let challenge = document.getElementById("mode");
let cameraControl = document.getElementById("camera");
let speedText = document.getElementById("speed-container");

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
    scene.environment = new RoomEnvironment( renderer );
    //窗口大小
    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.target.set( 0, 0.5, 0 );

    textureLoader = new THREE.TextureLoader();
    maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    //player盒子
    let material = [];
    material.transparent = true;
    let cubeGeometry = new THREE.CubeGeometry(60, 60, 90, 10, 10, 10);
    playerBox = new THREE.Mesh(cubeGeometry,material);
    scene.add(playerBox);

    //路
    roAd = new Road();
    roAd.init();

    // 加入平面
    floor = new Floor();
    floor.init();

    // 加入线
    line = new Line();
    line.init();

    // 加入树
    tree = new Tree();
    tree.init();

    // 加入障碍物
    obstacle = new Obstacle();
    obstacle.init();

    // 加入过往车辆
    for(let i =0;i<vehicleNum;i++)
    {
        let cubeGeometry = new THREE.CubeGeometry(60, 60, 90, 10, 10, 10);
        vehicleHelper.push(new THREE.Mesh(cubeGeometry));
        vehicleHelper[i].visible = false;
        scene.add(vehicleHelper[i]);
        collideMeshList.push(vehicleHelper[i]);
    }

    //加入奖励
    bonus = new Bonus();
    bonus.init();

    //加入模型
    car = new Player();
    car.initCar();

    //按钮事件
    event = new EventListener();
    event.init_2();

    // 光照
    var light1 = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light1.position.set( 0, 100, 100);
    scene.add( light1 );



    //包围盒
    let path = "res/box/";
    let directions  = ["sky_negX", "sky_posX", "sky_posY", "sky_negY", "sky_posZ", "sky_negZ"];//获取对象
    let format = ".jpg";
    let skyGeometry = new THREE.BoxGeometry( 10000, 10000,10000 );
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

}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if(active && player !== undefined)
        update();
}

function update() {
    let delta = clock.getDelta();
    score+=delta*speed/20;
    keyboardEvent();
    sceneUpdate();
    bonus.update(delta);
    obstacle.update();
    vehicleUpdate();
    collisionUpdate();
    matchUpdate(delta);
}

function matchUpdate(delta) {
    speed+=delta/3;
    speedText.innerText = "速度："+parseInt(speed)+"km/h";
    if (matchTime > 0) {
        matchTime -= delta;
        matchText.innerText = "挑战剩余：" + parseInt(matchTime) + "s";
    } else {
        matchText.innerText = "";
        if(sound)
            document.getElementById('succeed').play()
        active = false;
        setTimeout(function(){window.location.href ='rank.html'},2500);
        //ajax向后端发送分数
        updateRank();
        
    }
    function updateRank() {
        let xhr=new XMLHttpRequest();
        let data = "score="+parseInt(score);
        let url = "http://129.28.167.191:8087/rank/updateRank";
        xhr.open("POST",url+"?"+data,true);
        xhr.send();
    }
}

function vehicleUpdate() {
    for(let i =0;i < vehicleBox.length;i++)
    {
        if(i>=vehicleNum/2)
            vehicleBox[i].position.z +=speed*0.5+i/10;
        else
            vehicleBox[i].position.z +=speed*0.5+i/10+20;
        speedText.innerText = "速度："+parseInt(speed)+"km/h";
        if(vehicleBox[i].position.z>150) {
            if(i>=vehicleNum/2)
                vehicleBox[i].position.set(randomInt(50, 250), 0, -2000 + randomInt(-8000, -2000));
            else
                vehicleBox[i].position.set(randomInt(-250, -50), 0, -2000 + randomInt(-8000, -2000));
        }
    }
}

function sceneUpdate() {
    if(firstPersonCamera)
    {
        camera.position.set(player.position.x-3,player.position.y+35,player.position.z+15);
    }

    roAd.update();

    line.update();

    floor.update();
}

function collisionUpdate() {
    //let originPoint = [player.position.x,player.position.y,player.position.z];
    playerBox.position.set(player.position.x,player.position.y,player.position.z);
    for(let i =0;i<vehicleNum;i++)
    {
        vehicleHelper[i].position.set(vehicleBox[i].position.x,vehicleBox[i].position.y,vehicleBox[i].position.z);
    }
    let originPoint = playerBox.position.clone();

    for (let vertexIndex = 0; vertexIndex < playerBox.geometry.vertices.length; vertexIndex++) {
        // 顶点原始坐标
        let localVertex = playerBox.geometry.vertices[vertexIndex].clone();
        // 顶点经过变换后的坐标
        let globalVertex = localVertex.applyMatrix4(playerBox.matrix);
        let directionVector = globalVertex.sub(playerBox.position);

        let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        let collisionResults = ray.intersectObjects(collideMeshList);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            if(collisionResults[0].object.name === "bonus20")
            {
                if(sound)
                    document.getElementById('bonus').play()
                score+=20;
                Console.innerText = "分数奖励：20";
                bonus20.visible = false;
                setTimeout(function(){bonus20.visible = true;},5000);
                setTimeout(function(){Console.innerText = ""},2500);
                break;
            }
            else if(collisionResults[0].object.name === "bonus50")
            {
                if(sound)
                    document.getElementById('bonus').play()
                score+=50;
                bonus50.visible = false;
                setTimeout(function(){bonus50.visible = true;},5000);
                Console.innerText = "分数奖励：50";
                setTimeout(function(){Console.innerText = ""},2500);
                break;
            }
            else if(collisionResults[0].object.name === "bonus100")
            {
                if(sound)
                    document.getElementById('bonus').play()
                score+=100;
                bonus100.visible = false;
                setTimeout(function(){bonus100.visible = true;},5000);
                Console.innerText = "分数奖励：100";
                setTimeout(function(){Console.innerText = ""},2500);
                break;
            }
            else if(collisionResults[0].object.name === "buff")
            {
                if(sound)
                    document.getElementById('bonus').play()
                if(buffTime<0)
                    buffTime=0;
                buffTime+=15;
                buff.visible = false;
                setTimeout(function(){buff.visible = true;},5000);
                Console.innerText = "无敌buff已获得";
                setTimeout(function(){Console.innerText = ""},2500);
                break;
            }
            else if(buffTime<=0){
                console.log("撞上辣");
                crash();
                break;
            }
            break;
        }
    }

    function crash() {
        if(sound)
            document.getElementById("crash").play()
        score-=5+speed/5;
        Score.innerText = "Score : " +parseInt(score);
        Console.innerText = "撞上了";
        setTimeout(function(){Console.innerText = ""},2500);
    }
}

function keyboardEvent() {
    let moveDistance = speed/4;
    for ( let i = 0; i < wheels.length; i ++ ) {
        wheels[i].rotation.x = - performance.now()*speed/ 600 * Math.PI;
    }
    for ( let i = 0; i < vehicleWheelsBox.length; i ++ ) {
        for(let j =0;j<vehicleWheelsBox[i].length;j++)
        {
            vehicleWheelsBox[i][j].rotation.x = - performance.now()*speed/ 600 * Math.PI;
        }
    }

    if (keyboard.pressed("left") || keyboard.pressed("A")) {
        if (player.position.x > -270) {
            player.position.x -= moveDistance;
        }
        if (camera.position.x > -150) {
            camera.position.x -= moveDistance * 0.6;
            if (camera.rotation.z > -5 * Math.PI / 180) {
                camera.rotation.z -= 0.2 * Math.PI / 180;
            }
            for ( let i = 0; i < 2; i ++ ) {
                if (wheels[i].rotation.z > -5 * Math.PI / 180) {
                    wheels[i].rotation.z -= 0.2 * Math.PI / 180;
                }
            }
        }
    }
    if (keyboard.pressed("right") || keyboard.pressed("D")) {
        if (player.position.x < 270) {
            player.position.x += moveDistance;
        }
        if (camera.position.x < 150) {
            camera.position.x += moveDistance * 0.6;
            if (camera.rotation.z < 5 * Math.PI / 180) {
                camera.rotation.z += 0.2 * Math.PI / 180;
            }
            for ( let i = 0; i < 2; i ++ ) {
                if (wheels[i].rotation.z < 5 * Math.PI / 180) {
                    wheels[i].rotation.z += 0.2 * Math.PI / 180;
                }
            }
        }
    }
    if (keyboard.pressed("up") || keyboard.pressed("W")) {
        if(player.position.z>-3500) {
            player.position.z -= moveDistance;
        }
    }
    if (keyboard.pressed("down") || keyboard.pressed("S")) {
        if(player.position.z<0) {
            player.position.z += moveDistance;
        }
    }
    if (!(keyboard.pressed("left") || keyboard.pressed("right") ||
        keyboard.pressed("A") || keyboard.pressed("D"))) {
        let delta = camera.rotation.z;
        camera.rotation.z -= delta / 10;
        for ( let i = 0; i < 2; i ++ ) {
            let delta2 = wheels[i].rotation.z;
            wheels[i].rotation.z -= delta2 / 10;
        }

    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}