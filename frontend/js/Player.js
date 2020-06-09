let Player = function () {
}

Player.prototype.initCar = function () {
    let bodyMaterial = new THREE.MeshPhysicalMaterial( {
        color: 0xFF0000, metalness: 1.0, roughness: 0.5, clearcoat: 0.02, clearcoatRoughness: 0.01
    } );

    let detailsMaterial = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.5
    } );

    let glassMaterial = new THREE.MeshPhysicalMaterial( {
        color: 0xffffff, metalness: 0, roughness: 0, transparency: 0.8, transparent: true
    } );

    let dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath( 'lib/gltf/' );

    let loader = new THREE.GLTFLoader();
    loader.setDRACOLoader( dracoLoader );

    loader.load( 'res/models/ferrari.glb', function ( gltf ) {

        player = gltf.scene.children[ 0 ];

        // shadow
        let texture = new THREE.TextureLoader().load( 'res/models/ferrari_ao.png' );
        let shadow = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 0.655 * 4, 1.3 * 4 ),
            new THREE.MeshBasicMaterial( {
                map: texture, opacity: 0.4, transparent: true
            } )
        );
        shadow.rotation.x = - Math.PI / 2;
        shadow.renderOrder = 2;

        for(let i =0;i<vehicleNum;i++)
        {
            player = gltf.scene.children[ 0 ];

            let bodyMaterial = new THREE.MeshPhysicalMaterial( {
                color: 0xffffff*randomArbitrary(0,1), metalness: 1.0, roughness: 0.5, clearcoat: 0.02, clearcoatRoughness: 0.01
            } );

            let detailsMaterial = new THREE.MeshStandardMaterial( {
                color: 0xffffff*randomArbitrary(0,1), metalness: 1.0, roughness: 0.5
            } );

            let glassMaterial = new THREE.MeshPhysicalMaterial( {
                color: 0xffffff*randomArbitrary(0,1), metalness: 0, roughness: 0, transparency: 0.8, transparent: true
            } );
            player.getObjectByName( 'body' ).material = bodyMaterial;
            player.getObjectByName( 'rim_fl' ).material = detailsMaterial;
            player.getObjectByName( 'rim_fr' ).material = detailsMaterial;
            player.getObjectByName( 'rim_rr' ).material = detailsMaterial;
            player.getObjectByName( 'rim_rl' ).material = detailsMaterial;
            player.getObjectByName( 'trim' ).material = detailsMaterial;
            player.getObjectByName( 'glass' ).material = glassMaterial;

            player.add( shadow );
            if(i>=vehicleNum/2)
                player.scale.set(35,35,35);
            else
                player.scale.set(35,35,-35);
            vehicleBox.push(player.clone());
            if(i>=vehicleNum/2)
                vehicleBox[i].position.set(randomInt(50, 250),0, randomInt(-10000, -500));
            else
                vehicleBox[i].position.set(randomInt(-250, -50),0, randomInt(-10000, -500));
            let temp = [];
            temp.push(
                vehicleBox[i].getObjectByName( 'wheel_fl' ),
                vehicleBox[i].getObjectByName( 'wheel_fr' ),
                vehicleBox[i].getObjectByName( 'wheel_rl' ),
                vehicleBox[i].getObjectByName( 'wheel_rr' )
            );
            vehicleWheelsBox.push(temp);
            scene.add(vehicleBox[i]);
        }

        player = gltf.scene.children[ 0 ];

        player.getObjectByName( 'body' ).material = bodyMaterial;
        player.getObjectByName( 'rim_fl' ).material = detailsMaterial;
        player.getObjectByName( 'rim_fr' ).material = detailsMaterial;
        player.getObjectByName( 'rim_rr' ).material = detailsMaterial;
        player.getObjectByName( 'rim_rl' ).material = detailsMaterial;
        player.getObjectByName( 'trim' ).material = detailsMaterial;
        player.getObjectByName( 'glass' ).material = glassMaterial;

        wheels.push(
            player.getObjectByName( 'wheel_fl' ),
            player.getObjectByName( 'wheel_fr' ),
            player.getObjectByName( 'wheel_rl' ),
            player.getObjectByName( 'wheel_rr' )
        );

        player.add( shadow );
        player.scale.set(35,35,35);
        scene.add( player );

    } );

}