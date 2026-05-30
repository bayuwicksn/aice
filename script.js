document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("music");

    // --- 1. LOGIKA MUSIK SEAMLESS (MELANJUTKAN) ---
    if (music) {
        // Jika berada di index.html, hentikan musik dan reset data
        if (window.location.href.includes("index.html") || window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
            music.pause();
            music.currentTime = 0;
            localStorage.setItem("playMusic", "false");
            localStorage.setItem("musicTime", "0");
        } 
        // Jika berada di suprise.html atau album.html, cek apakah musik harus jalan
        else if (localStorage.getItem("playMusic") === "true") {
            const savedTime = localStorage.getItem("musicTime");
            if (savedTime) {
                music.currentTime = parseFloat(savedTime);
            }
            
            music.play().catch(() => {
                console.log("Klik layar untuk memutar musik (kebijakan browser)");
            });

            // Simpan posisi lagu setiap detik agar bisa dilanjutkan di page berikutnya
            setInterval(() => {
                if (!music.paused) {
                    localStorage.setItem("musicTime", music.currentTime);
                }
            }, 1000);
        }
    }

    // --- 2. MEMBUAT BINTANG ---
    const starsContainer = document.getElementById("stars");
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            let star = document.createElement("span");
            star.style.left = Math.random() * 100 + "vw";
            star.style.top = Math.random() * 100 + "vh";
            star.style.animationDuration = (2 + Math.random() * 3) + "s";
            starsContainer.appendChild(star);
        }
    }

    // --- 3. LOGIKA TOMBOL START (INDEX.HTML) ---
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.addEventListener("click", function() {
            localStorage.setItem("playMusic", "true");
            localStorage.setItem("musicTime", "0"); // Reset ke awal untuk sesi baru
            
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = "suprise.html";
            }, 1000);
        });
    }

    // --- 4. LOGIKA TOMBOL KE ALBUM (SUPRISE.HTML) ---
    const toAlbumBtn = document.getElementById("toAlbumBtn");
    if (toAlbumBtn) {
        toAlbumBtn.addEventListener("click", function() {
            if (music) {
                localStorage.setItem("musicTime", music.currentTime); // Simpan detik terakhir
            }

            const content = document.getElementById("page2");
            if (content) content.classList.add("implode");

            // Efek bintang pecah jika fungsinya ada
            if (typeof createExplosionParticle === "function") {
                for (let i = 0; i < 50; i++) createExplosionParticle();
            }

            setTimeout(() => {
                window.location.href = "album.html";
            }, 1200);
        });
    }

    // --- 5. LOGIKA HALAMAN KHUSUS ---
    if (window.location.href.includes("suprise.html") || window.location.href.includes("album.html")) {
        setInterval(createFallingStar, 600);
    }
});

// Fungsi Bintang Jatuh
function createFallingStar() {
    const star = document.createElement('div');
    star.classList.add('falling-star');
    star.style.left = (Math.random() * 120 + 20) + "vw"; 
    star.style.top = Math.random() * -10 + "vh";
    star.style.animationDuration = (Math.random() * 1 + 1.2) + "s";
    document.body.appendChild(star);
    setTimeout(() => { star.remove(); }, 2000);
}