let currentFile = null;

const videoInput = document.getElementById("videoFile");

const status = document.getElementById("status");

const API_URL = "https://video-compressor-api-nl0b.onrender.com/upload";

videoInput.addEventListener("change", function (e) {
    currentFile = e.target.files[0];

    if (currentFile) {
        status.innerHTML = `
        已选择文件<br><br>
        文件名：${currentFile.name}<br>
        大小：${(currentFile.size / 1024 / 1024).toFixed(2)} MB
        `;
    }
});


document.getElementById("compressBtn").addEventListener("click", async function () {

    if (!currentFile) {
        alert("请先选择视频");
        return;
    }

    const formData = new FormData();
    formData.append("video", currentFile);

    try {
        status.innerHTML = "⏳ 正在上传到服务器...";

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        console.log("服务器返回：", data);

        if (data.success) {

            const downloadLink =
                "https://video-compressor-api-nl0b.onrender.com" + data.download_url;

            status.innerHTML = `
                ✅ 压缩完成！<br><br>

                文件名：${data.filename}<br>
                压缩后大小：${(data.output_size_bytes / 1024 / 1024).toFixed(2)} MB<br><br>

                <a href="${downloadLink}" target="_blank">
                    ⬇ 点击下载压缩视频
                </a>
            `;

        } else {
            status.innerHTML = "❌ 压缩失败：" + data.message;
        }

    } catch (error) {
        console.error(error);
        status.innerHTML = "❌ 请求失败：" + error.message;
    }

});
