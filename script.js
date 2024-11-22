const apiUrl = "https://fakestoreapi.com/products/";

fetch(apiUrl)
    .then(response => response.json()) // langsung ubah respons ke form
    .then(data => {
        console.log(data)  // mencetak data ke konsol
    })
    .catch(error => {
        console.error("Error fetching data:", error); // menangkap error jika ada
    });