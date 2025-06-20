 const funnySlider = document.getElementById("funnySlider");
    const cheeseTrack = document.querySelector(".cheese-track");
    const totalSlides = 7;

    const images = [
      "assets/img/demo.mp4", // local video
      "assets/img/demo.mp4", // local video
      "assets/img/demo.mp4", // image
      "assets/img/demo.mp4", // image
      "assets/img/demo.mp4", // image
      "assets/img/demo.mp4", // image
      "assets/img/demo.mp4"  // image
    ];

    const data = Array.from({ length: totalSlides }, (_, i) => ({
      number: i + 1,
      image: images[i]
    }));

    function getSVG(num) {
      return `
        <svg class="banana-number" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FDFC47" />
              <stop offset="100%" stop-color="#FCB69F" />
            </linearGradient>
            <linearGradient id="fillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FDFC47" />
              <stop offset="100%" stop-color="#FCB69F" />
            </linearGradient>
          </defs>
          <text x="50" y="60" font-size="180" font-family="Arial"
                font-weight="800" stroke="url(#strokeGrad)" stroke-width="2" fill="none"
                text-anchor="middle" dominant-baseline="middle" transform="skewX(-5)">
            ${num}
          </text>
          <text x="50" y="60" font-size="180" font-family="Arial"
                font-weight="800" fill="url(#fillGrad)" opacity="0"
                text-anchor="middle" dominant-baseline="middle" transform="skewX(-5)"
                class="ghost-text">
            ${num}
          </text>
        </svg>`;
    }

    function buildSlider() {
      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "choco-card";
        card.innerHTML = getSVG(item.number);

        const donut = document.createElement("div");
        donut.className = "donut-wrapper";

        if (item.image) {
          const link = document.createElement("a");
          link.href = "#";

          if (item.image.endsWith(".mp4")) {
            const video = document.createElement("video");
            video.src = item.image;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            link.appendChild(video);
          } else {
            const img = document.createElement("img");
            img.src = item.image;
            link.appendChild(img);
          }

          donut.appendChild(link);
        }

        card.appendChild(donut);
        funnySlider.appendChild(card);
      });
    }

    buildSlider();

    // Autoplay scroll
    function startAutoplay() {
      cheeseTrack.scrollLeft += 0.7;
      if (cheeseTrack.scrollLeft >= cheeseTrack.scrollWidth - cheeseTrack.clientWidth) {
        cheeseTrack.scrollLeft = 0;
      }
      requestAnimationFrame(startAutoplay);
    }
    startAutoplay();

    // Drag-to-scroll
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    funnySlider.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      scrollLeft = cheeseTrack.scrollLeft;
      cheeseTrack.classList.add("grabbing");
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      cheeseTrack.classList.remove("grabbing");
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const x = e.clientX;
      const move = x - startX;
      cheeseTrack.scrollLeft = scrollLeft - move;
    });

    funnySlider.addEventListener("touchstart", (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      scrollLeft = cheeseTrack.scrollLeft;
    });

    funnySlider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const x = e.touches[0].clientX;
      const move = x - startX;
      cheeseTrack.scrollLeft = scrollLeft - move;
    });

    funnySlider.addEventListener("touchend", () => {
      isDragging = false;
    });