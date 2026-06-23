let currentFile = null;

const videoInput =
document.getElementById("videoFile");

videoInput.addEventListener(
"change",
function(e){

    currentFile =
    e.target.files[0];

});

document
.getElementById("compressBtn")
.addEventListener(
"click",
async function(){

    if(!currentFile){

        alert("请先选择视频");

        return;
    }

    const status =
    document.getElementById("status");

    status.innerHTML =
    "开始加载FFmpeg...";

    try{

        const script =
        document.createElement("script");

        script.src =
        "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/umd/ffmpeg.js";

        document.body.appendChild(
        script
        );

        script.onload = function(){

            status.innerHTML =
            "FFmpeg加载成功";

        };

    }
    catch(error){

        status.innerHTML =
        "加载失败：" +
        error;

    }

});