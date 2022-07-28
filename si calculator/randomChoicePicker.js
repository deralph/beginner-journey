const tagsl = document.getElementById("tags")
const textArea = document.getElementById("textArea")

textArea.focus()

textArea.addEventListener("keyup", (e)=>{
    createTags(e.target.value)

    if(e.key === "enter"){

        setTimeout(() => {
            e.target.value = ""
        },100)
        randomSelect()
    }
    // console.log("noticed")
})
// textArea.onkeyup= 

function createTags(input){
    // console.log(input)
    const tags = input.split(",").filter(tag => tag.trim() !== " " ).map(tag => tag.trim())
    // console.log(tags)

    tagsl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagEl.appendChild('tagEl')
    })
}

function randomSelect(){
    console.log(123)
}