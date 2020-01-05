//事件驱动

/**
 * 事件驱动模型：也叫非阻塞事件驱动IO
 * 运行机制：
 * nodejs是一个单进程单线程的机制，所以不能同时并发完成更多的事情，只能通过事件回调来完成并发的效果。
 * 正式因为没有多线程那样多的额外工作，所以它的效率较高。
 * nodejs当中几乎所有的事件机制都是依据 观察者模式 来实现的。
 * 
 * EventLoop：
 * 事件队列：
 * EventEmitters：事件的产生者.它产生的实例就是事件对象。
 * 
 * 事件处理流程：
 * 1、引入events对象，创建eventEmitter对象
 * 2、绑定事件处理程序
 * 3、触发事件
 */

//1
const event = require('events');
const eventEmitter = new event.EventEmitter();

//2
const connectHandler = function connected() {
    console.log('connect被触发！！！');
};
eventEmitter.on('connection', connectHandler);

//3
eventEmitter.emit('connection');

console.log('程序执行完毕');