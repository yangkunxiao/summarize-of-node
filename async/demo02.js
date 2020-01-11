// timeout_vs_immediate.js

// setTimeout(() => {
//     console.log('timeout');
// }, 0);

// setImmediate(() => {
//     console.log('immediate');
// });
// process.nextTick(() => {
//     console.log('nextTick');
// });


/* console.log('1');

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
}); */

//预期：1，7，6，8，2，4，3，5，9，11，10，12

//结果：1，7，6，8，2，4，9，11，3，10，5，12



process.nextTick(function() {
    console.log('nextTick执行');
});
setImmediate(function() {
    console.log('setImmediate执行');
});
console.log('正常执行');

//预期结果：正常执行 nextTick执行 setImmediate执行
//因为事件循环的观察者的顺序有区别：process.nextTick的观察者处理idle阶段，而setImmediate的观察者处于poll阶段
//在每一轮的循环中。idle观察者先于I/O观察者，I/O观察者先于check观察者