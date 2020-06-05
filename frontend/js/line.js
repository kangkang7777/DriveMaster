let Line = function () {

}

Line.prototype.init = function () {
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
}

Line.prototype.update = function () {
    for(let i =0;i < lineBox.length;i++)
    {
        lineBox[i].position.z +=speed;
        if(lineBox[i].position.z>150) {
            lineBox[i].position.z = -3350;
            Score.innerText = "Score : " +parseInt(score);
        }
    }
}