function merci() {

  onLoadCartNumbers();
  tt = localStorage.getItem("totalPrice");
  tt = parseInt(tt);
  ci = localStorage.getItem("order_id");
  ci = JSON.parse(ci);
  document.getElementById('nom_fa').textContent = ( ci.contact.lastName+ '  ' + ci.contact.firstName);
  document.getElementById('num').textContent = (ci.orderId);
  document.getElementById('tt').textContent = (tt);
  let retur = document.querySelectorAll('#retour');
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