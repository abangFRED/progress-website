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



