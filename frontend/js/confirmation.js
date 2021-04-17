const basketData = JSON.parse(localStorage.getItem("basketData"));

const basketPrice = JSON.parse(localStorage.getItem("basketSum"));

const confirmationName = document.getElementById("confirmationName");
const confirmationOrderId = document.getElementById("confirmationOrderId");
const confirmationPrice = document.getElementById("confirmationPrice");

console.log(basketData);



// ORDER ET ID
confirmationName.innerHTML = basketData.contact.firstName;
confirmationOrderId.innerHTML = basketData.orderId;
confirmationPrice.innerHTML = basketPrice + "€";

// SUPPRESSION DU PANIER
localStorage.removeItem("basketContent");