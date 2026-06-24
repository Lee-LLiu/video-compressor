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
        status.innerHTML = "⏳ 正在上传并压缩，请稍候...";

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            const downloadUrl = data.download_url;
            const originalMB = (data.original_size / 1024 / 1024).toFixed(2);
            const compressedMB = (data.compressed_size / 1024 / 1024).toFixed(2);
            const ratio = ((1 - data.compressed_size / data.original_size) * 100).toFixed(1);

            status.innerHTML = `
                ✅ 压缩完成！<br><br>
                📄 文件名：${data.filename}<br>
                📦 原始大小：${originalMB} MB<br>
                🗜 压缩后大小：${compressedMB} MB<br>
                📉 压缩率：${ratio}%<br><br>
                <a href="${downloadUrl}" target="_blank">⬇ 点击下载压缩视频</a>
            `;
        } else {
            status.innerHTML = "❌ 压缩失败：" + data.message;
        }
    } catch (error) {
        console.error(error);
        status.innerHTML = "❌ 请求失败：" + error.message;
    }
});
