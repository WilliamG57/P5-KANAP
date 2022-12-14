let productId = "./product.html?id=";
let url = new URL(window.location.href);
let id = url.searchParams.get("id");


fetch(`http://localhost:3000/api/products/${id}`)
.then(function(response) {
    return response.json();
  })
.then(function(response) {
    displayProduct(response);
})

function displayProduct(product) {
    //Mise en place des constantes pour se placer dans l'html
    const div = document.getElementsByClassName("item__img");
    const image = document.createElement("img");
    const h1 = document.getElementById("title");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const select = document.getElementById("colors");

    div[0].appendChild(image);
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    h1.innerText = product.name;
    price.innerText = product.price;
    description.innerText = product.description;
    for (let color of product.colors) {
        const option = document.createElement("option");
        select.appendChild(option);
        option.innerText = color;
        option.value = color;
    }
}
    const bouton = document.getElementById("addToCart");
    if (bouton !== null) {
        bouton.addEventListener("click", evt => {
            let quantity = document.getElementById("quantity").value;
            let color = document.getElementById("colors").value;
            if (!color || !quantity) {
                alert("Veuillez sélectionner une couleur et une quantité");
            }
            if (quantity < 1 || quantity > 100){
                alert("Veuillez sélectionner une quantité entre 1 et 100");
            }
            else {
            let productCart = []
            if (localStorage.getItem("cart")!== null){
                productCart = JSON.parse(localStorage.getItem("cart"))
            }
            let data = {
                color:color,
                quantity:Number(quantity),
                id:id
            }
            if (data) {
                productCart.push(data);
                localStorage.setItem("cart",JSON.stringify(productCart));
                if (window.confirm("Produit ajouté avec succès, cliqué sur ok pour consulter le panier")) {
                    window.location.href = "./cart.html"
                }
            }
        }})
    }