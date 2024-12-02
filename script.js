// mendapatkan data api publik dengan alpine js
document.addEventListener("alpine:init", () => {
  // alpine untukproduk
  Alpine.data("products", () => ({
    items: [], // menyimpan data produk
    async fetchAndDisplayProduct() {
      console.log("Memulai fetch data produk...");
      try {
        // Mengambil data dari API
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Gagal mengambil data');
    
        // Parsing data JSON
        const data = await response.json();
    
        // Menampilkan data ke items
        this.items = data;
        // menampilkan data ke konsol
        console.log('Produk berhasil diambil: ', data);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    },

    // panggil
    init() {
      console.log("Inisialisasi Alpine...");
      this.fetchAndDisplayProduct();
    },
  }));
    
  //alpine untuk keranjang
  Alpine.store("cart", {
    items: [], // untuk menyimpan barang
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
    },
    hapussemua() {
      // mereset semua item
      this.items = []; // mengosongkan item
      this.total = 0; // mereset total belanja
      this.quantity = 0; // mereset jumlah item
    },
    checkout() {
      const inputs = document.querySelectorAll("#checkout input, #checkout select"); // mengambi semua input dan select yg ada di kelas checkout
      // mengubah input menjadi array
      let formKomplit = Array.from(inputs).every((input) => input.value.trim() !== ""); // mengambi setiap inputan dengan every
      if (formKomplit) {
        alert(`Anda harus membayar: $${this.total}`);
        alert("Checkout berhasil! Terimakasih sudah berbelanja di toko kami!");
        // panggil this.hapussemua() untuk mengosongkan cart stelah checkout
        this.hapussemua();
      } else {
        alert("Error! Harap isi semua field sebeum checkout.");
      }
    },
    remove(itemtoRemove) {
      // mengahapus setiap item, saya beri nama itemtoRemove
      this.items = this.items.filter((item) => item.id !== itemtoRemove.id); // metode filter hanya untuk elemen tertentu
      // memperbarui total dan jumlah barang setelah penghapusan\
      this.total -= itemtoRemove.price * itemtoRemove.quantity;
      this.quantity -= itemtoRemove.quantity;
    },
  });
});

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
  if (button.dataset.clicked === "true") {
    return; // keluar dari fungsi jika sudah diklik sebelumnya
  }
  // menampilkan alert hanya untuk kik yg pertama
  alert("Pesanan berhasil ditambahkan");
  button.innerHTML = "Ditambahkan ke keranjang";
  // menandai button sbg sudah di klik
  button.dataset.clicked = "true";
}
