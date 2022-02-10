function regular(id, data) {
    var str = document.getElementById(id).innerHTML;
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/;
    var Ret = null;
    while ((Ret = pattern.exec(str))) {
        str = str.replace(Ret[0], data[Ret[1]]);
    }
    return str;
}
