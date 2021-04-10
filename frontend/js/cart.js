// *****************    Afficher le contenu du panier    *****************

const basket = JSON.parse(localStorage.getItem("basketContent"));
const basketList = document.getElementById("basketList");
if (basket == null){
    alert("Votre panier est vide.");
    let emptyBasket = document.createElement("p");
    emptyBasket.innerHTML = "Votre panier est vide."
    emptyBasket.classList.add("emptyBasket");
    basketList.appendChild(emptyBasket);
} else {
    for(let i = 0; i < basket.length; i++){

        let list = document.createElement("li");
        list.classList.add("list");
        basketList.appendChild(list);
    
        let currentImage = document.createElement("img");
        currentImage.src = basket[i].image;
        list.appendChild(currentImage);
    
        let currentName = document.createElement("p");
        currentName.innerHTML = basket[i].name;
        list.appendChild(currentName);
    
        let currentColor = document.createElement("p");
        currentColor.innerHTML = "Couleur : " + basket[i].color;
        list.appendChild(currentColor);
    
        let currentPrice = document.createElement("p");
        currentPrice.innerHTML = basket[i].price;
        list.appendChild(currentPrice);
    
        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.innerHTML = "Supprimer";
        deleteButton.classList.add("deleteButton");
        list.appendChild(deleteButton);
        console.log("basket");
    
    }
}

// *****************    fonctionnement du bouton supprimer   *****************

const deleteButton = document.querySelectorAll(".deleteButton");
const liste = document.getElementsByTagName("li");
 if (basket != null) { 
    for (let i = 0; i < basket.length; i++) {
        let currentButton = deleteButton[i];
        let currentListe = liste[i];
 
        currentButton.addEventListener("click", () => {
            basketList.removeChild(currentListe);
            basket.splice(i, 1);
            alert("Votre panier est à jour");
            //Remplacement de l'ancien "basketContent" par "basketContent" - l'élément supprimé, dans le localStorage
            window.localStorage.setItem("basketContent", JSON.stringify(basket));
            totalPrice(basket); // Recalcul du prix total après suppression
        });
    }
 }
 

// *****************    Calcul du prix total du panier    *****************
function totalPrice (basket){
    let basketSum = 0;
    const totalPrice = document.getElementById("total");
    if (basket == null){
        basketSum = 0;
        
    } else {
        for (let i = 0; i < basket.length; i++) {
            basketSum = basketSum + parseInt(basket[i].price); 
        }
        totalPrice.innerHTML = basketSum + "€";  
        localStorage.setItem("basketSum", JSON.stringify(basketSum));
    }  
}

totalPrice(basket);

    
// *****************    Vérifier les champs du formulaire    *****************

const form = document.getElementById("form");
const formValid = document.getElementById("validationButton");

const firstName = document.getElementById("prenom");
const lastName = document.getElementById("nom");
const email = document.getElementById("email");
const address = document.getElementById("adresse");
const city = document.getElementById("ville");

const missingLastName = document.getElementById("missingLastName");
const missingFistName = document.getElementById("missingFirstName");
const missingEmail = document.getElementById("missingEmail");
const missingAddress = document.getElementById("missingAddress");
const missingCity = document.getElementById("missingCity");

const inputValid = /^[a-z A-Z éèêëàâäîïùûüôö-]*$/;
const emailValid = /@/;


function validation () {
    let orderValid = true;

    // Vérifier le nom
    if (lastName.value == ""){
        missingLastName.innerHTML = "Merci d'ajouter votre nom";
        missingLastName.style.color = "red";
        orderValid = false;
    } else if (inputValid.test(lastName.value) == false) {
        missingLastName.innerHTML = "Veuillez utliliser uniquement des lettres.";
        missingLastName.style.color = "red";
        orderValid = false;
    } else {
        missingLastName.innerText = "";
    }
    //Vérifier le prénom
    if (firstName.value == ""){
        missingFistName.innerHTML = "Merci d'ajouter votre prénom";
        missingFistName.style.color = "red";
        orderValid = false;
    } else if (inputValid.test(firstName.value) == false) {
        missingFistName.innerHTML = "Veuillez utliliser uniquement des lettres.";
        missingFistName.style.color = "red";
        orderValid = false;
    } else {
        missingFistName.innerText = "";
    }
    //Vérifier l'adresse email
    if (email.value == ""){
        missingEmail.innerHTML = "Merci de renseigner votre adresse email";
        missingEmail.style.color = "red";
        orderValid = false;
    } else if (emailValid.test(email.value) == false) {
        missingEmail.innerHTML = "Veuillez renseigner une adresse email valide svp.";
        missingEmail.style.color = "red";
        orderValid = false;
    } else {
        missingEmail.innerText = "";
    }
    //Vérifier l'adresse
    if (address.value == ""){
        //e.preventDefault();
        missingAddress.innerHTML = "Merci de completer votre adresse";
        missingAddress.style.color = "red";
        orderValid = false;
    } else {
        missingAddress.innerText = "";
    }
    //Vérifier la ville
    if (city.value == ""){
        //e.preventDefault();
        missingCity.innerHTML = "Merci de completer votre ville";
        missingCity.style.color = "red";
        orderValid = false;
    } else if (inputValid.test(city.value) == false) {
        missingCity.innerHTML = "Veuillez renseigner une vraie ville svp.";
        missingCity.style.color = "red";
        orderValid = false;
    } else {
        missingCity.innerText = "";
    }
    return orderValid;
}
   

// *****************    Validation du formulaire  *****************
 formValid.addEventListener("click", function(){
    let funcValidation = validation();

    if(funcValidation == true) {
        // *****************    Créations des éléments à envoyer lors de la validation du formulaire   *****************
        let products = basket.map(basket => basket.id);
        let data = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                address: address.value,
                city: city.value
            },
            products: products
        }
        // *****************    envoi du panier et de l'objet contact   *****************
         fetch("http://localhost:3000/api/teddies/order", {
                method: 'POST',
                body: JSON.stringify(data),
                headers : {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                localStorage.setItem("basketData", JSON.stringify(response)); 
                window.location.href = "confirmation.html";
            })
            .catch((error) => alert("Erreur : " + error))
    }
});