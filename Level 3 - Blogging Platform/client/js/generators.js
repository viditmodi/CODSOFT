const randomStringGenerator = (num)=>{
    const alphabets = 'qazwsxedcfvgbyhnujmikolp'
    const small = alphabets
    const caps = alphabets.toUpperCase()
    const numbers = "9876543210"
    const special = "!@#$%&^"
    const allMerged = (small + numbers + caps).split("")
    console.log(allMerged)

    let str = ""
    for(let i=0; i<num; i++){
        str = str + allMerged[Math.floor(Math.random()*allMerged.length)]
        // str = str + allMerged[i]
    }
    return str
}
const blogIDGenerator = ()=>{
    return randomStringGenerator(40)
}
const postIDGenerator = ()=>{
    return randomStringGenerator(50)
}

// console.log(blogIDGenerator())