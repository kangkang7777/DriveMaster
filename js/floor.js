let Floor = function () {

}

Floor.prototype.init = function () {
    let floorTexture = textureLoader.load( "res/texture/plane.png" );
    let floorMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: floorTexture , side: THREE.DoubleSide
    } );
    floorTexture.anisotropy = maxAnisotropy;
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 5, 2);
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
}

Floor.prototype.update =function () {
    for (let i =0;i < floorBox.length;i++)
    {
        floorBox[i].position.z +=speed;
        if(floorBox[i].position.z>0) {
            floorBox[i].position.z = -5000;
            Score.innerText = "Score : " +parseInt(score);
        }
    }
}