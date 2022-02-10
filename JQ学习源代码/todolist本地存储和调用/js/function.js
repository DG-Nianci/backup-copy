$(function () {
    //存储数据可以使用数组的方式，格式为 var todolist=[{title:'xxxx'(文本框的内容),done:false}]，默认为false
    //本地存储只能存储字符串数据格式，把我们的数组对象转换费字符串格式 JSON.stringify()
    //获取本地存储，需要把字符串数据转换为 对象格式 JSON.parse()
    //先按下回车，把数据存储到本地存储里面
    load();
    $("#title").on("keydown", function (e) {
        if (e.keyCode === 13) {
            //先读取本地存储数据
            var read = getData();
            // 把local数组进行更新数据 把最新的数据追加给local数组
            read.push({ title: $(this).val(), done: false });
            // 把这个数组read 存储给本地存储
            saveData(read);
            load();
        }
    });

    //读取本地存储的封装函数
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储的封装函数
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //渲染加载封装函数
    function load() {
        //读取本地数据
        var data = getData();
        //在遍历数据之前先清空ol
        $("ol,ul").empty();
        //正在进行的个数和已经完成的个数
        var todoCount = 0; //正在进行
        var doneCount = 0; //已经完成
        //遍历数据
        $.each(data, function (i, ele) {
            if (ele.done) {
                $("ul").prepend(
                    "<li><input type='checkbox' checked><p>" +
                        ele.title +
                        "</p><a data='" +
                        i +
                        "' href='javascript:;'></a></li>"
                );
                doneCount++;
            } else {
                $("ol").prepend(
                    "<li><input type='checkbox'><p>" +
                        ele.title +
                        "</p><a data='" +
                        i +
                        "' href='javascript:;'></a></li>"
                );
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
    //删除数据操作
    $("ol").on("click", "a", function () {
        //获取本地数据
        var data = getData();
        //获取当前索引号
        var index = $(this).attr("data");
        console.log(index);
        //修改数据
        data.splice(index, 1);
        //保存数据
        saveData(data);
        //渲染数据
        load();
    });
    //正在进行和已经完成选项操作
    $("ol, ul").on("click", "input", function () {
        //获取本地数据
        var data = getData();
        //修改数据
        var index = $(this).siblings("a").attr("data");
        data[index].done = $(this).prop("checked");
        //保存数据
        saveData(data);
        //渲染数据
        load();
    });
});
