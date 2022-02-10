$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    //点击发送按钮
    $(".btn").on("click", function () {
        var text = $(".text").val().trim();
        if (text.length <= 0) {
            return $(".text").val(" "), alert("消息不能为空");
        }
        $(".talk_list").append(
            "<li class='right_word'><img src='img/person02.png' /> <span>" +
                text +
                "</span></li>"
        );
        $(".text").val(" ");
        resetui();
        getAPI(text);
    });

    function getAPI(text) {
        $.ajax({
            type: "get",
            url: "	http://api.qingyunke.com/api.php",
            data: {
                key: free,
                appid: 0,
                msg: text,
            },
            success: function (res) {
                if (res.message === "success") {
                    var msg = res.data.info.text;
                    $(".talk_list").append(
                        '<li class="left_word"><img src="img/person01.png" /><span>' +
                            msg +
                            "</span></li>"
                    );
                    resetui();
                }
            },
        });
    }

    $(".text").on("keyup", function (e) {
        if (e.keyCode === 13) {
            $(".btn").click();
        }
    });
});
