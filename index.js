import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const myDBLink = {
    databaseURL:"https://addtocart-1da06-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

 const app = initializeApp(myDBLink)
 const database = getDatabase(app)
 const address = ref(database,"shopping-items")
console.log(app)

const addToCart = document.getElementById("add-button")
let listEl = document.getElementById("list-el")
let inputField = document.getElementById("input-field")

addToCart.addEventListener("click",function(){
    let inpValue = inputField.value
    
    if(inpValue !== ""){
        console.log(inpValue)
    push(address,inpValue)



    clearInputField()
    }

    
})

onValue(address,function(snapshot){

    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        console.log(itemsArray)
        clearItemList()
    
        for(let i = 0; i < itemsArray.length; i++){
            let currentArrayItem = itemsArray[i]
            let currentArrayItemValue = currentArrayItem[1]
            let currentArrayItemID = currentArrayItem[0]
            displayItems(currentArrayItem)
    
    
        }
    }
    else{
        listEl.innerHTML = ""
    }
})



function clearItemList(){
    listEl.innerHTML = ""

}

function clearInputField(){
    inputField.value = ''

}

function displayItems(item){
    // listEl.innerHTML += `<li>${value}</li>`

    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue


    newEl.addEventListener("dblclick",function(){
        let exactIdDB = ref(database,`shopping-items/${itemID}`)
        
        remove(exactIdDB)
    })

    listEl.append(newEl)



}


