//EXTRACTION PARAMETRES URL
const urlParams = new URLSearchParams(window.location.search) 
const productId = urlParams.get("given_id") 
console.log(productId) 

// API INITIALISATION
let url = `http://localhost:3000/api/teddies/${productId}` 

// RECUPERATION DU PRODUIT
fetch(url, {method : 'GET'})
.then(data => {
	return data.json()

//OBJETS EN JSON
}).then(article =>{
	console.log(article)}

);


