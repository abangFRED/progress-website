const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8QNN4lk17JJDWQ6guHL12rFIaeiUXVFa32iTaLtbPV-wTfDlmlRnULzZJ6pYLdlQ/exec";

async function ambilData() {
  try {
    const res = await fetch(SHEET_API_URL);
    const data = await res.json();
    tampilkanProduk(data);
  } catch (err) {
    console.error("Gagal mengambil data:", err);
  }
}

function tampilkanProduk(data) {
  const container = document.getElementById("produk-container");
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "produk-card";

    const nama = document.createElement("h2");
    nama.textContent = item.Produk;

    const status = document.createElement("p");
    status.textContent = `Status: ${item.Status}`;

    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-container";

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.style.width = item.Progress + "%";

    const progressText = document.createElement("div");
    progressText.className = "progress-text";
    progressText.textContent = `${item.Progress}%`;

    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);

    // Gambar hanya muncul ketika progress bar diklik
    const gambarContainer = document.createElement("div");
    gambarContainer.className = "gambar-container";

    [item.Gambar1, item.Gambar2, item.Gambar3].forEach(url => {
      if (url && url.trim() !== "") {
        const img = document.createElement("img");
        img.src = url;
        gambarContainer.appendChild(img);
      }
    });

    progressContainer.addEventListener("click", () => {
      const visible = gambarContainer.style.display === "block";
      gambarContainer.style.display = visible ? "none" : "block";
    });

    card.appendChild(nama);
    card.appendChild(status);
    card.appendChild(progressContainer);
    card.appendChild(gambarContainer);

    container.appendChild(card);
  });
}

ambilData();
