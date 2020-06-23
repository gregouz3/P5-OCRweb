async function show_prod_inCart() {

  onLoadCartNumbers();
  let cartItems = localStorage.getItem('prodInCart');
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem('totalPrice');
  let prod = document.querySelector(".block-cart");
  if (cartItems && prod) {
    prod.innerHTML = '';
    Object.values(cartItems).map(item => {
      prod.innerHTML += `
        <div class="row mt-2 cart" id="${item[4]}">
          <div class="block-cart__id" id="idd">${item[4]}</div>
          <ion-icon class="remove m-auto" name="close-circle-outline"></ion-icon>
          <img class="block-cart__img  col-md-4 col-sm-3" src="${item[5]}">
          <div class="block-cart__name col-md-2 col-sm-2 d-flex justify-content-center align-items-center"><span class="nom">${item[1]}</span></div>
          <div class="block-cart__price col-md-2 col-sm-2 d-flex justify-content-center align-items-center">
            <span class="prix">${item[3]}</span>&euro;
          </div>
          <div class="block-cart__quantity col-md-2 col-xs-2 col-sm-2 d-flex justify-content-center align-items-center">
            <ion-icon name="arrow-back-outline" class="qtmoins"></ion-icon>
            <span class="qt">${item[0]}</span>
            <ion-icon class="qtplus" name="arrow-forward-outline"></ion-icon>
          </div>
          <div class="block-cart__total col-md-2 col-xs-2 d-flex justify-content-center align-items-center">
            TT= ${item[0] * item[3]}&euro;
          </div>
         

        </div>
      `;
    });

    prod.innerHTML += `
      <div class="row mt-3 d-flex justify-content-center">
        <h4 class="block-total__name">
          TOTAL=
        </h4>
        <h4 class="block-total__tt">
          <span class="tt">${cartCost}</span>&euro;
        </h4>
      </div
     
    `;
    prod.innerHTML += `
      <form class="container-md ">
        <div class="form-group">
          <label class="form-check-label" for="nom">First name</label>
          <input type="text" name="firstName" class="form-control" id="nom" required>
        </div>
        <div class="form-group">
          <label class="form-check-label" for="prenom">Last name</label>
          <input type="text" name="lastName" class="form-control" id="prenom" required>
        </div>
        <div class="form-group">
          <label class="form-check-label" for="ville">City</label>
          <input type="text"name="city" class="form-control" id="ville" required>
        </div>
        <div class="form-group">
          <label class="form-check-label" for="adresse">Address</label>
          <input type="text"name="adresse" class="form-control" id="adresse" required>
        </div>
        <div class="form-group">
          <label class="form-check-label" for="email">Email address</label>
          <input type="email"name="email" class="form-control" id="email" required>
        </div>
        
        <a href="./validationCommande.html"  class="btn btn-light block-prod__btn d-flex justify-content-center"id="envoi">Submit</a>
      </form>
      `;
    removeAllProd();
    let c = document.getElementById('envoi');
    c.addEventListener('click', () => {
        contact();
    });
  }
}

function onLoadCartNumbers() {

  let prodNumbers = localStorage.getItem('cartNumbers');
  if (prodNumbers) 
    document.querySelector('.num').textContent = prodNumbers;
}

function removeAllProd() {

  removeProd()
  
  let removeAll = document.querySelector('.removeAll');
    removeAll.addEventListener('click', () => {
      localStorage.clear();
      window.location.reload();
      window.close();
      window.location.reload();
      window.open("./index.html");
    });  
}

function removeProd() {
  let remove = document.getElementsByClassName('remove');
  let id = document.getElementsByClassName('block-cart__id');
  let prodid = [];
  for (let i=0;i<(remove.length) ;i++) {
    remove[i].addEventListener('click', () => {
      for (let j=0; j < id.length; j++) {
        prodid.push(id[j]);
      }
      let prod = document.getElementById(prodid[i].textContent);
      if (remove.length == 1) {
        localStorage.clear();
        window.location.reload();
        window.close();
        window.location.reload();
        window.open("./index.html");
      }
      else {
          let carti = localStorage.getItem('prodInCart');
          carti = JSON.parse(carti);
          let price = carti[prodid[i].textContent][3];
          if (prodid[i].textContent = prod) {
            let ttCart = document.querySelector('.tt');
            let prodtt = localStorage.getItem('totalPrice');
            if (carti) {
              localStorage.setItem('totalPrice', parseInt(prodtt) - price);
              ttCart.textContent =  parseInt(prodtt) -  price;
            }
            prod.classList.remove("cart");
            prod.classList.remove("bloc-cart__id");
            prod.textContent = null;
            localStorage.clear();
            localStorage.setItem('totalPrice', ttCart.textContent);
            let cart = document.getElementsByClassName('cart');
            if (cart.length < 2) {
                let img = document.querySelector('.block-cart__img');
                let name = document.querySelector('.nom');
                let prix = document.querySelector('.prix');
                let idd = document.getElementById('idd');
                let qt = document.querySelector('.qt');
            
                let prodCart = [
                  inCart = qt.textContent,
                  name = name.textContent,
                  description = "",
                  price = prix.textContent,
                  idMeuble = idd.textContent,
                  imgSrc = img.src,
                ];
                cartitems = {
                  [prodCart[4]]: prodCart
                }
                localStorage.setItem("prodInCart", JSON.stringify(cartitems));
                window.location.reload();
            } 
            for (let l=0;l < cart.length;l++){
              if (cart.length >= 2) {
                let img = document.getElementsByClassName('block-cart__img');
                let name = document.getElementsByClassName('nom');
                let prix = document.getElementsByClassName('prix');
                let idd = document.querySelectorAll('#idd');
                let qt = document.getElementsByClassName('qt');

                let prodCart = [
                  inCart = qt[l].textContent,
                  name = name[l].textContent,
                  description= "",
                  price = prix[l].textContent,
                  idMeuble = idd[l].textContent,
                  imgSrc = img[l].src,
                ];
                cartitems = {
                  ...JSON.parse(localStorage.getItem('prodInCart')),
                  [prodCart[4]]: prodCart
                }
                localStorage.setItem("prodInCart", JSON.stringify(cartitems));
              }
            }
        }
      }
    });
  }
}

function contact() {

  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;
  let mail = document.getElementById("email").value;
  let contacts = {
    firstName : nom,
    lastName : prenom,
    address : adresse,
    city : ville,
    email :mail
  };
  let id = document.getElementsByClassName('block-cart__id');
  let prodId = [];
  for (i=0; i < id.length; i++) {
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
  alert("ORDER SENT");
  window.location.reload();
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

show_prod_inCart();