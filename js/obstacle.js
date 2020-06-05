let Obstacle = function () {

}

Obstacle.prototype.init = function () {
    let loader = new THREE.TGALoader();
    let texture2 = loader.load( 'res/texture/rock.tga' );
    for(let i =0;i<obstacleNum;i++)
    {
        let material2 = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture2 } );
        let obstacleGeometry = 	new THREE.BoxBufferGeometry( 50, 50, 50 );
        let obstacle = new THREE.Mesh(obstacleGeometry, material2);
        obstacle.position.set(randomInt(-250, 250), 25, randomInt(-10000, -500));
        scene.add(obstacle);
        obstacleBox.push(obstacle);
        collideMeshList.push(obstacle);
    }
}

Obstacle.prototype.update = function () {
    for(let i =0;i < obstacleBox.length;i++)
    {
        obstacleBox[i].position.z +=speed;
        if(obstacleBox[i].position.z>150)
            obstacleBox[i].position.set(randomInt(-250, 250), 25,-2000+randomInt(-8000,-2000));
    }
}