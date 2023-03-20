//separação por tag
const acessorios =[]
const calcados =[]
const camisetas =[]

function separate(list) {
    
    for(let i = 0; i < list.length; i++){
        let tag = []
         tag = list[i].tag

        if ( tag[0] == "Acessórios" ) {
            acessorios.push(list[i])
        }else if (tag[0] == "Calçados") {
            calcados.push(list[i])
        }else {camisetas.push(list[i])}
    }
    return {acessorios, calcados, camisetas}
}
let obj = separate(data)

//contagem de quantidade
let  productCount = 0
let valueCount = 0


//criação vitrine
const ulShowcase = document.querySelector(".showcase")

function cards(list) {
    ulShowcase.innerHTML = ""
    
    for(let i = 0; i < list.length; i++){
        let indice = list[i]
        
        //ul > li
        let li = document.createElement("li")
        ulShowcase.appendChild(li)
        li.id = `product${indice.id}`
        li.classList.add("cardProduct")
        
        //li > img
        let img = document.createElement("img")
        li.appendChild(img)
        img.src = indice.img
        
        // li > span(type)
        let span = document.createElement("span")
        li.appendChild(span)
        span.classList.add("typeProduct")
        span.innerHTML = indice.tag[0]

        //li > div > h3(mame)
        let hThree = document.createElement("h3")
        li.appendChild(hThree)
        hThree.classList.add("nameProduct")
        hThree.innerHTML = indice.nameItem
        
        //li > p(description)
        let p = document.createElement("p")
        let div = document.createElement("div")
        li.appendChild(div)
        div.appendChild(p)
        div.classList.add("description")
        p.innerText = indice.description
        
        //li > p(price)
        let pTwo = document.createElement("p")
        li.appendChild(pTwo)
        pTwo.classList.add("price")
        pTwo.innerText = `R$ ${indice.value},00`
        
        //li > button
        let button = document.createElement("button")
        li.appendChild(button)
        button.classList.add("carButton")
        button.id = `button${indice.id}`
        button.innerHTML= "Adicionar ao carrinho"

       
          //evento adicionar no carrinho
          button.addEventListener("click", function (e){
        
          //configuração
          idCar = e.target.id
          let id = idCar.substring(6)
          let product = carFilter(id)
           cardsCar(product)
          

           
          //deletando titulo e paragrafo 
            document.querySelector(".cart-empty").style.display = "none"
        
          //contagens
          productCount++
          document.querySelector("#productCount").innerHTML = `${productCount}`
          
          valueCount += indice.value
            document.querySelector("#valueCount").innerHTML = `R$${valueCount},00`
           })
    
    }
}
cards(data)



//Filtro para  carrinho
function carFilter(id) {
    for( let i = 0; i < data.length; i ++){
        if (data[i].id == id) {
            return data[i]
        }
    }
}


//cards carrinho
// div > ul (global)
const divCar = document.querySelector(".cart-empty")
const ulCar = document.querySelector(".cart-list")
ulCar.classList.add("ulCar")


function cardsCar(obj) {

    //lul > li
    const liCar = document.createElement("li")
    ulCar.appendChild(liCar)
    liCar.classList.add("liCar")
    console.log(ulCar)

    //li > img
    const imgCar = document.createElement("img")
    liCar.appendChild(imgCar)
    imgCar.classList.add("imgCar")
    imgCar.src  = obj.img
    
    //li > div > (h4, p)
    const divTexts = document.createElement("div")
    divTexts.classList.add("divTexts")
    liCar.appendChild(divTexts)
    
    
    //li > h4
    const hFour = document.createElement("h4")
    liCar.appendChild(hFour)
    divTexts.appendChild(hFour)
    hFour.classList.add("hFour")
    hFour.innerText = obj.nameItem
    
    //li > p(price)
    const pPrice = document.createElement("p")
    liCar.appendChild(pPrice)
    divTexts.appendChild(pPrice)
    pPrice.classList.add("pPrice")
    pPrice.innerText = `R$ ${obj.value},00`

    //li > button
    const buttonCar = document.createElement("button")
    liCar.appendChild(buttonCar)
    divTexts.appendChild(buttonCar)
    buttonCar.classList.add("romoveButton")
    buttonCar.innerHTML = "Remover produto"
    buttonCar.id = `car${obj.id}`
    buttonCar.value = obj.value
    

    //evento de retirar do carrinho 
    buttonCar.addEventListener("click", function(event){
        //configuração
        let  carPath = event.composedPath()
        carPath[2].remove()
        let ulChildren =ulCar.children.length
        console.log(ulChildren)
        
        if (ulChildren == 0) {
            document.querySelector(".cart-empty").style.display = "flex"
        }
        
      

        
        //contagens
        productCount--
        document.querySelector("#valueCount").innerHTML = `${Count},00`
        
         valueCount -= obj.value
        document.querySelector("#valueCount").innerHTML = `R$${valueCount},00`
    })

    return liCar
    }


//evento de clique para filtro(header)
const buttonFilters = document.querySelectorAll(".menu")

function clickFilter() {
    for(let i = 0; i < buttonFilters.length;  i++){
        let filter = buttonFilters[i] 
    
        filter.addEventListener("click", function () {
            const button = filter.innerHTML
            
            if (button === "Todos") {
                cards(data)
            }else if (button === "Acessórios") {
                cards(acessorios)
            } else if (button === "Camisetas") {
                cards(camisetas)
            }else{console.log(alert("Desculpe!! No momento não temos este produto"))}
           
        })
    }
}
clickFilter()

//busca e evento de clique pesquisa
const searchText = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-button")

searchButton.addEventListener("click", function(){
        let search = []
        
        for(let i = 0; i < data.length; i++){
            let producName =data[i].nameItem
            
            if (producName.toLowerCase().includes(searchText.value.toLowerCase())) {
                search.push(data[i])
            }
        } 
        cards(search)
    })


















