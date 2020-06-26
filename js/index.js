function get_prod()  {
  //Requete GET pour afficher les produits de l'API
  return new Promise((response) =>{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      //si tout c'est bien passé
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        response(JSON.parse(this.responseText));
    }
    request.open("GET", "http://localhost:3000/api/furniture/");
    request.send();
  });
}

async function show_all_prod() {
  //Display des produits
  //on recharge la quantité des produits affichée dans la nav
  onLoadCartNumbers();
  let product = document.getElementById('list');
  product.innerHTML = '';
  const prod = await get_prod();
  let iSass = 6;
  //initialisation du tableau d'objects
  let products = [];
  prod.forEach((item) => {
    //on affiche les articles sur la page
    iSass--;
    product.innerHTML += `
      <li title="Click for view more" class="block-list__article block-list__article--${iSass}" >
        <img height=200 width=300 class="block-list__article__img" src="${item.imageUrl}" alt="image article">
        <h5 class="block-list__article__name">${item.name} </p>
        <p class="block-list__article__price">${item.price / 100} &euro;</p>
      </li>
    `;
    //Création de l'object 
    let article = 
      {
          name : item.name,
          description : item.description,
          price : item.price / 100,
          idMeuble : item._id,
          imgSrc : item.imageUrl,
          option : item.varnish
      };
      //Ajoût de l'object dans le tableau de ces derniers
      products.push(article);
  });
  let view = document.getElementsByClassName('block-list__article');
  for (let i =0; i < view.length;i++) {
    view[i].addEventListener('click', () => {
      //ajout dans le localstorage l'article lors du clic sur ce dernier
      localStorage.setItem("prodView", JSON.stringify(products[i]));
      window.close();
      window.open('./article.html');
    })
  }
}

function onLoadCartNumbers() {
  let prodNumbers = localStorage.getItem('cartNumbers');
  if (prodNumbers) 
    document.querySelector('.num').textContent = prodNumbers;
}

show_all_prod();