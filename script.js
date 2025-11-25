let videosData = [];

// ==========================================================
// 1. وظيفة تحميل البيانات (Load Videos)
// ==========================================================
function loadVideos() {
  fetch('videos.json')
    .then(res => {
      if (!res.ok) {
        throw new Error('فشل في جلب videos.json');
      }
      return res.json();
    })
    .then(videos => {
      videosData = videos;
      displayVideos(videosData);
      // تفعيل وظيفة البحث بعد تحميل البيانات
      setupSearch(); 
    })
    .catch(error => {
      console.error('حدث خطأ أثناء تحميل الفيديوهات:', error);
      const container = document.getElementById("videoContainer");
      container.innerHTML = `<p style="color: red; text-align: center; margin-top: 50px;">
          عفواً، فشل تحميل قائمة الفيديوهات.
      </p>`;
    });
}

// ==========================================================
// 2. وظيفة عرض الفيديوهات (Display Videos)
// ==========================================================
function displayVideos(videos) {
  const container = document.getElementById("videoContainer");
  container.innerHTML = ""; 

  if (videos.length === 0) {
    container.innerHTML = `<p style="text-align: center; margin-top: 20px;">ما فيش فيديوهات تطابق بحثك.</p>`;
    return;
  }

  videos.forEach(video => {
    container.innerHTML += `
      <div class="video-card">
        <h3>${video.title}</h3>
        
        <img src="${video.thumbnail}" alt="${video.title}" 
             onerror="this.onerror=null;this.src='[Placeholder image URL]';" />
        
        <iframe width="100%" height="250"
                src="${video.id}" 
                title="${video.title}"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
      </div>
    `;
  });
}

// ==========================================================
// 3. تهيئة وظيفة البحث (Setup Search)
// ==========================================================
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      
      const filtered = videosData.filter(video => 
          video.title.toLowerCase().includes(query)
      );
      
      displayVideos(filtered);
    });
  }
}

// تشغيل البرنامج
loadVideos();
im().toLowerCase();
      
      // إذا كان حقل البحث فارغاً، اعرض كل الفيديوهات
      if (query === '') {
          displayVideos(videosData);
          return;
      }
      
      // تصفية البيانات
      const filtered = videosData.filter(video => 
          video.title.toLowerCase().includes(query)
      );
      
      // عرض النتائج المفلترة
      displayVideos(filtered);
    });
  } else {
    console.warn("عنصر البحث (ID: searchInput) غير موجود في ملف index.html.");
  }
}

// ==========================================================
// 4. تشغيل البرنامج
// ==========================================================
// بدء تحميل الفيديوهات عند تحميل الصفحة
loadVideos();
