// 创建Promise会立即执行，接着执行完其他同步操作，最后执行then指定的回调函数
let promise=new Promise(resolve=>{
    console.log('Promise')
    resolve();
},reject=>{

})
promise.then(res=>{
    console.log(res,"1")
})
console.log('Hi')