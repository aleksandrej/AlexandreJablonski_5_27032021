// import {Test} from '/js/modules/Test.js'

// Test.testUn();

// API INITIALISATION
let url = "http://localhost:3000/api/teddies";

console.log(url);

// CREATION DES CARTES POUR CHAQUE PRODUIT
// Option plus propre que le innerHTML
const teddies = document.getElementById("teddies");

function products(data) {
  for (let i = 0; i < data.length; i++) {
    let card_link = document.createElement("a");
    card_link.classList.add("card_link");
    card_link.href = "frontend/pages/products.html?id=" + data[i]._id;
    teddies.appendChild(card_link);

    let fig = document.createElement("figure");
    fig.classList.add("figure");
    card_link.appendChild(fig);

    let img_teddies = document.createElement("img");
    img_teddies.src = data[i].imageUrl;
    fig.appendChild(img_teddies);

    let figCaption = document.createElement("figcaption");
    figCaption.classList.add("figcaption");
    fig.appendChild(figCaption);

    let product_name = document.createElement("h2");
    product_name.innerText = data[i].name;
    figCaption.appendChild(product_name);

    let price = document.createElement("p");
    price.innerText = data[i].price / 100 + " €";
    figCaption.appendChild(price);

    // let detail = document.createElement("a");
    // detail.href = "frontend/pages/products.html?id=" + data[i]._id;
    // detail.innerHTML = "Je t'adopte";
    // figCaption.appendChild(detail);
  }
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    products(data);
    console.log(data);
  })
  .catch((error) => alert("Erreur : " + error));

// ANCIENNE VERSION MODIFIEE SUITE POINT AVEC MENTOR LOUIS

//RECUPERATION DES PRODUITS
// fetch(url, { method: "GET" })
//   .then((data) => {
//     // Utilisation d'une expression de fonction fléchée (arrow function en anglais) pour avoir une syntaxe plus courte
//     return data.json();

//     //OBJETS EN JSON
//   })
//   .then((products) => {
//     console.log(products);

//     //INITIALISATION HTML
//     let HTML = document.getElementById("products");

//     let myHTML = "";

//     //AJOUT PRODUITS
//     products.forEach((product) => {
//       console.log(product.name);
//       console.log(product.price);
//       console.log(product._id);

//       //INITIALISATION PRIX
//       let productPrice = product.price / 100;
//       //   Division par 100 pour avoir un prix realiste

//       //FORMATAGE DU PRIX AVEC MISE AU NORME EURO
//       let euroPrice = new Intl.NumberFormat("fr-FR", {
//         style: "currency",
//         currency: "EUR",
//       }).format(productPrice);
//       //

//       //HTML

//       myHTML += `<figure>
// 						<img src="${product.imageUrl}" alt="${product.name}">
// 						<figcaption>
// 							<h2>${product.name}</h2>
// 							<p>${euroPrice}</p>
// 							<a href="frontend/pages/products.html?given_id=${product._id}">Détails</a>
// 						</figcaption>
// 					</figure>`;
//     });

//     console.log(myHTML);
//     HTML.innerHTML = myHTML;

//   });
