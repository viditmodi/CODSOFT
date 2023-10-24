const createFooter = ()=>{

    

    const footer = document.getElementById("Footer")
    footer.classList.add("footer")

    footer.innerText = "QuillCraft Footer"

    const footerHeight = footer.offsetHeight


    
    
    const body = document.getElementsByTagName('body')[0]
    body.style.paddingBottom = `${footerHeight}px`
    return Promise.resolve()
}