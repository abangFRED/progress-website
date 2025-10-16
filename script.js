// Contoh animasi dinamis untuk update progress
const progress = document.querySelector('.progress');
let percent = 0;

function animateProgress(target) {
  const interval = setInterval(() => {
    if (percent >= target) clearInterval(interval);
    else {
      percent++;
      progress.style.width = percent + '%';
      progress.textContent = percent + '%';
    }
  }, 30);
}

animateProgress(60);

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


