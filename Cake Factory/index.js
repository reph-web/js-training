function showProducts(className){
    for (elem of document.getElementsByClassName('product')){
        if(elem.classList.contains(className)){
            elem.style.display = "";
        }else{
            elem.style.display = "none";
        }
    }
}

document.getElementById('all-products').addEventListener('click', function(){
    for (elem of document.getElementsByClassName('product')){
        elem.style.display = "";
    }
})



document.getElementById('strawberry').addEventListener('click', showProducts.bind(null, 'strawberry'));
document.getElementById('raspberry').addEventListener('click', showProducts.bind(null, 'raspberry'));
document.getElementById('chocolate').addEventListener('click', showProducts.bind(null, 'chocolate'));
document.getElementById('all-cakes').addEventListener('click', showProducts.bind(null, 'cake'));
document.getElementById('all-pies').addEventListener('click', showProducts.bind(null, 'pie'));