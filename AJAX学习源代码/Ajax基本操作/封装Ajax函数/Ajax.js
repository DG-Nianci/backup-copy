//处理data函数的方法
function intoData(data) {
    var arr = [];
    for (var k in data) {
        var str = k + "=" + data[k];
        arr.push(str);
    }
    return arr.join("&");
}

function Ajax(ele) {
    var xhr = new XMLHttpRequest();

    var qs = intoData(ele.data);

    //判断用户发起的是GET还是POST请求
    if (ele.method.toUpperCase() === "GET") {
        //发起GET请求
        xhr.open(ele.method, ele.url + "?" + qs);
        xhr.send();
    } else if (ele.method.toUpperCase() === "POST") {
        //发起POST请求
        xhr.open(ele.method, ele.url);
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        xhr.send(qs);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            ele.success(json);
        }
    };
}
