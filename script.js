// ambil data produk dari API Publik milik fake store API
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((error) => console.error("Sedang error", error));

fetch("https://fakestoreapi.com/products/1")
  .then((res) => res.json())
  .then((json) => console.log(json));

fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((json) => console.log(json));

fetch("https://fakestoreapi.com/products", {
  method: "POST",
  body: JSON.stringify({
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

fetch("https://fakestoreapi.com/carts")
  .then((res) => res.json())
  .then((json) => console.log(json));
