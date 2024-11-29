// URL API Fake Store
const apiUrl = "https://fakestoreapi.com/products";

// Fungsi untuk mengambil dan menampilkan data
async function fetchAndDisplayProduct() {
  try {
    // Fetch data dari API fake store
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Gagal mengambil data");
    const data = await response.json();

    // Dapatkan container untuk menampilkan produk
    const container = document.querySelector(".products-container"); // untuk mengambil elemen tunggal
    container.innerHTML = ""; // membersihkan semua isi di dlm container

    // tampilkan setiap produk ke halaman
    data.forEach((product) => {
      const productHtml = `
      <div class="product">
        <img src="${product.image}" alt="${product.title}">
        <h3 id="title" onclick="klikProduk(this)">${product.title}</h3>
        <h5 onclick="clickMe(this)">Detail...</h5>
        <p class="description">${product.description}</p>
        <div class="pricerate">
          <p class="price">Price: $${product.price}</p>
          <p class="rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
        </div>
        <button class="troli-cart" onclick="myCart(this)">Tambahkan ke Keranjang</button>
      </div>
    `;

    //   // menambahkan produk ke container
      container.innerHTML += productHtml;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
// panggil fungsinya
fetchAndDisplayProduct()

// keranjang belanja
document.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded berfungsi menunggu semua hlmn termuat sebelum menjalankan kode ini
  feather.replace(); // Inisialisasi Feather Icons

  // ambil elemen shopping-cart dan cart-icon
  const shoppingCart = document.querySelector(".shopping-cart");
  const cartIcon = document.querySelector(".cart-icon");

  // ketika tombol keranjang di klik
  if (cartIcon && shoppingCart) {
    cartIcon.onclick = () => {
      shoppingCart.classList.toggle("active");
    };
  } else {
    console.error("Elemen shopping-cart atau cart-icon tidak ditemukan");
  }
});

// payment method ketika kartu kredit di klik
document.addEventListener("DOMContentLoaded", function () {
  const pilihPembayaran = document.querySelector("#payment");
  const expiredLabel = document.querySelectorAll(".expired-label");

  pilihPembayaran.addEventListener("change", function () {
    if (this.value === "Kartu Kredit") {
      // tampilkan elemen tanggal dan tahun kadaluarsa
      expiredLabel.forEach((label) => (label.style.display = "block"));
    } else {
      // sembunyikan elemen tanggal dan tahun kdaluarsa
      expiredLabel.forEach((label) => (label.style.display = "none"));
    }
  });
});

// menampilkan title lengkapnya
function klikProduk(h3) {
  h3.classList.toggle("fulltitle");
}

// menampilkan box description disertai gambar dan deskripsi dari kelas product di javascript
function clickMe(h5) {
  // ambil elemen description box
  const descriptionBox = document.querySelector(".description-box");
  const img = descriptionBox.querySelector("img");
  const descText = descriptionBox.querySelector("p");

  // emnemukan elemen produk terkait
  const productElement = h5.closest(".product");
  const productImage = productElement.querySelector("img").src; // mengambil gambar dari url kelas product
  const productDescription = productElement.querySelector(".description").textContent; // mengambil text di dlmnya deskripsi kelas product

  // perbarui konten dalam descirption box
  img.src = productImage;
  descText.textContent = productDescription;

  // menampilkan description box
  descriptionBox.style.display = "block";
}

// fungsi unutk menutup description box
function closeDesc() {
  // ambil elemen description box dan bg description
  const closeBox = document.querySelector(".description-box");

  // menyembunyikan elemn box
  closeBox.style.display = "none";
}

// tambahkan ke keranjang
function myCart(button) {
  alert("Pesanan berhasil ditambahkan");
  button.innerHTML = "Ditambahkan ke keranjang";
}
