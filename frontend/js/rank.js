getRank();

function getRank() {
    let xhr=new XMLHttpRequest();
    let url = "http://localhost:8087/rank/getRank";
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState===4)
        {
            if(xhr.response !== "") {
                    showRank(xhr.response);
            }
            else
                alert("获取排行榜失败");
        }
    }
    xhr.open("GET",url,true);
    xhr.send();
}

function showRank(arr) {
    let temp = arr.slice(1,arr.length-1).split(",");
    if (temp.length < 10)
    {
        for(let i =9;i>=temp.length;i--)
        {
            document.getElementById("rank" + i).style.display = "none";
        }
    }

    for (let i = 0;i < temp.length; i++) {
            document.getElementById("rank" + i).innerHTML = "第"+(i+1)+"名：    "+temp[i];
    }

}