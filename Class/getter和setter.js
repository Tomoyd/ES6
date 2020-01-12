class GetterAndSetter{
    constructor(name) {
        this.val=name
    }
    get name(){
        return this.val
    }
    set name(val){
        this.val=val
    }
}
let handler=new GetterAndSetter("hu")
console.log(handler.name)
let descriptor=Object.getOwnPropertyDescriptor(GetterAndSetter.prototype,'name')
console.log(descriptor)
console.log("get" in descriptor)// true