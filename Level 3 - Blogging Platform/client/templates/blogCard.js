// const categoryColors = {
//   travel: {
//     bg: "#2ca58d", // Background color
//     text: "#ffffff", // Text color (white)
//   },
//   food: {
//     bg: "#2ca58d",
//     text: "#ffffff",
//   },
//   health: {
//     bg: "#2ca58d",
//     text: "#ffffff",
//   },
//   technology: {
//     bg: "#3a84e0",
//     text: "#ffffff",
//   },
//   finance: {
//     bg: "#3a84e0",
//     text: "#ffffff",
//   },
//   education: {
//     bg: "#531dab",
//     text: "#ffffff",
//   },
//   art: {
//     bg: "#531dab",
//     text: "#ffffff",
//   },
//   entertainment: {
//     bg: "#e74c3c",
//     text: "#ffffff",
//   },
//   gaming: {
//     bg: "#e74c3c",
//     text: "#ffffff",
//   },
//   lifestyle: {
//     bg: "#4b4b4b",
//     text: "#ffffff",
//   },
//   animals: {
//     bg: "#4b4b4b",
//     text: "#ffffff",
//   },
//   fashion: {
//     bg: "#f4d03f",
//     text: "#000000",
//   },
//   motivation: {
//     bg: "#f4d03f",
//     text: "#000000",
//   },
//   general: {
//     bg: "#00ff00",
//     text: "#ffffff",
//   },
// };

const createBlogCard = (parent, data) => {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("blog-gallery__grid__card");

  

  // orange-f// FRONT FACE
  const cardFrontFace = document.createElement("div");
  cardFrontFace.classList.add("blog-gallery__grid__card--front");

  //green-f// IMAGE Container settings
  const frontImageContainer = document.createElement("div");
  frontImageContainer.classList.add(
    "blog-gallery__grid__card__image-container"
  );
  const frontImage = document.createElement("img");
  frontImage.classList.add("blog-gallery__grid__card__image");
  frontImage.src = data.thumbnail;
  // frontImage.src = "https://images.unsplash.com/photo-1598124146163-36819847286d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8anBnfGVufDB8fDB8fHww&w=1000&q=80"

  //blue-f// Image ready
  frontImageContainer.appendChild(frontImage);

  //green-f// Content settings
  const frontContent = document.createElement("div");
  frontContent.classList.add("blog-gallery__grid__card__content");

  const frontTitle = document.createElement("h4");
  frontTitle.classList.add("blog-gallery__grid__card__title");
  frontTitle.innerText = data.title;

  frontContent.appendChild(frontTitle);

  const frontDesc = document.createElement("p");
  frontDesc.classList.add("blog-gallery__grid__card__desc");
  frontDesc.innerText = data.desc.slice(0, 200);

  frontContent.appendChild(frontDesc);

  const authorDetailContainer = document.createElement("div");
  authorDetailContainer.classList.add("blog-gallery__grid__card__author");

  const authorImageContainer = document.createElement("div");
  authorImageContainer.classList.add(
    "blog-gallery__grid__card__author__image-container"
  );
  const authorImage = document.createElement("img");
  authorImage.classList.add("blog-gallery__grid__card__author__image");

  authorImage.src = data.author.image;
  // authorImage.src = "https://images.unsplash.com/photo-1524550158212-33f2ff985344?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"

  //blue-f// Image ready
  authorImageContainer.appendChild(authorImage);

  const authorName = document.createElement("p");
  authorName.classList.add("blog-gallery__grid__card__author__name");
  authorName.innerText = data.author.name;

  authorDetailContainer.appendChild(authorImageContainer);
  authorDetailContainer.appendChild(authorName);

  frontContent.appendChild(authorDetailContainer);

  cardFrontFace.appendChild(frontImageContainer);
  cardFrontFace.appendChild(frontContent);

  // orange-f// BACK FACE

  const cardBackFace = document.createElement("div");
  cardBackFace.classList.add("blog-gallery__grid__card--back");

  const backCategory = document.createElement("div");
  backCategory.classList.add("blog-gallery__grid__card__category");
  backCategory.innerText = data.category;
//   console.log(categoryColors[data.category.toLowerCase()])
  backCategory.style.backgroundColor = categoryColors[data.category.toLowerCase()].bg;
  backCategory.style.color = categoryColors[data.category.toLowerCase()].text;

  const metaContainer = document.createElement("div");
  metaContainer.classList.add("blog-gallery__grid__card__meta");

  const metaDataJson = [
    {
      icon: "calendar_month",
      text: "date.........................",
      data: `${new Date(data.metadata.publishedDate).toLocaleDateString()}`,
    },
    {
      icon: "thumb_up",
      text: "likes.........................",
      data: `${data.metadata.likes}`,
    },
    {
      icon: "visibility",
      text: "views.........................",
      data: `${data.metadata.views}`,
    },
    {
      icon: "comment",
      text: "comments.........................",
      data: `${data.metadata.comments}`,
    },
  ];

  metaDataJson.forEach((meta) => {
    const metadata = document.createElement("p");
    metadata.classList.add("blog-gallery__grid__card__metadata");

    const metaDataIcon = document.createElement("span");
    metaDataIcon.classList.add("material-symbols-outlined");
    metaDataIcon.innerText = meta.icon;

    metadata.appendChild(metaDataIcon);

    // const metaDataText = document.createElement("span");
    // metaDataText.innerText = meta.text;

    // metadata.appendChild(metaDataText);

    const metaDataData = document.createElement("span");
    metaDataData.innerText = `${meta.data} .....................................................`;

    metadata.appendChild(metaDataData);

    metaContainer.appendChild(metadata);
  });

  const readMoreBtn = document.createElement("a");
  readMoreBtn.href = `/pages/user/posts.html?blogid=${data.blogID}`;
  console.log(`/pages/blog.html?blogid=${data.blogID}`);
  readMoreBtn.textContent = "see posts";
  readMoreBtn.classList.add("btn", "btn__push", "btn__push--focus");

  cardBackFace.appendChild(backCategory);
  cardBackFace.appendChild(metaContainer);
  cardBackFace.appendChild(readMoreBtn);

  cardContainer.appendChild(cardFrontFace);
  cardContainer.appendChild(cardBackFace);

  parent.appendChild(cardContainer);

  const cardWidth = cardContainer.offsetWidth;
  console.log(cardWidth)
  const parentWidth = parent.offsetWidth;
  console.log(parentWidth)


  // frontTitle.style.fontSize = `${cardWidth/11}px`
  // frontDesc.style.fontSize = `${cardWidth/19}px`
  // authorName.style.fontSize = `${cardWidth/19}px`
  

  // const metadataArray = document.getElementsByClassName("blog-gallery__grid__card__metadata")

};
