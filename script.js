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
    // render data ke halaman
  });
