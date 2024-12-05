// mendapatkan data api publik dengan alpine js
document.addEventListener("alpine:init", () => {
  // alpine untukproduk
  Alpine.data("products", () => ({
    items: [], // menyimpan data produk
    cache: null, // cache yg disimpan di memori
    async fetchAndDisplayProduct() {
      console.log("Memulai fetch data produk...");

      // mengecek apakah data sudah ada di cache
      if (this.cache) {
        console.log("Menggunakan data dari cache");
        this.items = this.cache; // menggunakan data dari cache
        return;
      }

      try {
        // Mengambil data dari API
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Gagal mengambil data");

        // Parsing data JSON
        const data = await response.json();

        // menyimpan data yg diambil dari cache
        this.cache = data;
        console.log("Data berhasil diambil dan disimpan di cache:", data);

        // Menampilkan data ke items
        this.items = data;
        // menampilkan data ke konsol
        console.log("Produk berhasil diambil: ", data);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
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

// bagian Category
function filterCategory() {
  return {
    // data produk
    items: [
      { category: "men's clothing", description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", id: 1, image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", price: 109.95, rating: { rate: 3.9, count: 120 }, title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops" }, // objek
      { category: "men's clothing", description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.", id: 2, image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", price: 22.3, rating: { rate: 4.1, count: 259 }, title: "Mens Casual Premium Slim Fit T-Shirts" },
      { category: "men's clothing", description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.", id: 3, image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", price: 55.99, rating: { rate: 4.7, count: 500 }, title: "Mens Cotton Jacket" },
      { category: "men's clothing", description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.", id: 4, image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", price: 15.99, rating: { rate: 2.1, count: 430 }, title: "Mens Casual Slim Fit" },
      { category: "jewelery", description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.", id: 5, image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", price: 695, rating: { rate: 4.6, count: 400 }, title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet" },
      { category: "jewelery", description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.", id: 6, image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg", price: 168, rating: { rate: 3.9, count: 70 }, title: "Solid Gold Petite Micropave" },
      { category: "jewelery", description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...", id: 7, image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", price: 9.99, rating: { rate: 3, count: 400 }, title: "White Gold Plated Princess" },
      { category: "jewelery", description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel", id: 8, image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg", price: 10.99, rating: { rate: 1.9, count: 100 }, title: "Pierced Owl Rose Gold Plated Stainless Steel Double" },
      { category: "electronics", description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system", id: 9, image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg", price: 64, rating: { rate: 3.3, count: 203 }, title: "WD 2TB Elements Portable External Hard Drive - USB 3.0" },
      { category: "electronics", description: "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)", id: 10, image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg", price: 109, rating: { rate: 2.9, count: 470 }, title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s" },
      { category: "electronics", description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.", id: 11, image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg", price: 109, rating: { rate: 4.8, count: 319 }, title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5" },
      { category: "electronics", description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty", id: 12, image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg", price: 114, rating: { rate: 4.8, count: 400 }, title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive" },
      { category: "electronics", description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz", id: 13, image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg", price: 599, rating: { rate: 2.9, count: 250 }, title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin" },
      { category: "electronics", description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag", id: 14, image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", price: 999.99, rating: { rate: 2.2, count: 140 }, title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED" },
      { category: "women's clothing", description: "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates", id: 15, image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg", price: 56.99, rating: { rate: 2.6, count: 235 }, title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats" },
      { category: "women's clothing", description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON", id: 16, image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg", price: 29.95, rating: { rate: 2.9, count: 340 }, title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket" },
      { category: "women's clothing", description: "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.", id: 17, image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg", price: 39.99, rating: { rate: 3.8, count: 679 }, title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats" },
      { category: "women's clothing", description: "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem", id: 18, image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg", price: 9.85, rating: { rate: 4.7, count: 130 }, title: "MBJ Women's Solid Short Sleeve Boat Neck V" },
      { category: "women's clothing", description: "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort", id: 19, image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg", price: 7.95, rating: { rate: 4.5, count: 146 }, title: "Opna Women's Short Sleeve Moisture" },
      { category: "women's clothing", description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.", id: 20, image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", price: 12.99, rating: { rate: 3.6, count: 145 }, title: "DANVOUY Womens T Shirt Casual Cotton Short" },
    ],
    filterProduk: [],

    init() {
      this.filterProduk = this.items;
    },

    filterProducts(category) {
      if (category === "all") {
        this.filterProduk = this.items;
      } else {
        this.filterProduk = this.items.filter((item) => item.category === category);
      }
    },
  };
}

// ketika keranjang belanja di klik
document.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded berfungsi menunggu semua hlmn termuat sebelum menjalankan kode ini
  feather.replace(); // Inisialisasi Feather Icons
  const shoppingCart = document.querySelector(".shopping-cart");
  const cartIcon = document.querySelector(".cart-icon");

  // toggle
  if (cartIcon && shoppingCart) {
    cartIcon.onclick = () => {
      shoppingCart.classList.toggle("active");
    };
  } else {
    console.error("Elemen shopping-cart atau cart-icon tidak ditemukan");
  }
});

// ketika tombol kategori di klik
document.addEventListener("DOMContentLoaded", () => {
  const categorySection = document.querySelector(".category");
  const categoryLink = document.querySelector(".kategori");
  const closeBtn = document.querySelector(".close-btn");
  const semuaIsiBody = Array.from(document.body.children); // Ambil semua elemen anak dari body

  // if (categorySection && categoryLink) {
  //   categoryLink.onclick = () => {
  //     categorySection.classList.toggle("tampilkan");
  //   };
  // } else {
  //   console.log("Category tidak ditemukan");
  // }
  // // untuk menutup kategori
  // closeBtn.addEventListener("click", () => {
  //   categorySection.style.display = "none";
  // });

  if (categorySection && categoryLink) {
    categoryLink.onclick = () => {
      const isTampilkan = categorySection.classList.toggle("tampilkan");

      // Tampilkan hanya elemen kategori, sembunyikan elemen lainnya
      semuaIsiBody.forEach((child) => {
        if (!child.classList.contains("category")) {
          child.style.display = isTampilkan ? "none" : ""; // Sembunyikan jika kategori aktif
        }
      });

      // Pastikan elemen kategori tetap terlihat
      categorySection.style.display = isTampilkan ? "block" : "none";
    };
  } else {
    console.log("Category atau tombol kategori tidak ditemukan");
  }

  if (closeBtn) {
    closeBtn.onclick = () => {
      // Tampilkan kembali semua elemen di dalam body
      semuaIsiBody.forEach((child) => {
        child.style.display = ""; // Reset tampilan elemen
      });

      // Sembunyikan kategori
      categorySection.style.display = "none";
      categorySection.classList.remove("tampilkan"); // Hilangkan kelas "tampilkan"
    };
  } else {
    console.log("Tombol close tidak ditemukan");
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
