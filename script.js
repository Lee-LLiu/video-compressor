let currentFile = null;

const videoInput =
document.getElementById("videoFile");

videoInput.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    currentFile = file;

    const sizeMB =
    (file.size / 1024 / 1024).toFixed(2);

    const video =
    document.createElement("video");

    const url =
    URL.createObjectURL(file);

    video.preload = "metadata";

    video.addEventListener(
        "loadedmetadata",
        function(){

        const duration =
        Math.floor(video.duration);

        const minutes =
        Math.floor(duration / 60);

        const seconds =
        duration % 60;

        document.getElementById(
            "info"
        ).innerHTML =

        `
        <h3>视频信息</h3>

        文件名：
        ${file.name}

        <br><br>

        文件大小：
        ${sizeMB} MB

        <br><br>

        时长：
        ${minutes}分${seconds}秒

        <br><br>

        分辨率：
        ${video.videoWidth}
        ×
        ${video.videoHeight}

        <br><br>

        预计压缩后：

        ${(sizeMB * 0.3).toFixed(2)}
        MB
        （约减少70%）
        `;

        URL.revokeObjectURL(url);

    });

    video.src = url;

});

document
.getElementById("compressBtn")
.addEventListener("click", function(){

    if(!currentFile){

        alert("请先选择视频");

        return;
    }

    document.getElementById(
        "status"
    ).innerHTML =

    "下一课开始接入FFmpeg.wasm";

});