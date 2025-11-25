let videosData = [];

// 1. جلب البيانات
function loadVideos() {
    fetch('videos.json')
      .then(res => res.json())
      .then(videos => {
        videosData = videos;
        displayVideos(videosData);
      })
      .catch(error => {
        // إذا كنت تفتح الملف محليًا (file:///...), قد تحتاج إلى خادم ويب لتجنب هذا الخطأ
        console.error('Error loading videos.json:', error); 
        document.getElementById("videoContainer").innerHTML = `<p style="color:red; text-align:center;">
            فشل تحميل البيانات. تأكد من تشغيل المشروع عبر خادم ويب (مثل GitHub Pages أو Live Server).
        </p>`;
      });
}

// 2. عرض الفيديوهات
function displayVideos(videos) {
  const container = document.getElementById("videoContainer");
  container.innerHTML = ""; // تنظيف المحتوى القديم

  if (videos.length === 0) {
      container.innerHTML = `<p style="text-align:center; margin-top: 20px;">ما فيش فيديوهات تطابق بحثك.</p>`;
      return;
  }

  videos.forEach(video => {
    // بناء بطاقة الفيديو
    const cardHTML = `
      <div class="video-card">
        <h3>${video.title}</h3>
        <img src="${video.thumbnail}" alt="${video.title}" />
        
        <iframe width="100%" height="250"
                src="${video.id}" 
                frameborder="0" allowfullscreen></iframe>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

// 3. وظيفة البحث وربطها بـ #searchInput
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      // تصفية البيانات
      const filtered = videosData.filter(video => video.title.toLowerCase().includes(query));
      displayVideos(filtered);
    });
}

// البدء بتحميل الفيديوهات
loadVideos();
