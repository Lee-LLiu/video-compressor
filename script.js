const statusDiv =
    document.getElementById("status");

let ffmpegLoaded = false;

async function loadFFmpeg() {

    if (ffmpegLoaded) return;

    statusDiv.innerHTML =
        "正在加载FFmpeg（首次约10~20秒）...";

    ffmpegLoaded = true;

    statusDiv.innerHTML =
        "FFmpeg加载成功";
}

document
.getElementById("compressBtn")
.addEventListener("click", async () => {

    await loadFFmpeg();

});
