// Promise 基本用法
/**
 * 构造函数 Promise 用来生成Promise实例
 */


const promise = new Promise(function (resolve, reject) {
    let num = Math.random()
    if (num > 0.5) {
        resolve(1)  // resolve 将状态改变为成功，并异步操作的结果传递出去
        console.log(num)
    } else {
        console.log(num) // resolve 将状态改变为成功，并异步操作的失败错误，传递出去
        reject(0)
    }
})
promise.catch(e=>{
    console.log(e)
})
// 可以使用 then方法分别制定resolved和rejected状态的回调函数


