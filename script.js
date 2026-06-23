alert("V2版本已经加载");

document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("compressBtn");

    btn.addEventListener("click", function () {

        document.getElementById("status").innerHTML =
            "这是新的 script.js 文件";

    });

});