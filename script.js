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

    status.innerHTML = "⏳ 上传中...";

    const res = await fetch(API_URL, {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (!data.task_id) {
        status.innerHTML = "❌ 上传失败";
        return;
    }

    const taskId = data.task_id;

    status.innerHTML = "⏳ 正在压缩...";

    // ======================
    // 轮询状态
    // ======================
    const timer = setInterval(async () => {
        const r = await fetch(
            `https://video-compressor-api-nl0b.onrender.com/status/${taskId}`
        );

        const s = await r.json();

        if (s.status === "done") {
            clearInterval(timer);

            const downloadLink =
                `https://video-compressor-api-nl0b.onrender.com/download/${taskId}`;

            const inMB = (s.input_size / 1024 / 1024).toFixed(2);
            const outMB = (s.output_size / 1024 / 1024).toFixed(2);
            const ratio = (100 - (s.output_size / s.input_size) * 100).toFixed(1);

            status.innerHTML = `
                ✅ 压缩完成！<br><br>
                原始大小：${inMB} MB<br>
                压缩后：${outMB} MB<br>
                压缩率：${ratio}%<br><br>
                <a href="${downloadLink}" target="_blank">
                    ⬇ 点击下载
                </a>
            `;
        }

        if (s.status === "error") {
            clearInterval(timer);
            status.innerHTML = "❌ 失败：" + s.message;
        }
    }, 2000);
});
