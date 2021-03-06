async function show_prod_inCart() {
  onLoadCartNumbers();
  let cartItems = localStorage.getItem('prod_Qt');
  cartItems = JSON.parse(cartItems);
  let prod = document.querySelector(".block-cart");
  let cartCost = localStorage.getItem('totalPrice');
  //on affiche les articles ajoutés au préalable dans le panier

  if (cartItems && prod) {
    prod.innerHTML = '';
    Object.values(cartItems).map(item => {
     
      prod.innerHTML += ` 
      <div class="row mt-2 cart " id="${item.idMeuble}">
        <div class="block-cart__id" id="idd">${item.idMeuble}</div>
        <ion-icon class="remove my-auto ml-1" name="close-circle-outline"></ion-icon>
        <img class="block-cart__img   col-md-4 col-sm-3 col-xs-3" src="${item.imgSrc}">
        <div class="block-cart__name col-md-3 col-sm-2 col-xs-2 d-flex justify-content-center align-items-center">${item.name}</div>
        <div class="block-cart__price col-md-1 col-sm-1 col-xs-1 d-flex justify-content-center align-items-center"><span class="prix">${item.price}</span>&euro;</div>
        <div class="block-cart__quantity col-md-1 col-sm-1 col-xs-1 d-flex justify-content-center align-items-center">x <span class="qt">${item.quantity}</span></div>
        <div class="block-cart__total col-md-2 col-sm-2 col-xs-1 d-flex justify-content-center align-items-center">
          TT= <span class="ttt">${item.total}</span>&euro;
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
      <form  class="container-md ">
        <div class="form-group">
          <label class="form-check-label" for="nom">First name</label>
          <input  maxlength="20" type="text" name="firstName" class="form-control" id="nom" required>
        </div>
        <div class="form-group">
          <label class="form-check-label" for="prenom">Last name</label>
          <input  maxlength="30" type="text" name="lastName" class="form-control" id="prenom">
        </div>
        <div class="form-group">
          <label class="form-check-label" for="ville">City</label>
          <input  maxlength="40" type="text"name="city" class="form-control" id="ville" 
        </div>
        <div class="form-group">
          <label class="form-check-label" for="adresse">Address</label>
          <input  maxlength="50" type="text"name="adresse" class="form-control" id="adresse">
        </div>
        <div class="form-group">
          <label class="form-check-label" for="email">Email address</label>
          <input maxlength="50"  type="email"name="email" class="form-control" id="email">
        </div>
        
        <a  href="validationCommande.html" class="btn btn-light block-prod__btn d-flex justify-content-center"id="envoi">Submit</a>
      </form>
      `;
    //possibilité de vider le panier, ou un article
    removeAllProd();
    //création de l'object contact + ajout id de l'article pour l'envoi à l'Api
    let c = document.getElementById('envoi');
    c.addEventListener('click', () => {
        contact();
    });
  }
}


function removeAllProd() {
  removeProd();
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
  //init tableau d'id des produits
  let prodid = [];
  for (let i=0;i<(remove.length) ;i++) {
    let prod = document.getElementsByClassName('cart');
    remove[i].addEventListener('click', () => {
      for (let j=0; j < id.length; j++) {
          prodid.push(id[j]);
      }
      let prod = document.getElementById(prodid[i].textContent);
      //si il n'y a qu'un article, on vide le panier
      if (remove.length == 1) {
          localStorage.clear();
          window.location.reload();
          window.close();
          window.location.reload();
          window.open("./index.html");
      }
      else {
        let carti = localStorage.getItem("prod_Qt");
        carti = JSON.parse(carti);
        //utilisation du tableau d'id pour récupérer le prix de l'article correspondant
        let price = carti[prodid[i].textContent].price * carti[prodid[i].textContent].quantity ;
        let ttCart = document.querySelector('.tt');
        let prodtt = localStorage.getItem('totalPrice');
        //on met à jour le total
        if (carti) {
          localStorage.setItem('totalPrice', parseInt(prodtt) - price);
          ttCart.textContent =  parseInt(prodtt) -  price;
        }
        //on supprime sur la page web
        prod.classList.remove("cart");
        prod.classList.remove("bloc-cart__id");
        prod.textContent = null;
        //on vide le localstorage pour y remettre par la suite les produits restant 
        localStorage.clear();
        //on envoie le total
        localStorage.setItem('totalPrice', ttCart.textContent);
        //on envoie la quantité de la barre nav
        localStorage.setItem('cartNumbers', document.querySelector('.num').textContent);
        let cart = document.getElementsByClassName('cart');
        if (cart.length < 2) {
          //on recrée l'object si il y'en a plus qu'un
            let img = document.querySelector('.block-cart__img');
            let name = document.querySelector('.block-cart__name');
            let prix = document.querySelector('.prix');
            let idd = document.getElementById('idd');
            let qt = document.querySelector('.qt');
            let tt = document.querySelector('.ttt');

            let prodCart = {
              idMeuble : idd.textContent,
              imgSrc: img.src,
              name: name.textContent,
              price: parseInt(prix.textContent),
              quantity: parseInt(qt.textContent),
              total: parseInt(tt.textContent)
            }
            cartItems = {
              [prodCart.idMeuble] : prodCart
            }
            //pour mettre à jour le localstorage
            localStorage.setItem("prod_Qt", JSON.stringify(cartItems));
            let countCart = document.querySelector('.num');
            //on met à jour la quantité dans la barre nav
            localStorage.setItem('cartNumbers', parseInt(qt.textContent));
            window.location.reload();
        }
        else {
          //init tableau des quantités des articles
          let nu = [];
          //on recrée les objets
          for (let l=0;l < cart.length;l++){
              let img = document.getElementsByClassName('block-cart__img');
              let name = document.getElementsByClassName('block-cart__name');
              let prix = document.getElementsByClassName('prix');
              let idd = document.querySelectorAll('#idd');
              let qt = document.getElementsByClassName('qt');
              let tt = document.getElementsByClassName('ttt');

              let prodCart = {
                idMeuble : idd[l].textContent,
                imgSrc: img[l].src,
                name: name[l].textContent,
                price: parseInt(prix[l].textContent),
                quantity: parseInt(qt[l].textContent),
                total: parseInt(tt[l].textContent)
              };
              cartitems = {
                ...JSON.parse(localStorage.getItem('prod_Qt')),
                [prodCart.idMeuble]: prodCart
              }
              //pour mettre à jour le localstorage
              localStorage.setItem("prod_Qt", JSON.stringify(cartitems));

              let countCart = document.querySelector('.num');
              let count = parseInt(qt[l].textContent);
              //ajout de la quantité des produits pour la quantité dans la nav
              nu.push(count);
          }
          //calcul l'addition total des elements d'un tableau
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          //on envoie la quantité pour la barre nav
          localStorage.setItem("cartNumbers", nu.reduce(reducer));
          window.location.reload();
        }
      }
    });
  }
}
                 
function contact() {

  //on récupère les valeurs des inputs 
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;
  let mail = document.getElementById("email").value;
  // pour créer un object contact
  let contacts = {
    firstName : nom,
    lastName : prenom,
    address : adresse,
    city : ville,
    email :mail
  };
  //test regex pour vérifier si il y'a des chiffres pour le nom, prenom, la ville
  let testText = /[0-9]/;
  //test regex pour vérifier si l'adresse ne contient pas de characs autre qu'alphanumérique
  let testAdres =  /[A-Za-z0-9_]/;
  //test regex pour vérifier si l'adresse mail est valide
  let testMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // test pour savoir si les champs sont vide 
  if (nom == "" || prenom == "" || adresse == "" || ville == "" || mail == "") {
    alert("Required  fields");
    window.close();
    window.open('./panier.html');
  }
  if ((testText.test(nom) == true || testText.test(prenom) == true || testText.test(ville) == true|| testAdres.test(adresse) == false || testMail.test(mail) == false) ) {
    alert("Incorrect fields");
    window.close();
    window.open('./panier.html');
  }
  //si les données du formulaire sont validées --> 
  else {
    let id = document.getElementsByClassName('block-cart__id');
    //init tableau des id pour le futur envoi
    let prodId = [];
    for (i=0; i < id.length; i++) {
      //on ajoute à  ce tableau les id des produits du panier
      prodId.push((id[i].textContent));
    }
    //création class d'envoie, avec l'object contact + le tableau d'id
    class Send {
      constructor(use, prodId) {
        this.contact = use;
        this.products = prodId;
      }
    }
    let send = new Send(contacts, prodId);
    //on envoie
    send = post_send(send);
    alert("ORDER SENT");
  }
}
  
function post_send(send) {
  //envoie les données de la commande (contact + id des articles choisis)
  return new Promise((response)=>{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        //ajout de la réponse dans le localstorage
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