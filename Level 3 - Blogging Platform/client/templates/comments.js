const createCommentsSection = (container, data)=>{

    data.forEach(comment => {
        const commentContainer = document.createElement("div")
        commentContainer.innerText = comment.text
        console.log(comment)


        container.appendChild(commentContainer)
    });

}