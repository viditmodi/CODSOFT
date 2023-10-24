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
  parentElement.appendChild(nav);

  return Promise.resolve()
};

// function createHeader(parentElement, data) {
//     return new Promise(function(resolve, reject) {
//       Header(parentElement, data)
//       resolve();
//     });
//   }
