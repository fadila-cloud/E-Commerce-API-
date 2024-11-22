# **Proyek: Pembayaran E-Commerce Sederhana dengan Keranjang Belanja**

## **Deskripsi Proyek**
  Proyek ini adalah aplikasi belanja online berbasis web. Aplikasi ini memanfaatkan API publik untuk menampilkan daftar produk, menyediakan fitur pencarian dan filter, serta memungkinkan pengguna untuk mengelola keranjang belanja. Selain itu, terdapat validasi checkout menggunakan **Rejex** untuk memastikan input pengguna valid.

## **Struktur Branch**
1. **main**  
  Branch utama untuk versi stabil dari aplikasi.

2. **feature-product-api**  
   Menambahkan fitur API produk. Halaman produk akan menampilkan daftar produk dari API publik seperti Fake Store API atau API lainnya. Setiap produk mencakup gambar, nama produk, harga, dan tombol "Tambahkan ke Keranjang". Data produk diambil menggunakan fetch API, dan caching digunakan untuk menghindari pengambilan data berulang.

3. **feature-filter-search**  
   Menambahkan fitur untuk memfilter produk berdasarkan kategori dan mencari produk berdasarkan nama. Fitur ini memudahkan pengguna dalam menemukan produk yang diinginkan.

4. **feature-temp-storage**  
   Implementasi penyimpanan sementara menggunakan `localStorage` atau `sessionStorage`. Data produk (gambar, nama, harga) disimpan setelah diambil dari API. Data hanya akan dimuat ulang dari API jika storage kosong. Tombol "Segarkan Data" ditambahkan untuk menghapus data yang disimpan dan memuat ulang produk dari API.

5. **feature-localstorage-cart**  
   Menambahkan manajemen keranjang belanja dengan `localStorage`. Keranjang belanja tetap ada meskipun halaman direfresh. Data keranjang diperbarui saat pengguna menambahkan, menghapus, atau mengubah jumlah produk.

6. **feature-checkout-validation**  
   Menambahkan validasi checkout menggunakan Regular Expressions (Regex) untuk memvalidasi format email, nomor telepon (minimal 10 digit), dan nomor kartu kredit (jika metode pembayaran adalah kartu kredit). Juga menambahkan metode pembayaran seperti marketplace pada form checkout.

7. **feature-ui-animations**  
   Menambahkan animasi dan interaksi UI untuk meningkatkan pengalaman pengguna di aplikasi.

## **Cara Menjalankan Proyek**
1. **Clone Repository**
  Clone repository dari GitHub ke komputer anda:
  - git clone <URL_REPOSITORY>
  - cd <NAMA_FOLDER_REPOSITORY>

2. **Persiapan Lingkungan**
   Jika proyek menggunakan dependency seperti Node.js, jalankan:
   - npm install
   Jika tidak, pastikan file index.html ada di root folder.

3. **Menjalankan Proyek**
   Untuk menjalankan proyek secara lokal, gunakan:
   Node.js
   - npm start
   Tanpa framework: Buka index.html langsung di browser.

4. **Pilih Branch**
    Pilih branch yang sesuai dengan fitur yang ingin Anda kerjakan:
    - git checkout <nama_branch>

5. **Commit dan Push Perubahan**
   Setelah selesai mengembangkan fitur, lakukan commit dan push ke GitHub:
   - git add .
   - git commit -m "Menambahkan fitur [nama fitur]"
   - git push origin <nama_branch>

6. **Merge Fitur ke Branch main**
   Setelah fitur selesai, lakukan merge fitur ke branch main:
   - git checkout main
   - git merge feature-product-api
   - git merge feature-filter-search
   - git merge feature-temp-storage
   - git merge feature-localstorage-cart
   - git merge feature-checkout-validation
   - git merge feature-ui-animations

7. **Push Perubahan ke GitHub**
   Setelah menggabungkan perubahan dari branch fitur, push perubahan ke repository GitHub:
   - git push origin main

## **Penjelasan Branch dan Fitur-Fiturnya**
1. **Branch: feature-api-products**
   Fitur ini bertujuan untuk menampilkan daftar produk di halaman produk menggunakan API publik seperti Fake Store API atau API lainnya. Setiap produk yang ditampilkan mencakup: Gambar, nama produk, harga produk, dan tombol "tambahkan ke keranjang".
   
2. **Branch: feature-filter-search**
   Memfilter produk berdasarkan kategori tertentu (misalnya, elektronik, pakaian, dll.). Mencari produk berdasarkan nama atau kata kunci.

3. **Branch: feature-temp-storage**
   Untuk meningkatkan pengalaman pengguna, proyek ini menggunakan localStorage atau sessionStorage untuk menyimpan data produk setelah dimuat dari API. Data hanya diambil ulang jika storage kosong.

4. **Branch: feature-localStorage-cart**
   Fitur ini memastikan bahwa data keranjang belanja tetap ada meskipun halaman direfresh, dengan cara menyimpan data keranjang di localStorage.

5. **Branch: feature-checkout-validation**
   Pada bagian checkout, proyek ini menggunakan Regular Expressions (Regex) untuk memvalidasi data yang dimasukkan pengguna di form checkout.

6. **Branch: feature-ui-animations**
   Untuk meningkatkan pengalaman pengguna, proyek ini menambahkan berbagai animasi dan interaksi UI.
