let Bonus = function () {

}

Bonus.prototype.init = function () {
    let bonus20Geometry = new THREE.CubeGeometry(50, 50, 30, 10, 10, 10);
    let bonus20Material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("res/bonus/20.png"),
    });
    bonus20Material.transparent = true;
    bonus20 = new THREE.Mesh(bonus20Geometry, [undefined,undefined,undefined,undefined,bonus20Material,undefined]);
    bonus20.position.set(randomInt(-250, 250), 25, -15000);
    bonus20.name = "bonus20";
    scene.add(bonus20);

    let bonus50Geometry = new THREE.CubeGeometry(50, 50, 30, 10, 10, 10);
    let bonus50Material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("res/bonus/50.png"),
    });
    bonus50Material.transparent = true;
    bonus50 = new THREE.Mesh(bonus50Geometry, [undefined,undefined,undefined,undefined,bonus50Material,undefined]);
    bonus50.position.set(randomInt(-250, 250), 25, -25000);
    bonus50.name = "bonus50";
    scene.add(bonus50);

    let bonus100Geometry = new THREE.CubeGeometry(50, 50, 30, 10, 10, 10);
    let bonus100Material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("res/bonus/100.png"),
    });
    bonus100Material.transparent = true;
    bonus100 = new THREE.Mesh(bonus100Geometry, [undefined,undefined,undefined,undefined,bonus100Material,undefined]);
    bonus100.position.set(randomInt(-250, 250), 25, -45000);
    bonus100.name = "bonus100";
    scene.add(bonus100);

    let buffGeometry = new THREE.CubeGeometry(50, 50, 30, 10, 10, 10);
    let buffMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("res/bonus/buff.png"),
    });
    buffMaterial.transparent = true;
    buff = new THREE.Mesh(buffGeometry, [undefined,undefined,undefined,undefined,buffMaterial,undefined]);
    buff.position.set(randomInt(-250, 250), 25, -30000);
    buff.name = "buff";
    scene.add(buff);

    collideMeshList.push(bonus20);
    collideMeshList.push(bonus50);
    collideMeshList.push(bonus100);
    collideMeshList.push(buff);
}

Bonus.prototype.update = function (delta) {
    bonus20.position.z +=speed;
    bonus50.position.z +=speed;
    bonus100.position.z +=speed;
    buff.position.z +=speed;

    if(buffTime>0)
    {
        buffTime-=delta*speed/20;
        buffText.innerText = "buff 剩余："+parseInt(buffTime)+"s";
    }
    else
    {
        buffText.innerText = "";
    }


    if(bonus20.position.z>150) {
        bonus20.position.z = -15000 - randomInt(250, 5500);
        bonus20.position.x = randomInt(-250, 250);
    }
    if(bonus50.position.z>150) {
        bonus50.position.z = -25000 - randomInt(250, 10500);
        bonus50.position.x = randomInt(-250, 250);
    }
    if(bonus100.position.z>150) {
        bonus100.position.z = -45000 - randomInt(250, 20500);
        bonus100.position.x = randomInt(-250, 250);
    }
    if(buff.position.z>150) {
        buff.position.z = -25000 - randomInt(250, 20500);
        buff.position.x = randomInt(-250, 250);
    }

}