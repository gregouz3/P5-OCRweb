function merci() {
  onLoadCartNumbers();
  tt = localStorage.getItem("totalPrice");
  tt = parseInt(tt);
  ci = localStorage.getItem("order_id");
  ci = JSON.parse(ci);
  //display remerciement avec le nom et prénom 
  document.getElementById('nom_fa').textContent = ( ci.contact.lastName+ '  ' + ci.contact.firstName);
  //Display du numéro de commande renvoyé par le back
  document.getElementById('num').textContent = (ci.orderId);
  //Display du total
  document.getElementById('tt').textContent = (tt);
  //vide le localstorage pour tout les moyens de retours présents sur la page
  let retur = document.getElementsByClassName('retour');
  for(let i = 0;i < retur.length;i++) {
    retur[i].addEventListener('click', () => {
      localStorage.clear();
      window.close();
      window.location.reload();
      window.open("./index.html");
    })
  }
}

function onLoadCartNumbers() {
  let prodNumbers = localStorage.getItem('cartNumbers');
  if (prodNumbers) 
    document.querySelector('.num').textContent = prodNumbers;
}
merci();