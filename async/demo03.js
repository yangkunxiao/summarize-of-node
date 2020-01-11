// 题目一：
//随机
// setTimeout(() => {
//     console.log('setTimeout')
// }, 0)
// setImmediate(() => {
//     console.log('setImmediate')
// });


// 题目二：
//nextTick promise
/* const promise = Promise.resolve()
promise.then(() => {
    console.log('promise')
})
process.nextTick(() => {
    console.log('nextTick')
}); */

// 题目三：
//2 3 5 4 1
/* setTimeout(() => {
    console.log(1)
}, 0)
new Promise((resolve, reject) => {
    console.log(2)
    for (let i = 0; i < 10000; i++) {
        i === 9999 && resolve()
    }
    console.log(3)
}).then(() => {
    console.log(4)
})
console.log(5); */

// 题目四
//无限循环
/* setInterval(() => {
    console.log('setInterval')
}, 100)
process.nextTick(function tick() {
    process.nextTick(tick)
}) */


/**
 * 在NodeJS中执行宏任务队列回调的阶段有六个：
 * timers :执行setTimeout 和 setInterval 预定的回调函数
 * I/O callbacks：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks
 * idle prepare：仅共Node内部使用
 * poll：获取新的I/O事件，适当的情况下Node会阻塞到这个阶段
 * check：执行setImmediate的回调函数
 * close：执行socket.on('close',callback)的回调函数
 */

/**
 * NodeJS中的宏任务队列：
 * Timer Queue
 * I/O Callbacks Queue
 * Check Queue
 * Close Queue
 * 
 * 微任务队列：
 * Process.nextTick Queue
 * Other Micro Queue
 */

/**************************************** setTimeOut VS setImmediate *************************************/

//同步代码中调用 setTimeOut setImmediate
/**
 * 同步代码执行完之后，如果timer到了，则先将setTimeout的回调注册到Timers Queue中，
 * 然后执行到setImmediate，再将它的回调注册到check Queue中。
 * 
 * 如果同步代码执行完之后，timer并没有到，那么则将setImmediate先注册到check Queue中，
 * 然后执行微任务，然后宏任务，执行Timer Queue，等待timer到期，timer的回调注册到Timer Queue中，等待
 * 下一次循环执行。
 * 
 */
/* setImmediate(() => {
    console.log('setImmediate')
});
setTimeout(() => {
    console.log('setTimeout')
}, 0) */

/**
 * 异步代码中，setImmediate回调会注册到check Queue中，setTimeout回调会注册到Timer回调中，
 * I/O Queue执行完之后会执行check Queue，Timer Queue要等到下一个周期才会执行。
 * 所以 setImmediate永远会先于setTimeout执行
 */
/* const fs = require('fs');

fs.open('../test/02.txt', 'r+', (err, fd) => {
    if (err) throw err;
    setTimeout(() => {
        console.log('setTimeout')
    }, 0)
    setImmediate(() => {
        console.log('setImmediate')
    });
}) */


/**************************************** setTimeOut VS process.nextTick *************************************/
/**
 * setTimeout回调注册在 Timers Queue阶段，
 * process.nextTick回调注册在next tick Queue
 */
/* const fs = require('fs');
setTimeout(() => {
    console.log('setTimeout')
}, 0);

process.nextTick(() => {
    console.log('nextTick')
});


fs.open('../test/02.txt', 'r+', (err, fd) => {
    if (err) throw err;
    setTimeout(() => {
        console.log('setTimeout')
    }, 0);
    process.nextTick(() => {
        console.log('nextTick')
    });
}) */

setTimeout(() => {
    console.log('setTimeout')
}, 0)

setImmediate(() => {
    console.log('setImmediate')
})