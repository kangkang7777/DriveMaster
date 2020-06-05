let Tree = function () {

}

Tree.prototype.init = function () {
    let treeGeometry = new THREE.PlaneGeometry(100, 200, 10, 10);
    for(let i =0;i<7;i++) {
        let treeUrl1 = "res/texture/tree"+randomInt(1,7)+".png";
        let treeMaterial1 = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(treeUrl1),
        });
        treeMaterial1.transparent = true;
        let treeUrl2 = "res/texture/tree"+randomInt(1,7)+".png";
        let treeMaterial2 = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(treeUrl2),
        });
        treeMaterial2.transparent = true;
        let treeL = new THREE.Mesh(treeGeometry, treeMaterial1);
        let treeR = new THREE.Mesh(treeGeometry, treeMaterial2);
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
}