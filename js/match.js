let Match = function () {

}

Match.prototype.init = function () {

    let matchGeometry = new THREE.CubeGeometry(50, 50, 30, 10, 10, 10);
    let matchMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("res/match/match.png"),
    });
    matchMaterial.transparent = true;
    match = new THREE.Mesh(matchGeometry, [undefined, undefined, undefined, undefined, matchMaterial, undefined]);
    match.position.set(randomInt(-250, 250), 25, -1200);
    match.name = "match";
    scene.add(match);

    collideMeshList.push(match);
}

Match.prototype.update = function (delta) {
    match.position.z +=speed;

    if (matchTime > 0) {
        matchTime -= delta * speed / 20;
        matchText.innerText = "挑战剩余：" + parseInt(matchTime) + "s";
    } else if (matchFlag === true) {
        matchText.innerText = "";
        if (sound)
            document.getElementById('succeed').play()
        score += 300;
        Console.innerText = "挑战成功！获得分数300！"
        setTimeout(function () {
            Console.innerText = ""
        }, 2500);
        matchFlag = false;
        matchTime = 0;
    }
    if(match.position.z>150) {
        match.position.z = -50000 - randomInt(250, 20500);
        match.position.x = randomInt(-250, 250);
    }
}