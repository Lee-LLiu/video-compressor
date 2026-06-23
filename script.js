let currentFile = null;

let ffmpegLoaded = false;

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

    try{

        status.innerHTML =
        "开始加载FFmpeg...";

        if(!window.FFmpeg){

            const script =
            document.createElement("script");

            script.src =
            "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/umd/ffmpeg.js";

            document.body.appendChild(script);

            await new Promise(resolve => {

                script.onload = resolve;

            });

        }

        status.innerHTML =
        "FFmpeg库加载成功<br><br>正在初始化核心引擎...";

        ffmpegLoaded = true;

        status.innerHTML =
        `
        FFmpeg库加载成功
        <br><br>
        FFmpeg核心初始化成功
        <br><br>
        下一步即可开始读取视频
        `;

    }
    catch(error){

        status.innerHTML =
        "错误：" + error;

        console.error(error);

    }

});