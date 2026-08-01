// =====================================================
// THEME TOGGLE
// =====================================================

function toggleTheme() {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

}


// =====================================================
// LOAD SAVED THEME
// =====================================================

if (
    localStorage.getItem("theme") === "light"
) {

    document.body.classList.add("light");

}


// =====================================================
// SCROLL ANIMATION
// =====================================================

const fades =
    document.querySelectorAll(".fade");


function checkFadeElements() {

    fades.forEach((element) => {

        if (
            element.getBoundingClientRect().top
            < window.innerHeight - 100
        ) {

            element.classList.add("show");

        }

    });

}


window.addEventListener(
    "scroll",
    checkFadeElements
);


// Jalankan saat halaman dibuka

checkFadeElements();


// =====================================================
// MOBILE NAVBAR
// =====================================================

function toggleMenu() {

    const navMenu =
        document.querySelector(".nav-right");

    if (!navMenu) return;

    navMenu.classList.toggle(
        "menu-open"
    );

}


// =====================================================
// GALLERY SWITCH
// =====================================================

function showGallery(
    category,
    button
) {

    // Ambil semua gallery

    const galleries =
        document.querySelectorAll(
            ".gallery-content"
        );


    // Sembunyikan semua gallery

    galleries.forEach(
        function(gallery) {

            gallery.classList.remove(
                "active"
            );

        }
    );


    // Ambil semua tombol gallery

    const buttons =
        document.querySelectorAll(
            ".gallery-tab"
        );


    // Hapus active dari semua tombol

    buttons.forEach(
        function(btn) {

            btn.classList.remove(
                "active"
            );

        }
    );


    // Tampilkan gallery yang dipilih

    const selectedGallery =
        document.getElementById(
            category
        );


    if (selectedGallery) {

        selectedGallery.classList.add(
            "active"
        );

    }


    // Aktifkan tombol yang diklik

    if (button) {

        button.classList.add(
            "active"
        );

    }

}

// =====================================================
// PAGE TRANSITION
// =====================================================

// Animasi saat halaman selesai dimuat

window.addEventListener("load", function () {

    document.body.classList.add(
        "page-loaded"
    );

    // Sembunyikan spinner setelah halaman baru selesai kebuka

    const pageLoader =
        document.getElementById("pageLoader");

    if (pageLoader) {
        pageLoader.classList.add("hidden");
    }

});


// Animasi saat pindah halaman

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const pageLinks =
            document.querySelectorAll(
                'a[href$=".html"]'
            );


        pageLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const target =
                            link.getAttribute(
                                "href"
                            );


                        // Abaikan link kosong

                        if (
                            !target ||
                            target === "#"
                        ) {
                            return;
                        }


                        // Abaikan link yang membuka tab baru

                        if (
                            link.target === "_blank"
                        ) {
                            return;
                        }


                        // Abaikan jika Ctrl / Cmd diklik

                        if (
                            event.ctrlKey ||
                            event.metaKey ||
                            event.shiftKey
                        ) {
                            return;
                        }


                        // Hentikan perpindahan langsung

                        event.preventDefault();


                        // Tampilkan spinner loading

                        const pageLoader =
                            document.getElementById("pageLoader");

                        if (pageLoader) {
                            pageLoader.classList.remove("hidden");
                        }


                        // Jalankan animasi keluar

                        document.body.classList.remove(
                            "page-loaded"
                        );

                        document.body.classList.add(
                            "page-exit"
                        );


                        // Pindah halaman setelah animasi

                        setTimeout(
                            function () {

                                window.location.href =
                                    target;

                            },
                            500
                        );

                    }
                );

            }
        );

    }
);

// Fungsi untuk memperbarui ikon tombol
function updateThemeIcon() {
  const toggleBtn = document.querySelector(".toggle");
  if (!toggleBtn) return;

  const isLight = document.body.classList.contains("light");

  // Jika Light Mode -> Tampilkan Bulan 🌙 (klik untuk masuk ke Dark Mode)
  // Jika Dark Mode  -> Tampilkan Matahari ☀️ (klik untuk masuk ke Light Mode)
  toggleBtn.textContent = isLight ? "🌙" : "☀️";
}

// Fungsi saat tombol diklik
function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  // Ubah ikon tombol
  updateThemeIcon();
}

// Jalankan saat halaman pertama kali dibuka / direfresh
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }

  // Setel ikon sesuai tema yang aktif
  updateThemeIcon();
});

// =====================================================
// PROJECT LIGHTBOX (klik gambar -> buka full, bisa geser)
// =====================================================

const projectImages = [
  { src: "Network Instalation.jpg", caption: "Network Setup" },
  { src: "CCTV Instalation.jpg", caption: "CCTV Installation" },
  { src: "Server.png", caption: "Server Monitoring" }
];

let currentLightboxIndex = 0;

function updateLightboxImage() {
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");

  if (!img) return;

  const data = projectImages[currentLightboxIndex];

  img.src = data.src;
  img.alt = data.caption;
  if (caption) caption.textContent = data.caption;
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxImage();

  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function changeLightboxImage(direction) {
  currentLightboxIndex =
    (currentLightboxIndex + direction + projectImages.length) %
    projectImages.length;

  updateLightboxImage();
}

document.addEventListener("DOMContentLoaded", () => {

  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  // Klik area gelap di luar gambar buat nutup
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard: Escape nutup, panah kiri/kanan geser
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") changeLightboxImage(1);
    if (e.key === "ArrowLeft") changeLightboxImage(-1);
  });

  // Swipe di HP: geser kiri/kanan buat pindah gambar
  let touchStartX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > 50) {
      changeLightboxImage(diff > 0 ? -1 : 1);
    }
  });

});