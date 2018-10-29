let arr1 = [1,2,3,4];
let arr2 = [3,4,5,6];
let a =[...new Set(arr1)].filter(item=>{
    return new Set(arr2).has(item)
})
console.log(a)
