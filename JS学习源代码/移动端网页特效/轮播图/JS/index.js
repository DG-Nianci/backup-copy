window.addEventListener("load", function () {
    var div = document.querySelector("div");
    var ul = div.children[0];
    var ol = div.children[1];

    var w = div.offsetWidth; //获取div的宽度
    var num = 0;
    var time = setInterval(function () {
        num++;
        var left = -num * w;
        ul.style.transition = "all .3s"; //过度效果
        ul.style.transform = "translateX(" + left + "px)";
    }, 2000);

    //等过渡完成后再去判断，监听过渡完成事件 transitionend
    ul.addEventListener("transitionend", function () {
        //无缝滚动
        if (num >= 3) {
            num = 0;
            //去掉过渡效果
            ul.style.transition = "none";
            //利用最新的索引号来乘以宽度，滚动图片
            var left = -num * w;
            ul.style.transform = "translateX(" + left + "px)";
        } else if (num < 0) {
            num = 2;
            ul.style.transition = "none";
            //利用最新的索引号来乘以宽度，滚动图片
            var left = -num * w;
            ul.style.transform = "translateX(" + left + "px)";
        }

        //小圆点变化
        //获取ol里面带有类名的li
        ol.querySelector(".color").classList.remove("color");
        //让当前索引号 的li 加上 类名
        ol.children[num].classList.add("color");
    });

    //手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    var flag = false; //判断用户手指是否移动
    //获取手指初始位置
    ul.addEventListener("touchstart", function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(time);
    });
    //计算手指的滑动距离，并且移动盒子
    ul.addEventListener("touchmove", function (e) {
        //计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        var left = -num * w + moveX;
        //手指拖动时不需要动画效果
        ul.style.transition = "none";
        ul.style.transform = "translateX(" + left + "px)";
        flag = true; //用户手指移动了
        e.preventDefault(); //取消默认行为
    });

    //手指离开时，根据移动距离去判断是回弹还是播放上一张或者下一张
    ul.addEventListener("touchend", function (e) {
        //判断用户手指是否移动flag=true，是移动了，如果为false，是没有移动
        if (flag) {
            //如果移动距离大于50像素我们就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                //如果是右滑，播放上一张 moveX是正值
                if (moveX > 0) {
                    num--;
                } else {
                    //如果是左滑，播放下一张 moveX是负值
                    num++;
                }
                var left = -num * w;
                ul.style.transition = "all .3s";
                ul.style.transform = "translateX(" + left + "px)";
            } else {
                var left = -num * w;
                ul.style.transition = "all .3s";
                ul.style.transform = "translateX(" + left + "px)";
            }
        }

        clearInterval(time);
        time = setInterval(function () {
            num++;
            var left = -num * w;
            ul.style.transition = "all .3s"; //过度效果
            ul.style.transform = "translateX(" + left + "px)";
        }, 2000);
    });
});
