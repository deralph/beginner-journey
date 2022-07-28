// class product{
async function getPeople(){
    const url = "https://randomuser.me/api/?results=50"
    const Response = await fetch(url)
    const data = await Response.json()
     console.log(data)
 let peoples = data.results
 console.log(peoples)

 peoples.map(people => {
     let imgSrc = people.picture.large
     let firstName = people.name.first
     let lastName = people.name.last
     let find = "Check Details"

     let div = `<div class="card">
                <img src="${imgSrc}" alt="">
                <div class="info">
                <div>${firstName}</div>
                <div>${lastName}</div>
                <button>${find}</button>
                </div>`
    let bigDiv = document.createElement('div')
    bigDiv.innerHTML = div
    console.log(bigDiv)
    const product = document.querySelector('.product')
    product.appendChild(bigDiv)

    })
}
getPeople()
// }
// let trial = new product()
// console.log(trial)