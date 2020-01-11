const promise1=new Promise((resolve, reject) => {
    setTimeout(()=>{
        console.log("p1")
        reject(new Error("fail"))
    },3000)
})
const promise2=new Promise((resolve, reject) =>{
    console.log(9)
    setTimeout(()=>{resolve(promise1);console.log("p2")},100)
})

promise2.then(res=>{console.log(res)},err=>{console.log(err.message)})

/**
 * resolve 参数为Promise时候，状态的改变要等待参数的到来
 * resolved和rejected并不会终结Promise的执行
 * 一般resolve或者调用reject之后，Promise的使命就完结了，最好在resolve，reject前面加上return
* 9​
* p2
* p1
* fail
*/