const searchBar = (data) => {
  if (/^\s*$/.test(data)) {
    return alert("enter a valid string");
  }
  let searchQuery, searchType;
  data = data.split(":");
  if (data.length < 2) {
    searchType = "post";
    searchQuery = data[0];
  } else {
    searchType = data[0];
    searchQuery = data[1];
  }
  console.log(searchType, searchQuery);

  searchType = searchType.toLowerCase()
  searchQuery = searchQuery.toLowerCase()

  if(!["category", "blog", "author", "post"].includes(searchType)){
    return alert("invalid search param")
  }

  searchQuery = searchQuery
    .split(" ")
    .filter((ele) => ele !== "")
    .join(" ");


  window.location.href = `/pages/search.html?t=${searchType}&q=${searchQuery}`
};

const createHeader = (parentElement, data) => {
  //orange-f// Logo

  // const header = document.createElement('header')
  // header.classList.add("header")

  const logoContainer = document.createElement("div");
  logoContainer.classList.add("header__logo-container");

  const logoImage = document.createElement("img");
  logoImage.classList.add("banner__logo-image", "logo__image");
  logoImage.src = data.logoURL;

  const logoWebname = document.createElement("h2");
  logoWebname.classList.add("header__webname");
  logoWebname.innerText = "QuillCraft";

  logoContainer.appendChild(logoImage);
  logoContainer.appendChild(logoWebname);


  const headerSearchForm = document.createElement("form")
  headerSearchForm.classList.add("header__form")

  const headerSearchInput = document.createElement("input")
  const searchFormats = ["author:<<author name>>", "blog:<<blog title>>", "post:<<post title>>", "category:<<category name>>", "<<post title>>"]
  headerSearchInput.placeholder = searchFormats[Math.floor(Math.random()*searchFormats.length)]
  headerSearchInput.classList.add("header__textbox", "form__textbox")
  headerSearchInput.id="headerSearchBar"

  const headerSubmitButton = document.createElement("button")
  headerSubmitButton.type = "submit"
  headerSubmitButton.innerHTML = '<span class="material-symbols-outlined">search</span>'
  headerSubmitButton.classList.add("header__search__btn", "btn")

  headerSearchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    searchBar(headerSearchInput.value)
  })






  headerSearchForm.appendChild(headerSearchInput)
  headerSearchForm.appendChild(headerSubmitButton)


  const nav = document.createElement("nav");
  nav.classList.add("header__nav");
  const navList = document.createElement("ul");
  navList.classList.add("header__nav-list");

  // const navList = document.createElement('ul')
  data.navBarData.forEach((navData) => {
    const anchor = document.createElement("a");
    anchor.classList.add("header__nav-link");
    anchor.href = navData.link;
    anchor.innerText = navData.text;

    const listItem = document.createElement("li");
    listItem.classList.add("header__nav-item");
    // listItem.innerText = navData.text

    if (navData.active) {
      anchor.classList.add("header__nav-link--active");
    }

    listItem.appendChild(anchor);
    navList.appendChild(listItem);
  });

  nav.appendChild(navList);

  // header.appendChild(logoContainer)
  parentElement.classList.add("header");
  parentElement.appendChild(logoContainer);
  parentElement.appendChild(headerSearchForm);
  parentElement.appendChild(nav);

  return Promise.resolve()
};

// function createHeader(parentElement, data) {
//     return new Promise(function(resolve, reject) {
//       Header(parentElement, data)
//       resolve();
//     });
//   }
