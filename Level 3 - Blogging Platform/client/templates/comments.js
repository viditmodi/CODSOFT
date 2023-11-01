const createCommentsSection = (container, data)=>{

    data.forEach(comment => {
        const commentContainer = document.createElement("div")
        // commentContainer.innerText = comment.text
        commentContainer.classList.add("comments__card")
        // console.log(comment)

        const userContainer = document.createElement("div")
        userContainer.classList.add("comments__card__user")

        const userImageContainer = document.createElement("div")
        userImageContainer.classList.add("comments__card__user__image-container")
        const userImage = document.createElement("img")
        userImage.classList.add("comments__card__user__image")
        userImage.src = data.author? data.author.image_url : "/assets/images/default_blog.png"
        userImageContainer.appendChild(userImage)

        const userDataContainer = document.createElement("div")
        userDataContainer.classList.add("comments__card__user__data-container")
        
        const userName = document.createElement("p")
        userName.innerText = comment.user
        userName.classList.add("comments__card__user__data-name")
        const userDate = document.createElement("p")
        userDate.innerText = new Date(comment.createdAt).toLocaleDateString()
        userDate.classList.add("comments__card__user__data-date")

        userDataContainer.appendChild(userName)
        userDataContainer.appendChild(userDate)



        const commentTextTag = document.createElement("p")
        commentTextTag.classList.add("comments__text")
        commentTextTag.innerText = comment.text


        userContainer.appendChild(userImageContainer)
        userContainer.appendChild(userDataContainer)
        commentContainer.appendChild(userContainer)
        commentContainer.appendChild(commentTextTag)
        container.appendChild(commentContainer)
    });

}