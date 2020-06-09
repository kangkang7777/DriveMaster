let EventListener = function () {

}

EventListener.prototype.init_1 = function () {
    up.addEventListener('click',function(){
        if(speed<100) {
            speed += 10;
        }
        else {
            Console.innerText = "目前速度已到最大值！";
            setTimeout(function(){Console.innerText = ""},2500);
        }
    },false)
    down.addEventListener('click',function(){
        if(speed>20) {
            speed -= 10;
        }
        else {
            Console.innerText = "目前速度已到最小值！";
            setTimeout(function(){Console.innerText = ""},2500);
        }
    },false)
    pause.addEventListener('click',function(){
        if(active === true)
        {
            if(sound)
                document.getElementById('pause').play()
            active = false;
            pause.innerText = "继续";
        }
        else
        {
            if(sound)
                document.getElementById('pause').play()
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
    challenge.addEventListener('click',function(){
        window.location.href = "racingMode.html";
    },false)
    cameraControl.addEventListener('click',function(){
        if(firstPersonCamera === false)
        {
            firstPersonCamera = true;
            cameraControl.innerText = "第三人称";
        }
        else
        {
            firstPersonCamera = false;
            cameraControl.innerText = "第一人称";
            camera.position.set(0, 150, 400);

        }
    },false)
}

EventListener.prototype.init_2 = function () {
    pause.addEventListener('click',function(){
        if(active === true)
        {
            if(sound)
                document.getElementById('pause').play()
            active = false;
            pause.innerText = "继续";
        }
        else
        {
            if(sound)
                document.getElementById('pause').play()
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
    challenge.addEventListener('click',function(){
        window.location.href = "freeMode.html";
    },false)
    cameraControl.addEventListener('click',function(){
        if(firstPersonCamera === false)
        {
            firstPersonCamera = true;
            cameraControl.innerText = "第三人称";
        }
        else
        {
            firstPersonCamera = false;
            cameraControl.innerText = "第一人称";
            camera.position.set(0, 150, 400);

        }
    },false)
}