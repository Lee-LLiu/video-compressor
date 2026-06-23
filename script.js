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

    const status =
    document.getElementById("status");

    if(!currentFile){

        alert("请先选择视频");

        return;

    }

    try{

        status.innerHTML =
        "正在读取视频文件...";

        const fileBuffer =
        await currentFile.arrayBuffer();

        const fileSizeMB =
        (
            fileBuffer.byteLength
            /
            1024
            /
            1024
        ).toFixed(2);

        status.innerHTML = `
        文件读取成功<br><br>

        文件名：
        ${currentFile.name}
        <br><br>

        文件大小：
        ${fileSizeMB} MB
        <br><br>

        已准备交给FFmpeg处理
        <br><br>

        下一步将开始真正压缩
        `;

    }
    catch(error){

        status.innerHTML =
        "读取失败：" +
        error;

        console.error(error);

    }

});