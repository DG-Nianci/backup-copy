$(function () {
    function getAPI() {
        $.ajax({
            type: "get",
            url: "http://www.liulongbin.top:3006/api/news",
            success: function (res) {
                if (res.status !== 200) return alert("获取新闻列表失败");
                //把字符串改为字符串数的组中间用逗号隔开
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].tags = res.data[i].tags.split(",");
                }
                var addHtml = template("art", res);
                $("#news-list").html(addHtml);
            },
        });
    }
    getAPI();
    template.defaults.imports.getTimes = function (times) {
        var time = new Date(times);

        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var h = time.getHours();
        h = h < 10 ? "0" + h : h;
        var m = time.getMinutes();
        m = m < 10 ? "0" + m : m;
        var s = time.getSeconds();
        s = s < 10 ? "0" + s : s;

        return year + "-" + month + "-" + date + " " + h + ":" + m;
    };
});
