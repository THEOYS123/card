# MYID — Personal Digital Identity Card Builder

Website aplikasi web yang berfungsi sebagai pembuat kartu identitas pribadi digital dan kartu nama digital yang dapat digunakan secara **GRATIS**, tanpa sistem pembayaran, dan tanpa akun wajib.

---

## 📌 Important Disclaimer / Penolakan Kategori
Hasil kartu dari aplikasi MYID **BUKAN KTP**, bukan dokumen resmi pemerintah, dan bukan bukti kependudukan. Istilah yang digunakan adalah:
* **Personal ID**
* **Digital Identity Card**
* **Personal Information Card**
* **Contact Card**

---

## 🚀 Fitur Utama

1. **Multi-Fungsi Identity Card**: Kartu Informasi Pribadi, Kartu Nama, Pemilik Barang/Dompet (Wallet Card), Kontak Darurat, Profil Komunitas, Freelancer, Portfolio, Event, dll.
2. **Editor Card Real-time (3-Column Layout)**: Form data lengkap di sebelah kiri, Live Preview di tengah, dan Pengaturan Desain di sebelah kanan (Tabbed responsive view pada perangkat mobile).
3. **Ukuran Fisik Presisi**:
   * Business Card (90 × 55 mm)
   * Wallet Card / Credit Card Size (85.60 × 53.98 mm)
   * Mini Card (80 × 50 mm)
   * ID Card (85.60 × 54 mm)
   * A6 & A7
   * Custom Size (mm, cm, inch, px)
4. **Cetak & Ekspor Serbaguna**:
   * PNG Download
   * JPG Download
   * PDF Download (true physical millimeter scale)
   * vCard (.vcf) generator kontak ponsel
   * Dynamic QR Code Generator
   * Print Sheet (A4 Grid untuk mencetak beberapa kartu dalam 1 lembar kertas A4)
5. **Backup & Restore System**:
   * Ekspor data kartu dan konfigurasi desain ke format `.myid`
   * Impor kembali file `.myid` tanpa batas
6. **Privasi First**:
   * Mode **PRIVATE** (Default): Data tersimpan secara lokal di browser (`localStorage`).
   * Mode **PUBLIC**: Kartu dapat dibuka via URL khusus `/p/:slug` dengan konfirmasi persetujuan pengguna.
7. **Admin Control Panel (`/admin`)**:
   * Dashboard statistik, moderasi kartu publik, sistem laporan penyalahgunaan (Spam, Abuse, Impersonation), activity logs, dan manajemen pengguna admin.

---

## 🛠️ Tech Stack

* **Frontend**: React 19 + TypeScript + Vite
* **Styling**: Tailwind CSS
* **Export Engine**: `html-to-image` + `jsPDF` + `qrcode`
* **Hosting Target**: Netlify (dikondisikan dengan `netlify.toml` SPA rewrite rules)

---

## 📖 Panduan Penggunaan & Deployment

### 1. Installation
```bash
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Aplikasi berjalan di `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Hasil kompilasi produksi disimpan di folder `dist/`.

### 4. Deployment ke Netlify
Aplikasi sudah disiapkan dengan konfigurasi `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
Untuk men-deploy ke Netlify:
1. Hubungkan repository GitHub ke Netlify.
2. Atur **Build Command**: `npm run build`
3. Atur **Publish Directory**: `dist`
4. Deploy site!

### 5. Environment Variables
Konfigurasi file `.env` berdasarkan `.env.example`:
```env
APP_URL="https://myid.netlify.app"
ADMIN_SECRET="myid_admin_secret_key_2026"
DATABASE_URL=""
STORAGE_URL=""
STORAGE_KEY=""
```

### 6. Admin Panel Setup
* Buka URL `/admin` di browser Anda.
* Gunakan password default: `admin123` (atau sesuai konfigurasi `ADMIN_SECRET`).

---

## 📄 Lisensi
MYID — Personal Digital Identity Card Builder bebas digunakan dan dikembangkan untuk tujuan personal maupun komersial.
