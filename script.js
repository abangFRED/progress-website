const cards = document.querySelectorAll('.progress-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Tutup semua galeri lain
    cards.forEach(c => {
      if (c !== card) c.querySelector('.gallery').classList.add('hidden');
    });
    // Toggle galeri yang diklik
    const gallery = card.querySelector('.gallery');
    gallery.classList.toggle('hidden');
  });
});


fetch('data/progress.json')
  .then(res => res.json())
  .then(data => {
    const main = document.querySelector('main');
    data.forEach(item => {
      const card = document.createElement('section');
      card.className = 'progress-card';
      card.innerHTML = `
        <h2>Proyek: ${item.produk}</h2>
        <div class="progress-bar">
          <div class="progress" style="width: ${item.progress}%">${item.progress}%</div>
        </div>
        <p>Status: ${item.status}</p>
        <div class="image-grid">
          ${item.images.map(img => `<img src="images/${img}" alt="${item.produk}">`).join('')}
        </div>
      `;
      main.appendChild(card);
    });
  });



