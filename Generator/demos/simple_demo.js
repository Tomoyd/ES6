function *helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending'
}
let hw=helloWorldGenerator()
console.log(hw)
console.log(1,hw.next())
console.log(2,hw.next())
console.log(3,hw.next())
console.log(4,hw.next())
hw.next()
hw.next()