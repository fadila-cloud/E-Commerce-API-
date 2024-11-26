// URL API Fake Store
const apiUrl ='https://fakestoreapi.com/products'

// Fungsi untuk mengambil dan menampilkan data
async function fetchAndDisplayProduct() {
  try {
    // Fetch data dari API
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Gagal mengambil data');

    const data = await response.json();

    // Dapatkan container untuk menampilkan produk
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // membersihkan semua isi di dlm container

    // iterasi semua produk dengan forEach
    data.forEach((product) => {
      const productHtml = `
      <div class="product">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="description">${product.description}</p>
        <p class="price">Price: $${product.price}</p>
        <p class="rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
      </div>
    `;

    // menambahkan produk ke container
    container.innerHTML += productHtml;
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Panggil fungsi untuk fetch dan tampilkan produk
fetchAndDisplayProduct();

