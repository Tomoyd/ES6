let getJSON=(url)=>{
    return new Promise((resolve, reject) => {
        const handler=function () {
            if(this.readyState!==4){
                return
            }
            if(this.status===200){
                resolve(this.response)
            }else{
                reject(new Error(this.statusText))
            }
        }
        const client=new XMLHttpRequest()
        client.open("GET",url)
        client.onreadystatechange=handler
        client.responseType="json";
        client.setRequestHeader("Accept","application/json")
        client.send()
    })
};
getJSON("./test.json").then(res=>{console.log(res),err=>{console.log(err)}})