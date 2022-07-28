// let people = document.querySelector(".people")

const url = "https://randomuser.me/api/?results=50"

fetch(url)
.then((Response)=> Response.json())
.then((data)=>{
    console.log(data)
    let persons = data.results
    console.log(persons)
    persons.map((person)=>{
        let people = document.querySelector(".people")
        // let image = document.createElement('img')
        let src = person.picture.large
        let firstName = person.name.first
        console.log(firstName)
        let lastName = person.name.last
        let more = "view more"

        let div = `<div class="card">
                    <div class="img" ><img src="${src}" alt=""></div>
                    <div class="info">
                    <div class="first">${firstName}</div>
                    <div class="last">${lastName}</div>
                    </div>
                    <button class="details">${more}</button>
                    </div>`

        let mainDiv = document.createElement('div')
        mainDiv.innerHTML = div
        // mainDiv.style.display="flex"
        people.appendChild(mainDiv)
        
    })
    // people.innerHTML = div
})
.catch(function(error){
    console.log(error)
})