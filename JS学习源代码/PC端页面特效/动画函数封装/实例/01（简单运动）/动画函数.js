function simple(obj, target, callback) {
    clearInterval(obj.time);
    obj.time = setInterval(function () {
        var speed = (target - obj.offsetLeft) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (obj.offsetLeft == target) {
            clearInterval(obj.time);
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + speed + "px";
    }, 15);
}
