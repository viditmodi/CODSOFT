const createPost = (container, data) => {
    const navigator = document.getElementById("postNavigator")
  container.classList.add("post__container");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title");
  postTitle.textContent = data.title;

  const postThumbnailContainer = document.createElement("div");
  postThumbnailContainer.classList.add("post__thumbnail__container");
  const postThumbnail = document.createElement("img");
  postThumbnail.classList.add("post__thumbnail");
  postThumbnail.src = data.thumbnail;
  postThumbnailContainer.appendChild(postThumbnail);

  const postDesc = document.createElement("p");
  postDesc.classList.add("post__desc");
  postDesc.textContent = data.desc;

  const hline = document.createElement("hr")
  hline.classList.add("post__hline")


  container.appendChild(postTitle);
  // append the metadata
  container.appendChild(postThumbnailContainer);
  container.appendChild(postDesc);
  container.appendChild(hline);

  data.data.forEach((element) => {
    console.log(element);
    switch (element.type) {
      case "heading":
        const postHeading = document.createElement("h3");
        postHeading.classList.add("post__heading");
        postHeading.textContent = element.data;

        container.appendChild(postHeading);


        const link = document.createElement("a")
        link.classList.add("post-navigator__link")
        link.textContent = element.data
        link.href = window.location.href + "#" + element.data.toLowerCase().split(" ").join("-")
        link.id = element.data.toLowerCase().split(" ").join("-")

        navigator.appendChild(link)
        break;
      case "text":
        const postText = document.createElement("p");
        postText.classList.add("post__text");
        postText.textContent = element.data;

        container.appendChild(postText);
        break;
      case "image":
        const postImage = document.createElement("img");
        postImage.classList.add("post__image");
        postImage.src = element.data;
        container.appendChild(postImage);
        break;

      default:
        break;
    }
  });
};
