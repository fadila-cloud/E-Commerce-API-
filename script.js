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

document.addEventListener("alpine:init", () => {
  // alpine untuk produk
  Alpine.data("products", () => ({
    items: [], // tempat menyimpan produk
    async fetchProducts() {
      try {
        // fetch data dari Fake Store API
        const response = await fetch("https://fakestoreapi.com/products?limit=10");
        const data = await response.json();

        // map data agar sesuai dengan struktur yang diperlukann
        this.items = data.map((product, index) => ({
          id: product.id,
          name: product.title,
          img: product.image,
          proce: product.price * 15000, // konversi harga ke rupiah
          location: `Lokasi ${index + 1}`, // lokasi
          star: `4.${Math.floor(Math.rancom() * 10)} | ${Math.floor(Math.random() * 5000) + 1} terjual`, // untuk rating acak
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Gagal memuat data produk. Silahkan coba lagi nanti");
      }
    },
    init() {
      this.fetchProducts(); // memanggil fungsi fetch saat komponen diinisialisasi
    },
  }));
  //alpine untuk keranjang
  Alpine.store("cart", {
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
        alert(`Anda harus membayar: Rp${this.total.toLocaleString()}`);
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

//  tambahkan ke keranjang
function myCart(button) {
  alert("Pesanan berhasil ditambahkan");
  button.innerHTML = "Ditambahkan ke keranjang";
}
