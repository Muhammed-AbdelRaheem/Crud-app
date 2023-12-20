
var productname = document.getElementById("pname")
var productprice = document.getElementById("pprice")
var productcategory = document.getElementById("pcategory")
var productdesc = document.getElementById("pdesc")
var localStorageKey = "allProducts"
var productList = [];

var addBtn = document.getElementById("addbtn")
var updateBtn = document.getElementById("updatebtn")
var ind;
var prod;


if ((localStorage.getItem(localStorageKey)) != null) {
    productList = JSON.parse(localStorage.getItem(localStorageKey));
    displayProduct(productList);
}
else {
    productList = []
}


function addproduct() {
    {
        if (productname.value == "" || productprice.value == "" || productcategory.value == "") {
            alert("Please Insert Your Data")
        }


        else if (
            validateProductPrice() == true && validateProductdesc() == true && validateProductCateg() == true) {
            product = {
                name: productname.value,
                price: productprice.value,
                category: productcategory.value,
                description: productdesc.value,

            }
            productList.push(product);
            updateLocalStorge();
                        console.log(productList);
            displayProduct(productList);
            clear();
        }


      



    }
}



function displayProduct(list) {

    var blackbox = ""

    for (var i = 0; i < list.length; i++) {
        blackbox +=

            ` 
        <tr>
        <td> ${i + 1}</td>
        <td>${list[i].newName?list[i].newName:list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].description}</td>
        <td> <button  onclick="setformbtn(${i})"  class="btn btn-outline-info  btn-sm">Update</button></td>
        <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-warning btn-sm">Delete</button></td>
        </tr>
        `

        ind = i

    }

    document.getElementById("Products").innerHTML = blackbox;
}


function clear() {

    productname.value = "",
        productprice.value = "",
        productcategory.value = "",
        productdesc.value = ""

}

function deleteProduct(index) {
    productList.splice(index, 1);
    updateLocalStorge();
        console.log(productList);
    displayProduct(productList);
    clear();
}

function setformbtn(i) {

    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    productname.value = productList[i].name
    productprice.value = productList[i].price
    productcategory.value = productList[i].category
    productdesc.value = productList[i].description



}

function updateProduct(i) {
    product = {
        name: productname.value,
        price: productprice.value,
        category: productcategory.value,
        description: productdesc.value,

    }

    productList.splice(i, 1, product)
    updateLocalStorge();
        console.log(productList);
    displayProduct(productList);
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    clear();

}

function updateLocalStorge(){
    localStorage.setItem(localStorageKey, JSON.stringify(productList));

}

function validateProductCateg() {
    var regex = /^([Mm][Oo][Bb][Ii][Ll][Ee]|[Ss][Cc][Rr][Ee][Ee][Nn]|[Ww][Aa][Tt][Cc][Hh])$/;
    if (regex.test(productcategory.value) == true) {
        document.getElementById("inv-categ").classList.replace("d-block","d-none")
        document.getElementById("pcategory").classList.add("mb-3")


        return true;
    }
    else { 
        document.getElementById("inv-categ").classList.replace("d-none","d-block")
        document.getElementById("pcategory").classList.remove("mb-3")

        return false }
}

function validateProductdesc() {
    var regex = /^([a-zA-Z]){0,250}$/;
    if (regex.test(productdesc.value) == true) {
        return true;
    }
    else { return false }
}

function validateProductPrice() {
    var regex = /^([1-9][0-9]{3}|10000)$/;
    if (regex.test(productprice.value) == true) {
        document.getElementById("inv-price").classList.replace("d-block","d-none")
        document.getElementById("pprice").classList.add("mb-3")
        return true }
    else {
        
        document.getElementById("inv-price").classList.replace("d-none","d-block")
        document.getElementById("pprice").classList.remove("mb-3")

        return false }
}


function searchProduct(item) {

    var searchList = []

    for (var i = 0; i < productList.length; i++) {

        if (productList[i].name.toLowerCase().includes(item.toLowerCase()) == true) {
            searchList.push(productList[i])

            productList[i].newName = productList[i].name.toLowerCase().replace(item.toLowerCase(),
                `<span class="text-danger fw-bolder">${item}</span>`    )
        
            
        
    }

    }
    displayProduct(searchList)
}
