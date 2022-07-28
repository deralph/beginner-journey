const result = document.getElementById("result")
const filter = document.getElementById("filter") 
const listItems = []


filter.addEventListener("input", (e)=> filterData(e.target.value))

async function getData(){
    const res = await fetch("https://randomuser.me/api/?results=50")
    // const data = await res.json() or make it faster by

    const {results} = await res.json()
    // console.log(data)
    console.log(results)

    // clear result
    result.innerHTML = ""

    results.forEach(user => { 
        // console.log(user)
        const li = document.createElement('li')

        listItems.push(li)
        console.log(listItems)

        li.innerHTML = `<img src="${user.picture.large}" alt="${user.name.first}">
                        <div class="user-info">
                        <h4>${user.name.first} ${user.name.last}</h4>
                        <p>${user.location.city}, ${user.location.country}
                        </div>`

        result.appendChild(li)

    });

}
getData()

function filterData(searchTerm){
    // console.log(searchTerm)

    listItems.forEach(items => {
        if(items.innerText.toLowerCase().includes(searchTerm.toLowerCase())){
            items.classList.remove('hide')
        }
        else{
            items.classList.add('hide')
        }
    })
}