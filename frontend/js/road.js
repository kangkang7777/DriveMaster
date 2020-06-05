let Road = function () {

}

Road.prototype.init = function () {
    // 加入路面
    let roadTexture = textureLoader.load( "res/texture/road.jpg" );
    let roadMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: roadTexture , side: THREE.DoubleSide
    } );
    roadTexture.anisotropy = maxAnisotropy;
    roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
    roadTexture.repeat.set( 1, 5 );
    let roadGeometry = new THREE.PlaneGeometry(600, 12000, 10, 10);
    road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.position.y = -0.5;
    road.position.z = -5000;
    road.rotation.x = Math.PI / 2;
    scene.add(road);
}

Road.prototype.update = function () {
    road.position.z +=speed;
    if(road.position.z>1250) {
        road.position.z = -5000;
    }
}