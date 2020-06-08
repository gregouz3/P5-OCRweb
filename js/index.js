
id_prod = "";
function get_prod()  {

  return new Promise((response) =>{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {

      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        response(JSON.parse(this.responseText));
    }
    request.open("GET", "http://localhost:3000/api/furniture/" + id_prod);
    request.send();
  });
}

async function show_all_prod() {
  
  onLoadCartNumbers();
  let product = document.getElementById('list');
  product.innerHTML = '';
  const prod = await get_prod();
  let iSass = 6;
  prod.forEach((item) => {
    iSass--;
    product.innerHTML += `
      <li class="block-list__article block-list__article--${iSass}" >
        <img height=200 width=300 class="block-list__article__img" src="${item.imageUrl}" alt="image article">
        <h5 class="block-list__article__name">${item.name} </p>
        <p class="block-list__article__price">${item.price / 100} &euro;</p>
        <a title="view more" href="article.html?id=${item._id}" id="check_prod" class="block-list__article__btn block-list__article__btn--${iSass}">View more</a>
      </li>
    `;
  });
}

async function show_prod() {
  
  onLoadCartNumbers();


  id_prod = location.search.substring(4);
  let produ = document.getElementById('product');
  const pro = await get_prod();
  if (id_prod == "5beab2061c9d440000a57d9b") {
    produ.innerHTML += `
    <div class="row mt-2">
      <img  class="col-md-8 block-prod__img--chair mb-1" src="${pro.imageUrl}" alt="image article">
      <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
        <p class="block-prod__name">${pro.name} </p>
        <label for="vernis"></label>
        <select name="verni" id="vernis"></select>
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
  }
  else {
    produ.innerHTML += `
      <div class="row mt-2">
        <img   class="img-fluid  col-md-8 block-prod__img mb-1" src="${pro.imageUrl}" alt="image article">
        <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
        <p class="block-prod__name">${pro.name} </p>
        <label for="vernis"></label>
        <select name="verni" id="vernis"></select>
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
  }
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
      alert("This product is added to your cart !")
      prod_inCart(products);
      totalPrice(products);
    })
  }
}

function prod_inCart(product) {

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
  setItems(product);


}

function setItems(product) {
  let cartItems = localStorage.getItem('prodInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product[2]] == undefined) {
      cartItems = {
        ...cartItems,
        [product[1]]: product
      }
    }
    product[0] += 1;
  } else {
    product[0] = 1;
    cartItems = {
      [product[1]]: product
    }
  }
  prod = JSON.stringify(cartItems);
  localStorage.setItem("prodInCart", prod);
}


function onLoadCartNumbers() {

  let prodNumbers = localStorage.getItem('cartNumbers');
  if (prodNumbers) 
    document.querySelector('.num').textContent = prodNumbers;
}

function totalPrice(product) {
  let tt = localStorage.getItem('totalPrice');
  if (tt != null) 
    localStorage.setItem("totalPrice", parseInt(tt) + product[3]);
  else 
    localStorage.setItem("totalPrice", product[3]);
}

async function show_cart(product) {

  let cartItems = localStorage.getItem('prodInCart');
  cartItems = JSON.parse(cartItems);
  let prod = document.querySelector(".block-cart");
  console.log(prod);
  let cartCost = localStorage.getItem('totalPrice');
  if (cartItems && prod) {
    prod.innerHTML = '';
    let i =0;
    Object.values(cartItems).map(item => {
      prod.innerHTML += `
        <div class="row mt-2 cart ">
          <div class="block-cart__id">${item[4]}</div>
          <img class="block-cart__img  col-md-4 col-xs-3" src="${item[5]}">
          <div class="block-cart__name col-md-3 col-xs-2 d-flex justify-content-center align-items-center">${item[1]}</div>
          <div class="block-cart__price col-md-2 col-xs-2 d-flex justify-content-center align-items-center">${item[3]}&euro;</div>
          <div class="block-cart__quantity col-md-1 col-xs-2 d-flex justify-content-center align-items-center">x ${item[0]}</div>
          <div class="block-cart__total col-md-2 col-xs-2 d-flex justify-content-center align-items-center">
            TT= ${item[0] * item[3]}&euro;
          </div>
        </div>
      `;
      i++;
    });
    prod.innerHTML += `
      <div class="row mt-3 d-flex justify-content-center">
        <h4 class="block-total__name">
          TOTAL=
        </h4>
        <h4 class="block-total__tt">
          ${cartCost}&euro;
        </h4>
      </div
     
    `;
    removeAllProd();
    let c = document.getElementById('envoi');
    c.addEventListener('click', () => {
        contact();
    });
  }
}

function removeAllProd() {

  let removeAll = document.querySelector('.removeAll');
    removeAll.addEventListener('click', () => {
      localStorage.clear();
      window.location.reload();
    });  
}

function contact() {
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;
  let mail = document.getElementById("email").value;
  let id = document.getElementsByClassName('block-cart__id');

  let contacts = {
    firstName : nom,
    lastName : prenom,
    address : adresse,
    city : ville,
    email :mail
  };
  let prodId = [];

  for (i=0; i < id.length; i++) {
    console.log(id);
    prodId.push((id[i].textContent));
  }
  class Send {
    constructor(use, prodId) {
      this.contact = use;
      this.products = prodId;
    }
  }

  let send = new Send(contacts, prodId);
  send = post_send(send);
  ci = localStorage.getItem("order_id");
  if (ci) {
    alert("COMMANDE RECU");
    window.close();
    window.open("./validationCommande.html");
  }
}
  

function post_send(send) {
  return new Promise((response)=>{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        localStorage.setItem("order_id", this.responseText);
        response(JSON.parse(this.responseText));
      }
    }
    request.open("POST", "http://localhost:3000/api/furniture/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(send));
  });
}

function merci() {
  tt = localStorage.getItem("totalPrice");
  tt = parseInt(tt);
  ci = localStorage.getItem("order_id");
  ci = JSON.parse(ci);
  document.getElementById('nom_fa').textContent = ( ci.contact.lastName+ '  ' + ci.contact.firstName);
  document.getElementById('num').textContent = (ci.orderId);
  document.getElementById('tt').textContent = (tt);
  let retur = document.getElementById('retour');
  retur.addEventListener('click', () => {
    localStorage.clear();
  })
}