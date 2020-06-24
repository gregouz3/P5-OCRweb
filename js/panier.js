async function show_prod_inCart() {
  onLoadCartNumbers();
  let cartItems = localStorage.getItem('prodInCart');
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem('totalPrice');
  let prod = document.querySelector(".block-cart");
  let sa = 0;
  if (cartItems && prod) {

    prod.innerHTML = '';
    Object.values(cartItems).map(item => {
      if (item[1] == "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." ) 
        item[1] = "";
      prod.innerHTML += `
        <div class="row mt-2 cart cart--${sa}" >
          <div class="block-cart__id" id="idd">${item[3]}</div>
          <ion-icon class="remove m-auto" id="${sa}" " name="close-circle-outline"></ion-icon>
          <img class="block-cart__img  col-md-4 col-sm-3" src="${item[4]}">
          <div class="block-cart__name col-md-2 col-sm-2 d-flex justify-content-center align-items-center"><span class="nom">${item[0]}</span></div>
          <div class="block-cart__name m-auto">${item[1]}</div>
          <div class=" block-cart__price col-md-2 col-sm-2 d-flex justify-content-center align-items-center">
            <span class="cart--${sa} prix">${item[2]}</span>&euro;
          </div>
        </div>
      `;
    
      sa++;
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
      <form  class="container-md ">
        <div class="form-group">
          <label class="form-check-label" for="nom">First name</label>
          <input type="text" name="firstName" class="form-control" id="nom" required>
        </div>
        <div class="form-group">
          <label class="form-check-label" for="prenom">Last name</label>
          <input type="text" name="lastName" class="form-control" id="prenom">
        </div>
        <div class="form-group">
          <label class="form-check-label" for="ville">City</label>
          <input type="text"name="city" class="form-control" id="ville" 
        </div>
        <div class="form-group">
          <label class="form-check-label" for="adresse">Address</label>
          <input type="text"name="adresse" class="form-control" id="adresse">
        </div>
        <div class="form-group">
          <label class="form-check-label" for="email">Email address</label>
          <input type="email"name="email" class="form-control" id="email">
        </div>
        
        <a  href="validationCommande.html" class="btn btn-light block-prod__btn d-flex justify-content-center"id="envoi">Submit</a>
      </form>
      `;
    removeAllProd();
    removeProd();
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
      window.close();
      window.location.reload();
      window.open("./index.html");
    });  
}
function onLoadCartNumbers() {

  let prodNumbers = localStorage.getItem('cartNumbers');
  if (prodNumbers) 
    document.querySelector('.num').textContent = prodNumbers;
}

function removeProd() {
  let remove = document.getElementsByClassName('remove');
  let id = document.getElementsByClassName('block-cart__id');

  for (let i=0;i<(remove.length) ;i++) {
      let prod = document.getElementsByClassName('cart');

      remove[i].addEventListener('click', () => {
     
      if (remove.length == 1) {
        localStorage.clear();
        window.location.reload();
        window.close();
        window.location.reload();
        window.open("./index.html");
      }

      else {
        let produ = document.getElementsByClassName(prod[i].className);
        let carti = localStorage.getItem('prodInCart');
        carti = JSON.parse(carti);
        let price = document.querySelector('.cart--' + i + '.prix');
        price = parseInt(price.textContent);
        if (price) {
          let ttCart = document.querySelector('.tt');
          let prodtt = localStorage.getItem('totalPrice');
          if (carti) {
              localStorage.setItem('totalPrice', parseInt(prodtt) - price);
              ttCart.textContent =  parseInt(prodtt) -  price;
          }
          prod[i].classList.remove('cart--'+ i);
          prod[i].classList.remove("bloc-cart__id");
          prod[i].textContent = null;
          prod[i].classList.remove('cart');

          localStorage.clear();
          localStorage.setItem('totalPrice', ttCart.textContent);
          let cart = document.getElementsByClassName('cart');
          if (cart.length < 2) {
                let img = document.querySelector('.block-cart__img');
                let name = document.querySelector('.nom');
                let prix = document.querySelector('.prix');
                let idd = document.getElementById('idd');
              
            
                let prodCart = [
                  name = name.textContent,
                  description = "",
                  price = prix.textContent,
                  idMeuble = idd.textContent,
                  imgSrc = img.src,
                ];
                cartitems = {
                  [prodCart[3]]: prodCart
                }
                localStorage.setItem("prodInCart", JSON.stringify(cartitems));
                localStorage.setItem("cartNumbers", 1);
                window.location.reload();
          } 
          for (let l=0;l < cart.length;l++){
              if (cart.length > 2) {
                let img = document.getElementsByClassName('block-cart__img');
                let name = document.getElementsByClassName('nom');
                let prix = document.getElementsByClassName('prix');
                let idd = document.querySelectorAll('#idd');
               

                let prodCart = [
                  name = name[l].textContent,
                  description= (document.querySelector('.num').textContent) - 1,
                  price = prix[l].textContent,
                  idMeuble = idd[l].textContent,
                  imgSrc = img[l].src,
                ];
               
                cartitems = {
                  ...JSON.parse(localStorage.getItem('prodInCart')),
                  [prodCart[3]]: prodCart
                }
                localStorage.setItem("prodInCart", JSON.stringify(cartitems));
                localStorage.setItem("cartNumbers", idd.length);

              }
              window.location.reload()    
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
  if (nom == "" || prenom == "" || adresse == "" || ville == "" || mail == "") {
    alert("champs requis");
    window.close();
    window.open('./panier.html');

  }
  else {
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

show_prod_inCart();