function getAPI() {
    $.ajax({
        type: "get",
        url: "http://www.liulongbin.top:3006/api/cmtlist",
        success: function (res) {
            if (res.status !== 200) return alert("获取评论失败");
            var row = [];
            $.each(res.data, function (i, ele) {
                var str =
                    "<li class='list-group-item'><span class='badge' style='background-color: #f0ad4e'>评论时间：" +
                    ele.time +
                    "</span><span class='badge' style='background-color: #5bc0de'>评论人：" +
                    ele.username +
                    "</span>" +
                    ele.content +
                    "</li>";

                row.push(str);
            });
            $("#cmt-list").empty().append(row.join(" "));
        },
    });
}

getAPI();

$(function () {
    $(".panel-body").submit(function (e) {
        e.preventDefault();
        var text = $(this).serialize();
        $.ajax({
            type: "post",
            url: "http://www.liulongbin.top:3006/api/addcmt",
            data: text,
            success: function (res) {
                if (res.status !== 201) return alert("发布评论失败");
                getAPI();
                //把jquery对象转换为DOM对象，使用[0]
                $(".panel-body")[0].reset();
            },
        });
    });
});
