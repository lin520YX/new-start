console.log(process.env.NODE_ENV) //development
// mac export NODE_ENV=xxx
// window set
// console.log(process.argv);
let args =process.argv.slice(2);
args=args.reduce((prev,next,currentIndex,arr)=>{
    if(next.includes('-')){
        prev[next.slice(1)]=arr[currentIndex+1]
    }
    return prev
},{})
console.log(args)