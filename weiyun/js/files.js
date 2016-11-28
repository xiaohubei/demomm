
function File(dataList) {
    this.dataList = [];
    this.length = dataList.length;

    this.init(dataList);
}
File.prototype.init = function(dataList) {
    for (var i=0; i<dataList.length; i++) {
        this.dataList[dataList[i].id] = dataList[i];
    }
}
File.prototype.getChildren = function(id) {
    var arr = [];
    for (var i in this.dataList) {       //这也是循环？
        if (this.dataList[i].pid == id) {
            arr.push(this.dataList[i]);
        }
    }
    return arr;
}
File.prototype.isParent = function(id) {
    return !!this.getChildren(id).length;
}
File.prototype.getInfo = function(id) {

}