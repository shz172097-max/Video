let videosData = [];

fetch('videos.json')
  .then(res => res.json())
  .then(videos => {
    videosData = videos;
    displayVideos(videosData);
  });

function displayVideos(videos) {
  const container = document.getElementById("videoContainer");
  container.innerHTML = "";

  videos.forEach(video => {
    container.innerHTML += `
      <div class="video-card">
        <h3>${video.title}</h3>
        <img src="${video.thumbnail}" alt="${video.title}" />
        <iframe width="100%" height="250"
                src="${video.id}" 
                frameborder="0" allowfullscreen></iframe>
      </div>
    `;
  });
}

// وظيفة البحث
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filtered = videosData.filter(video => video.title.toLowerCase().includes(query));
  displayVideos(filtered);
});`;
  card.onclick = () => window.open(video.url, "_blank");
  return card;
}

function filterVideos(query) {
  const gallery = document.getElementById('video-gallery');
  gallery.innerHTML = '';

  const filtered = videosData.filter(video => {
    const q = query.toLowerCase();
    return video.title.toLowerCase().includes(q)
      || (video.description && video.description.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    gallery.innerHTML = `<p>ما فيش فيديوهات تطابق بحثك.</p>`;
  } else {
    filtered.forEach(video => gallery.appendChild(createVideoCard(video)));
  }
}

// ربط البحث
document.getElementById('search-input').addEventListener('input', (e) => {
  filterVideos(e.target.value);
});

loadVideos();