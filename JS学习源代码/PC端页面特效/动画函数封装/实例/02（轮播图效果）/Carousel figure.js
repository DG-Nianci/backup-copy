window.addEventListener("DOMContentLoaded", function () {
    var div = document.querySelector(".a1");
    var left = document.querySelector(".left");
    var cleft = document.querySelector(".cleft");
    var right = document.querySelector(".right");
    var aright = right.nextElementSibling;

    //鼠标经过第v停止定时器，离开开启定时器
    div.addEventListener("mouseover", function () {
        clearInterval(time);
        time = null;
    });
    div.addEventListener("mouseout", function () {
        time = setInterval(function () {
            //手动调用函数
            aright.click();
        }, 3000);
    });

    //左侧按钮
    left.addEventListener("mouseover", function () {
        cleft.style.display = "block";
    });
    left.addEventListener("mouseout", function () {
        cleft.style.display = "none";
    });
    cleft.addEventListener("mouseover", function () {
        cleft.style.display = "block";
    });
    cleft.addEventListener("mouseout", function () {
        cleft.style.display = "none";
    });

    //右侧按钮
    right.addEventListener("mouseover", function () {
        aright.style.display = "block";
    });
    right.addEventListener("mouseout", function () {
        aright.style.display = "none";
    });
    aright.addEventListener("mouseover", function () {
        aright.style.display = "block";
    });
    aright.addEventListener("mouseout", function () {
        aright.style.display = "none";
    });

    //小圆圈和滚动图片所有事件
    //滚动图片核心算法，索引号*图片宽度

    //先获取包含滚动图片和小圆圈的div
    var center = document.querySelector(".center");
    //用获取的div来获取图片的ul
    var ul = center.querySelector("ul");
    //用获取的ul来获取ul里面的img
    var img = ul.querySelector("img");
    //用获取的div来获取小圆圈的ol
    var ol = center.querySelector("ol");
    //获取ul所有子元素
    var ali = ul.children;
    //每个图片的宽度
    var imgWidth = img.offsetWidth;
    //用for循循环，循环ul里面的所有子元素
    for (var i = 0; i < ali.length; i++) {
        //每循环一次就在ol里面添加一个li
        //添加li节点
        var li = document.createElement("li");
        //记录小圆圈当前索引号
        li.setAttribute("index", i);
        //把新添加的li节点插入ol
        ol.appendChild(li);
        //直接用新插入的li做排他思想
        li.addEventListener("click", function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            this.className = "color";

            //获取每个li的自定义属性
            var index = this.getAttribute("index");
            //当我们点击哪个小圆圈就要把索引号给num
            num = index;
            //当我们点击哪个小圆圈就需要把索引号给circle
            circle = index;
            //使用动画函数实现滚动
            simple(ul, -(index * imgWidth + 40));
        });
    }
    //给ol里面第一个li添加样式
    ol.children[0].className = "color";

    //克隆ul第一个图片放到最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //声明一个变量
    var num = 0;
    //声明一个控制小圆圈播放的变量
    var circle = 0;
    //节流阀
    var flag = true;

    //点击右侧实现图片滚动
    aright.addEventListener("click", function () {
        if (flag) {
            flag = false; //关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            simple(ul, -(num * imgWidth + 40), function () {
                flag = true; //打开节流阀
            });
            //小圆圈播放
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            //继续排他思想
            fn();
        }
    });

    //获取整个盒子的宽度
    box = div.offsetWidth;

    //点击左侧实现图片滚动
    cleft.addEventListener("click", function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * box + "px";
            }
            num--;
            simple(ul, -(num * imgWidth + 40), function () {
                flag = true;
            });
            //小圆圈播放
            circle--;
            if (circle < 0) {
                circle = 3;
            }
            //继续排他思想
            fn();
        }
    });
    function fn() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        ol.children[circle].className = "color";
    }

    //自动播放轮播图
    var time = setInterval(function () {
        //手动调用函数
        aright.click();
    }, 3000);
});
