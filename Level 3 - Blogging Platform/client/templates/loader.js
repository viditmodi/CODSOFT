const createLoader = (text="Loading")=>{
    const body = document.getElementsByTagName("body")[0];
    const loader = document.createElement("div")
    loader.classList.add("loader")
    loader.id = "loader";

    const loadingText = document.createElement("p")
    loadingText.textContent = text

    loader.appendChild(loadingText)
    body.appendChild(loader)
    // console.log("createLoader")

}


const removeLoader = ()=>{
    const body = document.getElementsByTagName("body")[0];
    const loader = document.getElementById("loader")
    body.removeChild(loader)
    // console.log("removeLoader")
}

