// Ganti URL ini dengan URL Web App dari Google Script kamu
const SHEET_API_URL = "https://script.google.com/d/1xhDpBu-Vjio7OYNoh7tSe8nnu7-GHvKrZ_mu5ILbn8BISb7xlRNbqNjf/edit?usp=sharing";

const container = document.getElementById('project-container');

fetch(SHEET_API_URL)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      // Asumsi kolom di sheet: Produk, Status, Progress, Gambar1, Gambar2, Gambar3, ...
      const productName = item.Produk || "";
      const status = item.Status || "";
      const progress = parseInt(item.Progress) || 0;
      const images = [item.Gambar1, item.Gambar2, item.Gambar3].filter(Boolean);

      // Buat elemen
      const card = document.createElement('section');
      card.className = 'progress-card';
      card.innerHTML = `
        <h2>${productName}</h2>
        <div class="progress-bar">
          <div class="progress" style="width: ${progress}%">${progress}%</div>
        </div>
        <p>Status: ${status}</p>
        <div class="gallery hidden">
          <div class="image-grid">
            ${images.map(img => `<img src="${img}" alt="${productName}">`).join('')}
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Tambahkan behavior klik untuk toggle gallery
    const cards = document.querySelectorAll('.progress-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // tutup semua gallery lain
        cards.forEach(c => {
          if (c !== card) {
            const gal = c.querySelector('.gallery');
            if (gal) gal.classList.add('hidden');
          }
        });
        const galThis = card.querySelector('.gallery');
        if (galThis) galThis.classList.toggle('hidden');
      });
    });
  })
  .catch(err => {
    console.error("Gagal fetch data:", err);
    container.innerHTML = "<p style='color:red;'>Gagal memuat data.</p>";
  });
