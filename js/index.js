function get_all_prod()  {

  return new Promise((response) =>{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {

      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
        response(JSON.parse(this.responseText));
    }
    request.open("GET", "http://localhost:3000/api/furniture/");
    request.send();
  });
}

async function show_all_prod() {
  
  onLoadCartNumbers();
  let product = document.getElementById('list');
  product.innerHTML = '';
  const prod = await get_all_prod();
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

function onLoadCartNumbers() {

  let prodNumbers = localStorage.getItem('cartNumbers');
  if (prodNumbers) 
    document.querySelector('.num').textContent = prodNumbers;
}

show_all_prod();