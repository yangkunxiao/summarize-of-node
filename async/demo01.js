// console.log('1');

// function fn1(){
// 	console.log('2');
// 	return new Promise((resolve,reject) => {
// 		setTimeout(() => {
// 			resolve('3')
// 		},5000)
// 	})
// };

// new Promise(async (resolve,reject) => {
// 	let s = await fn1();
// 	console.log(s);
// 	console.log('4');
// });

// Promise.resolve().then(function(){
// 	console.log('6');
// }).then(function(){
// 	console.log(7);
// })

// console.log('5');

//1 2 5 3 4
// let startTime = new Date().getTime();
// console.log(startTime);
// setTimeout(() => {
// 	console.log(new Date().getTime() - startTime);
// },1000);

// for (let i = 0;i < 10 ; i++) {
// 	console.log('0');
// }

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
    Promise.resolve().then(function() {
        console.log('promise3');
    })
}, 0);

Promise.resolve().then(function() {
    console.log('promise1');
    setTimeout(function() {
        console.log('setTimeout2');
    }, 0)
}).then(function() {
    console.log('promise2');
    setTimeout(function() {
        console.log('setTimeout3');
    }, 0)
});

console.log('script end');
/**
 * 预期：
 * script start
 * script end
 * promise1
 * promise2
 * setTimeout
 * promise3
 * setTimeout2
 * setTimeout3
 * */