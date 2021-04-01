// import {Test} from '/js/modules/Test.js'

// Test.testUn();

// API INITIALISATION
let url = "http://localhost:3000/api/teddies";

console.log(url);

//RECUPERATION DES PRODUITS
fetch(url, { method: "GET" })
  .then((data) => {
    // Utilisation d'une expression de fonction fléchée (arrow function en anglais) pour avoir une syntaxe plus courte
    return data.json();

    //OBJETS EN JSON
  })
  .then((products) => {
    console.log(products);

    //INITIALISATION HTML
    let HTML = document.getElementById("products");

    let myHTML = "";

    //AJOUT PRODUITS
    products.forEach((product) => {
      console.log(product.name);
      console.log(product.price);

      //INITIALISATION PRIX
      let productPrice = product.price / 100;
      //   Division par 100 pour avoir un prix realiste

      let newPrice = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      });
      //

      //HTML 
      myHTML += `<figure>
						<img src="${product.imageUrl}" alt="${product.name}">
						<figcaption>
							<h2>${product.name}</h2>
							<p>${newPrice}</p>
							<a href="frontend/pages/products.html?given_id=${product._id}">Détails</a>
						</figcaption>
					</figure>`;
    });

    console.log(myHTML);
    HTML.innerHTML = myHTML;
  })

