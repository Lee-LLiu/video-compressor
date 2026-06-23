document.addEventListener("DOMContentLoaded", ()=>{

    const btn =
        document.getElementById("compressBtn");

    btn.addEventListener("click", ()=>{

        document.getElementById("status")
            .innerHTML =
            "按钮工作正常";

    });

});
