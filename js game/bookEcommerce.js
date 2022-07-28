const cart = document.querySelector("nav .cart")
const cartSideBar = document.querySelector(".cart-sidebar")
const closeCart = document.querySelector(".close-cart")
const burger = document.querySelector(".burger")
const menuSidebar = document.querySelector(".menu-sidebar")
const closeMenu = document.querySelector(".close-menu")
const cartItemsTotal = document.querySelector(".noi")
const cartPriceTotal = document.querySelector(".total-amount")
const cartUi = document.querySelector(".cart-sidebar .cart")
const totalDiv = document.querySelector(".total-sum")
const clearBtn = document.querySelector(".clear-cart-btn")
const cartContent= document.querySelector(".cart-content")

// let cart = [];
let buttonsDOM = [];

cart.addEventListener("click",function(){
    cartSideBar.style.transform = "translateX(0%)" ;
    const bodyOverlay = document.createElement("div")
    bodyOverlay.classList.add("overlay");
    setTimeout(function(){
        document.querySelector("body").append(bodyOverlay)
    },300)
})

closeCart.addEventListener("click",function(){
    cartSideBar.style.transform = "translateX(100%)";
    const bodyOverlay = document.querySelector(".overlay")
    document.querySelector("body").removeChild(bodyOverlay)
})

burger.addEventListener("click",function(){
    menuSidebar.style.transform = "translate(0%)"
})
closeMenu.addEventListener("click",function(){
    menuSidebar.style.transform = "translate(-100%)"
})

