function get_prod()  {

  return new Promise((response) =>{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {

      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        response(JSON.parse(this.responseText));
    }
    request.open("GET", "http://localhost:3000/api/furniture/" + location.search.substring(4));
    request.send();
  });
}

async function show_prod() {
  
  onLoadCartNumbers();
  let produ = document.getElementById('product');
  const pro = await get_prod();
  
    produ.innerHTML += `
      <div class="row mt-2">
        <img   class="img-fluid  col-md-8 block-prod__img mb-1" src="${pro.imageUrl}" alt="image article">
        <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
        <p class="block-prod__name">${pro.name} </p>
        <div class="form-group">
          <label for="vernis"></label>
          <select name="verni" id="vernis"></select>
        </div>
      </div>
      </div>
      <p class="block-prod__tag mt-3">${pro.description} </p>
      <p class="block-prod__price d-flex justify-content-center ">${pro.price / 100} &euro;</p>
      <div class="row d-flex justify-content-around mb-2">
        <a href="index.html" title="go back"><ion-icon class="block-prod__icon"name="arrow-back-outline"></ion-icon></a>
        <button  type="button" class="btn btn-light block-prod__btn">Add to Cart</button>
        <a href="panier.html" title="view my cart"><ion-icon class="block-prod__icon" name="cart-outline"></ion-icon></a>
      </div>
    `;
  for (verni of pro.varnish) {
    let vernis = document.getElementById("vernis");
    let vrnsh = document.createElement("option");
    vernis.appendChild(vrnsh).innerHTML = verni;
  }
  let products = [
    inCart = 0,
    name = pro.name,
    description = pro.description,
    price = pro.price / 100,
    idMeuble = pro._id,
    imgSrc = pro.imageUrl,
  ];
  let add_cart = document.querySelectorAll('.block-prod__btn');
  for (let i=0; i < add_cart.length; i++) {
    add_cart[i].addEventListener('click', () => {
    
        prod_inCart(products);
        totalPrice(products);
   
    })
  }
}
function prod_inCart(products) {

  let countCart = document.querySelector('.num');
  let prodNumbers = localStorage.getItem('cartNumbers');
  prodNumbers = parseInt(prodNumbers);
  if (prodNumbers) {
    localStorage.setItem('cartNumbers', prodNumbers + 1);
    countCart.textContent = prodNumbers + 1;
  }
  else {
    localStorage.setItem('cartNumbers', 1);
    countCart.textContent = 1;
  }
  setItems(products);


}
function setItems(products) {

  
  let cartItems = localStorage.getItem('prodInCart');
  cartItems = JSON.parse(cartItems);

  
  if (cartItems != null) {
    if (cartItems[product[1]] == undefined) {
      cartItems = {
        ...cartItems,
        [products[4]]: products
      }
    } 
    products[0] += 1;

  }
  else {
    products[0] = 1;    
    cartItems = {
      [products[4]]: products
    }

  
  }
  localStorage.setItem("prodInCart", JSON.stringify(cartItems));
}


function totalPrice(products) {
  let tt = localStorage.getItem('totalPrice');
  if (tt != null ) 
    localStorage.setItem("totalPrice", parseInt(tt) + products[3]);
  else 
    localStorage.setItem("totalPrice", products[3]);
}

function onLoadCartNumbers() {

  let prodNumbers = localStorage.getItem('cartNumbers');
  if (prodNumbers) 
    document.querySelector('.num').textContent = prodNumbers;
}

show_prod();