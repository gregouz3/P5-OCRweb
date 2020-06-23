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
    window.close();
    window.location.reload();
    window.open("./index.html");
  })
}

merci();