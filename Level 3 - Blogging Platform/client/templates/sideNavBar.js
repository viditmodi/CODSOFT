const toggleSideNavBar = ()=>{
    const sideNavBarContainer = document.getElementById("sideNavBarContainer")
    // console.log("object")

    const width = sideNavBarContainer.offsetWidth
    console.log(width)
    if(width>0){
        sideNavBarContainer.style.width = "0%"
    }else{
        sideNavBarContainer.style.width = "100%"
    }
}


const createSideNavBar = (data)=>{
    const body = document.getElementsByTagName("body")[0];
    const toggleBtn = document.createElement("button")
    toggleBtn.classList.add("btn","btn__push","btn__push--focus","side-nav-bar__btn","side-nav-bar__btn--toggle")
    toggleBtn.innerHTML = '<span class="material-symbols-outlined">menu_open</span>'
    toggleBtn.onclick = toggleSideNavBar

    const navBarContainer = document.createElement("div")
    navBarContainer.classList.add("side-nav-bar__container")
    navBarContainer.id = "sideNavBarContainer"


    const navBar = document.createElement("div")
    navBar.classList.add("side-nav-bar")


    const navBarTop = document.createElement("div")
    navBarTop.classList.add("side-nav-bar__top")


    const webname = document.createElement("p")
    webname.innerText = "QuillCraft"

    const closeBtn = document.createElement("button")
    closeBtn.classList.add("btn","btn__push","btn__push--focus", "side-nav-bar__btn","side-nav-bar__btn--close")
    closeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>'
    closeBtn.onclick = toggleSideNavBar

    navBarTop.appendChild(webname)
    navBarTop.appendChild(closeBtn)

    navBar.appendChild(navBarTop)


    const navBarList = document.createElement("ul")
    navBarList.classList.add("side-nav-bar__list")


    data.forEach(item => {
        const navBarItem = document.createElement("li")
        navBarItem.classList.add("side-nav-bar__list-item")

        const navBarLink = document.createElement("a")
        navBarLink.classList.add("side-nav-bar__link")
        navBarLink.href = item.link
        navBarLink.innerText = item.text
        navBarLink.onclick = toggleSideNavBar
        
        if(item.active){
            navBarLink.classList.add("side-nav-bar__link--active")
        }


        navBarItem.appendChild(navBarLink)
        navBarList.appendChild(navBarItem)

    });

    navBar.appendChild(navBarList)
    navBarContainer.appendChild(navBar)


    body.appendChild(toggleBtn)
    body.appendChild(navBarContainer)



}