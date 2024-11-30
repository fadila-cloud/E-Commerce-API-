// URL API Fake Store
const apiUrl = "https://fakestoreapi.com/products";
// fungsi untuk mengambil dan menampilkan data
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
      // menambahkan produk ke container
      container.innerHTML += productHtml;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
// panggil fungsinya
fetchAndDisplayProduct();

// membuat array kosong untuk shopping-cart
const cart = {
  items: [],
  total: 0,
  quantity: 0,

  add(newItem) {
    // menambah jumlah item
    // mengecek jika ada barang yg sama di cart
    const cartItem = this.items.find((item) => item.id === newItem.id);

    // jika belum ada barangnya
    if (!cartItem) {
      this.items.push({ ...newItem, quantity: 1, total: newItem.price });
      this.quantity++;
      this.total += newItem.price;
    } else {
      // jika barang sudah ada, mengecek apakah barang sama dgn yg ada di cart
      this.items = this.items.map((item) => {
        // jika barang berbeda
        if (item.id !== newItem.id) {
          return item;
        } else {
          // jika barang sudah ada, tambah quantity dan total
          item.quantity++;
          item.total = item.price * item.quantity; // menghitung harga buat item
          this.quantity++;
          this.total += item.price;
          return item;
        }
      });
    }
    this.displayCart();
  },

  // form validation
  less(id) {
    // mengurangi jumlah item
    const cartItem = this.items.find((item) => item.id === id);
    // jika item lebih dari 1
    if (cartItem && cartItem.quantity > 1) {
      this.items = this.items.map((item) => {
        //jika bukan barang yg di klik atau jika id nya tidk sama
        if (item.id !== id) {
          return item;
        } else {
          // mengurangi quantity dan total
          item.quantity--;
          item.total = item.price * item.quantity;
          this.quantity--;
          this.total -= item.price;
          return item;
        }
      });
    } else {
      // jika quantity kurang dari 1 atau 0, tampilkan peringatan
      alert("Jumlah produk tidak boleh kurang dari 1!");
    }
    this.displayCart();
  },

  hapussemua() {
    // mereset semua item
    this.items = []; // mengosongkan item
    this.total = 0; // mereset total belanja
    this.quantity = 0; // mereset jumlah item
    this.displayCart();
  },

  remove(itemtoRemove) {
    // mengahapus setiap item, saya beri nama itemtoRemove
    this.items = this.items.filter((item) => item.id !== itemtoRemove.id); // metode filter hanya untuk elemen tertentu
    // memperbarui total dan jumlah barang setelah penghapusan\
    this.total -= itemtoRemove.price * itemtoRemove.quantity;
    this.quantity -= itemtoRemove.quantity;
    this.displayCart();
  },

  checkout() {
    if (this.items.length > 0) {
      alert(`Anda harus membayar: $${this.total.toLocaleString()}`);
      alert("Checkout berhasil! Terimakasih sudah berbelanja di toko kami!");
      this.hapussemua();
    } else {
      alert("Keranjang kosong! Tambahkan produk sebelum checkout.");
    }
  },

  displayCart() {
    const cartContainer = document.querySelector(".shoppinng-cart .cart-Container");
    const totalPrice = document.querySelector("#total-price");

    cartItem.innerHTML = ""; // kosongkan isinya
    this.items.forEach((item) => {
      const cartItemHtml = `
      <div class="cart-item>
        <img src="${item.image}" alt="${item.title}">
        <div class="detail">
          <h4>${item.title}</h4>
          <span>Price: $${item.price}</span>
          <button id="less" onclick="cart.less(${item.id})">&minus;</button>
          <span>${item.quantity}</span>
          <button id="add" onclick="cart.add({ id: ${item.id}), title: ${item.title}, price: ${item.price}, image: ${item.image} })">&plus;</button>
          <span>Total: $${item.total.toLocaleString()}</span>
          <button class="remove" onclick="cart.remove({ id: ${item.id}, price: ${item.price}, quantity: ${item.quantity} })">Hapus</button>
        </div>
      </div>
      `;
      cartContainer.innerHTML += cartItemHtml;
    });
    totalPrice.textContent = this.quantity;
  },
};

// ketika keranjang belanja di klik
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
  // ambil elemen description box dan bg description
  const descriptionBox = document.querySelector(".description-box");
  const bgDesc = document.querySelector(".bg-desc");
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
  bgDesc.style.display = "block";
}

// menutup description box
function closeDesc() {
  // ambil elemen description box dan bg description
  const descriptionBox = document.querySelector(".description-box");
  const bgDesc = document.querySelector(".bg-desc");
  // menyembunyikan elemn box
  descriptionBox.style.display = "none";
  bgDesc.style.display = "none";
}

// tambahkan ke keranjang
function myCart(button) {
  alert("Pesanan berhasil ditambahkan");
  button.innerHTML = "Ditambahkan ke keranjang";

  // menambahkan angka di elemen jumlah-cart ketika prdouk ditamabhkan
  const jumlahCart = document.getElementById("jumlah-cart");
  jumlahCart.textContent = cart.quantity++;
}