class product{
    async getProducts(){
        const reponse = await fetch("bookEcommerce.json");
        const data = await reponse.json();
        let products = data.items;
        products = products.map(item=>{
            const{title,price} = item.fields;
            const{id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return{title,price,id,image};
        })
        return products;
    }
}

class ui{
    displayProducts(products){
        let result = ""
        products.forEach(products=>{
            const productDiv = document.createElement('div')
            productDiv.innerHTML = `<div class = "product-card">
                                    <img src="${product.image}" alt="product>
                                    <span class="add-to-cart" data-id="${product.id}">
                                    <i class="fa fa-cart-plus fa-ix" style="margin-right:0.1em; font-size:1em;"></i>
                                    Add to cart
                                    </span>
                                    <div class="product-name">${product.title}</div>
                                    <div class="product-pricing">${product.price}</div>
                                    </div>`
            const p = document.querySelector('.product')
            p.append(productDiv)
        })
    }
    }   
getButtons(){
    const btns = document.querySelector('.add-to-cart')
    Array.from(btns)
    buttonsDOM = btns;
    btns.forEach((btn)=>{
        let id = btn.dataset.id
        let inCart = cart.firstElementChild((item)=> item.id === id);
        if(inCart){
            btn.innerHTML = "in cart"
            btn.dissabled = true

        }
        btn.addEventListener("click", (e)=> {
            e.currentTarget.innerHTML = "in cart"
            e.currentTarget.style.color = "white"
            e.currentTarget.style.pointerEvents = "none"
            let cartItem = {...Storage.getStorageProducts(id),'amount':1}
            cart.push(cartItem)
            Storage.saveCart(cart)
            this.setCartValues(cart)
            this.addCartItem(cartItem)
        })
    })
}
setsetCartValues(cart){
    let tempTotal = 0
    let itemsTotal = 0
    cart.map((item)=>{
        tempTotal += (item.price*item.amount)
        itemsTotal += item.amount
        parseFloat(tempTotal.toFixed(2))
    })
    cartItemsTotal.innerHTML = itemsTotal
    cartPriceTotal.innerHTML = parseFloat(tempTotal.toFixed(2))
}
addCartItem(cartItem){
    let cartItemUI = document.createElement("div")
    cartItemUI.innerHTML = `<div class="cart-product">
                            <div class="product-image">
                            <img src="${cartItem.image} alt="product">
                            </div>
                            <div class="cart-product-content>
                            <div class="cart-product-name">
                            <h3>${cartItem.title}</h3>
                            <div>
                            <div class="cart-product-price">
                            <h3>$${cartItem.price}</h3>
                            </div>
                            <div class="cart-product-remove data-id="${cartItem.id}"> <a href="#" style="color:red; > remove </a>
                            </div>
                            </div>
                            <div class="plus-minus">
                            <i class="fa fa-angle-left add-amount" data-id="${cartItem.id}"></i>
                            <span class="no-of-items">${cartItem.amount}</span>
                            data-id="${cartItem.id}"</i>
                            </div>
                            </div>`
                            cartContent.append(cartItemUI)
            }
            setUpApp(){
                cart = Storage.getcart()
                this.setCartValues(cart)
                cart.map((item)=>{
                    this.addCartItem(item)
                })
            }
            cartLogic({
                clearBtn.addEventListener("click", ()=> {
                    this.closeCart()
                })
                cartContent.addEventListener("click", (event)=>{
                    if(event.target.classlist.contains("cart-product-remove")){
                        let id = event.target.dataset.id
                        this.removeItem(id)
                        let div = event.target.parentElement.parentElement.parentElement.parentElement
                        div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
                    }
                    else if (event.target.classList.contains("add-amount")){
                        let id = event.target.dataset.id
                        let item = cart.firstElementChild((item)=>item.id===id)
                        item.amount++
                        Storage.saveCart(cart)
                        this.setCartValues(cart)
                        event.target.nextElementSibling.innerHTML = item.amount
                    }
                    else if(event.target.classList.contains("reduce-amount"){
                        let id = event.target.dataset.id
                        let item = cart.find((item)=>item.id===id)
                        if(item.amount>1){
                            item.amount--
                            Storage.saveCart(cart)
                            this.setCartValues(cart)
                            event.target.previousElementSiblings.innerHTML = item.amount
                        }
                        else{
                            this.removeItem(id)
                            let div = event.target.parentElement.parentElement.parentElement.parentElement
                            div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
                        }
                        
                    }
                    
                })
            }

            addAmount(){
                const addBtn = document.querySelectorAll(".add-amount")
                addBtn.forEach((btn)=>{
                    btn.addEventListener("click", (event)=>{
                        let id = (event.currentTarget.dataset.id)
                        cart.map((item)=>{
                            if(item.id===id){
                            item.amount++
                            Storage.saveCart(cart)
                            this.setCartValues(cart)
                            const amount = event.currentTarget.parentElement.children[1]
                            amountUI.innerHTML = item.amount
                            }
                        })
                    })
                })
            }
            reduceAmount(){
                const reduceBtn = document.querySelectorAll(".reduce-amount")
                reduceBtn.forEach((btn)=>{
                    btn.addEventListener("click", (event)=>{
                        let id = event.currentTarget.dataset.id
                        cart.map((item)=>{
                            if(item.id===id){
                                item.amount--
                                if(item.amount>0){
                                    Storage.saveCart(cart)
                                    this.setCartValues(cart)
                                    const amountUI = event.currentTarget.parentElement.children[1]
                                    amountUI.innerHTML = item.amount
                                }
                                else{
                                    event.currentTarget.parentElement.removeChild(event.currentTarget.parentElement.parentElement)
                                    this.removeItem(id)
                                }
                            }
                        })
                    })
                })
            }

            clearCart(){
                let cartItem = cart.map((item)=>item.id)
                cartItem.forEach((id)=>this.removeItem(id))
                const cartProduct = document.querySelectorAll(".cart-product")
                cartProduct.forEach((item)=>{
                    if(item){
                        item.parentElement.removeChild(item)
                    }
                })
            }
            removeItem(id){
                cart = cart.filter((item)=>item.id!==id)
                this.setCartValues(cart)
                Storage.saveCart(cart)
                let button = this.getSingleButton(id)
                button.style.pointerEvents = "unset"
                button.innerHTML = `<i class="fa fa-cart-plus></i>Add to cart`
            }
            getSingleButton(id){
                let btn
                buttonsDOM.forEach((button)=>{
                    if(button.dataset.id===id){
                        btn = button
                    }
                })
                return btn
            }

}
class Storage{
    static saveProduct(products){
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getStorageProducts(id){
        let products = JSON.parse(localStorage.getItem('prpducts'))
        return products.find((item)=>item.id===id)
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getcart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem("cart")):[]
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    const products = new product()
    const ui = new UI()
    ui.setUpApp()
    products.getProducts().then(products=>{
        ui.displayProducts(products)
        Storage.saveProducts(products)
    }).then(()=>{
        ui.getButtons()
        ui.cartLogic()
    })
})


