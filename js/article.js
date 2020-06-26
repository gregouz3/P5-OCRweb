function onLoadCartNumbers() {
  let prodNumbers = localStorage.getItem('cartNumbers');
  if (prodNumbers) 
    document.querySelector('.num').textContent = prodNumbers;
}

function show_prod() {
  //affichage de l'article sélectionner sur la page précédente
  onLoadCartNumbers();
  
 
  let produ = document.getElementById('product');
  let pro = localStorage.getItem("prodView");
  pro = JSON.parse(pro);
  //on affiche l'article sur la page avec le localstorage
  produ.innerHTML += `
    <div class="row mt-2">
      <img   class="img-fluid  col-md-8 block-prod__img mb-1" src="${pro.imgSrc}" alt="image article">
      <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
        <p class="block-prod__name ">${pro.name} </p>
        <div class="form-group ">
          <label for="vernis"></label>
          <select class="form-control m-auto" id="vernis"></select>
        </div>
      </div>
    </div>
    <p class="block-prod__tag mt-3">${pro.description} </p>
    <p class="block-prod__price d-flex justify-content-center ">${pro.price} &euro;</p>
    <div class="row d-flex justify-content-around mb-2">
      <a href="index.html" title="go back"><ion-icon class="block-prod__icon"name="arrow-back-outline"></ion-icon></a>
      <button  type="button" class="btn btn-light block-prod__btn">Add to Cart</button>
      <a href="panier.html" title="view my cart"><ion-icon class="block-prod__icon" name="cart-outline"></ion-icon></a>
    </div>
  </div>
  `;
  // ajout des options de vernis
  for (verni of pro.option) {
    let vernis = document.getElementById("vernis");
    let vrnsh = document.createElement("option");
    vernis.appendChild(vrnsh).innerHTML = verni;
  }
  //ajout au panier lors du clic sur "add-cart"
  let add_cart = document.querySelectorAll('.block-prod__btn');
  for (let i=0; i < add_cart.length; i++) {
    add_cart[i].addEventListener('click', () => {
      alert("This product is added to your cart !")
      //gestion quantité dans la nav + ajout localstorage
      prod_inCart(pro);
      //gestion quantité et prix total  + ajout localstorage
      prod_Qt(pro);
      //Ajout du prix total dans le localstorage
      totalPrice(pro);
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
  //Ces objects ne seront pas repris pour l'affichage panier, mais facilitent la lecture des produits dans le panier au niveau du localstorage
  let cartItems = localStorage.getItem('prodInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[products.name] == undefined) {
      cartItems = {
        ...cartItems,
        [products.name]: products
      }
    }
  } 
  else {
    cartItems = {
      [products.name]: products
    }
  }
  localStorage.setItem("prodInCart", JSON.stringify(cartItems));
}

function prod_Qt(products) {
  //Ces objects sera repris pour l'affichage panier
  let cartQt = localStorage.getItem('prod_Qt');
  cartQt = JSON.parse(cartQt);
  let quantity = 0;
  if (cartQt != null) {
    if (cartQt[products.idMeuble] == undefined) {
      cartQt = {
        ...cartQt,
        [products.idMeuble]: products
      }
    }
    if (cartQt[products.idMeuble].quantity != null)
      cartQt[products.idMeuble].quantity += 1;
    products.quantity = 1;
    cartQt[products.idMeuble].total = parseInt(cartQt[products.idMeuble].quantity) *parseInt(cartQt[products.idMeuble].price)  ;
  }
  else {
    products.quantity = 1;
    cartQt = {
      [products.idMeuble]: products
    }
    products.total = parseInt(products.price);
  }
  localStorage.setItem("prod_Qt", JSON.stringify(cartQt));
}

function totalPrice(products) {
  let tt = localStorage.getItem('totalPrice');
  if (tt != null ) 
    localStorage.setItem("totalPrice", parseInt(tt) + products.price);
  else 
    localStorage.setItem("totalPrice", products.price);
}

show_prod();