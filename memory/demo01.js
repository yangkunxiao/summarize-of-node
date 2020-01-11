/**
 * 查看内存：
 * node > process.memoryUsage():
 *      rss:resident set size 的缩写，即常驻内存的大小，进程的内存分为：一部分在rss中，剩下的在交换区swap或者文件系统中
 *      heapTotal和heapUsed对应的是V8的堆内存中。
 *      heapTotal:堆中总共申请的内存
 *      heapUsed:目前堆中已使用的内存
 *      external:
 */
var showMem = function() {
    var mem = process.memoryUsage();
    var format = function(bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };
    console.log('Process: heapTotal ' + format(mem.heapTotal) +
        ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('-----------------------------------------------------------');
};
//写一个方法始终分配内存但不释放内存
var useMem = function() {
    var size = 20 * 1024 * 1024;
    // var arr = Buffer.alloc(size);
    //Buffer对象不同与其他对象，它不经过V8的内存机制分配内存，所以也不会有堆内存的大小限制
    //Node的内存主要有V8分配的内存和Node自行分配的内存组成。只有由V8分配的堆内存才会受V8的垃圾回收机制的控制。
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = 0;
    }
    return arr;
};
var total = [];
for (var j = 0; j < 15; j++) {
    showMem();
    total.push(useMem());
}
showMem();


/**
 * 内存泄漏：
 * 1、缓存
 * 2、队列消费不及时
 * 3、作用域释放不及时
 */