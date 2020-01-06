/**
 * Node EventLoop：
 * Node中的Event Loop是基于libuv实现的，
 * 而libuv是 Node 的新跨平台抽象层，libuv使用异步，
 * 事件驱动的编程方式，核心是提供i/o的事件循环和异步回调。libuv的API包含有时间，非阻塞的网络，异步文件操作，子进程等等。
 * 
 * nodejs的event是基于libuv，而浏览器的event loop则在html5的规范中明确定义。
 * 
 * Node中的EventLoop分为6个阶段：
 * 1、timers：执行setTimeout() 和 setInterval()中到期的callback。
 * 2、pending callback: 上一轮循环中有少数的I/O callback会被延迟到这一轮的这一阶段执行
 * 3、idle, prepare：仅内部使用
 * 4、poll: 最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段
 * 5、check: 执行setImmediate的callback
 * 6、close callbacks: 执行close事件的callback，例如socket.on('close'[,fn])、http.server.on('close, fn)
 */

// timeout_vs_immediate.js
/**
 * setImmediate：在 poll 阶段后执行，即check 阶段
 * setTimeout 在 poll 空闲时且设定时间到达的时候执行，在 timer 阶段
 * process.nextTick（）在同一阶段立即触发
 */
// setTimeout(() => {
//     console.log('timeout');
// }, 0);

// setImmediate(() => {
//     console.log('immediate');
// });
// process.nextTick(() => {
//     console.log('nextTick');
// });


console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
});

//预期：1，7，6，8，2，4，3，5，9，11，10，12

//结果：1，7，6，8，2，4，9，11，3，10，5，12