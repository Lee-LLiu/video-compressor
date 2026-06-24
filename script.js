let currentFile = null;

const videoInput = document.getElementById("videoFile");
const status = document.getElementById("status");

const API_BASE = "https://video-compressor-api-nl0b.onrender.com";

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
        status.innerHTML = "⏳ 正在上传...";

        const res = await fetch(`${API_BASE}/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (!data.success) {
            status.innerHTML = "❌ 上传失败";
            return;
        }

        const taskId = data.task_id;
        status.innerHTML = "⏳ 正在压缩...";

        const timer = setInterval(async () => {
            try {
                const r = await fetch(`${API_BASE}/status/${taskId}`);
                const t = await r.json();

                if (t.status === "done") {
                    clearInterval(timer);
                    const downloadUrl = API_BASE + t.download_url;
                    const originalMB = (t.original_size / 1024 / 1024).toFixed(2);
                    const compressedMB = (t.compressed_size / 1024 / 1024).toFixed(2);
                    const ratio = ((1 - t.compressed_size / t.original_size) * 100).toFixed(1);

                    status.innerHTML = `
                        ✅ 压缩完成！<br><br>
                        📄 文件名：${t.filename}<br>
                        📦 原始大小：${originalMB} MB<br>
                        🗜 压缩后大小：${compressedMB} MB<br>
                        📉 压缩率：${ratio}%<br><br>
                        ⬇ <a href="${downloadUrl}" target="_blank">点击下载压缩视频</a>
                    `;
                } else if (t.status === "error") {
                    clearInterval(timer);
                    status.innerHTML = "❌ 压缩失败：" + t.message;
                }
            } catch (err) {
                console.error("轮询任务状态失败:", err);
            }
        }, 2000);

    } catch (err) {
        console.error(err);
        status.innerHTML = "❌ 请求失败：" + err.message;
    }
});
