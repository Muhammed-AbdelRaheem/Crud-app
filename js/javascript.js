
var productname = document.getElementById("pname")
var productprice = document.getElementById("pprice")
var productcategory = document.getElementById("pcategory")
var productdesc = document.getElementById("pdesc")

var productList =[] ;

var addBtn = document.getElementById("addbtn")
var updateBtn = document.getElementById("updatebtn")
var ind;
var prod ;


if((localStorage.getItem("allProducts"))!=null){
    productList = JSON.parse(localStorage.getItem("allProducts"));
    displayProduct();
}
else{
    productList =[]
}


function addproduct(){

    product={
        name:productname.value,
        price:productprice.value,
        category:productcategory.value,
        description:productdesc.value,

    }
    productList.push(product);
    localStorage.setItem("allProducts",JSON.stringify(productList));
    console.log(productList);
    displayProduct();
     clear();
}



function displayProduct(){

    var blackbox = ""

    for(var i=0; i<productList.length;i++){
        blackbox +=
        
        ` 
        <tr>
        <td> ${i+1}</td>
        <td> ${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td> <button  onclick="setformbtn(${i})"  class="btn btn-outline-info  btn-sm">Update</button></td>
        <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-warning btn-sm">Delete</button></td>
        </tr>
        `

        ind=i

    }

    document.getElementById("Products").innerHTML= blackbox;
}


function clear(){

    productname.value="",
    productprice.value="",
    productcategory.value="",
    productdesc.value=""

}

function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem("allProducts",JSON.stringify(productList));
    console.log(productList);
    displayProduct();
    clear();
}

function setformbtn(i){

    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    productname.value =productList[i].name
    productprice.value =productList[i].price
    productcategory.value =productList[i].category
    productdesc.value =productList[i].description

    

}

function updateProduct(i)

{  
    product={
        name:productname.value,
        price:productprice.value,
        category:productcategory.value,
        description:productdesc.value,

    }
  
    productList.splice(i,1,product)
    localStorage.setItem("allProducts",JSON.stringify(productList));
    console.log(productList);
    displayProduct();
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    clear();

}
    

