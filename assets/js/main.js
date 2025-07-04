(function ($) {
  ("use strict");



  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    $(window).trigger("scroll");
    $(window).trigger("resize");
    preloader();
    AOS.init();
  });

  $(function () {
    $(window).trigger("resize");
    mainNav();
    stickyHeader();
    dynamicBackground();
    swiperInit();
    modalVideo();
    scrollUp();
    textAnimation();
  });

  $(window).on("scroll", function () {
    showScrollUp();
  });

  /*-------------------------------------------------
      1. preloader  
 --------------------------------------------------------------*/

  function preloader() {
    setTimeout(function () {
      $("#preloader").addClass("loaded");
      if ($("#preloader").hasClass("loaded")) {
        $("#preloader")
          .delay(850)
          .queue(function () {
            $(this).remove();
          })
          .fadeOut();
      }
    }, 200);
  }

  /*--------------------------------------------------------------
     2. Mobile  Menu  
 -----------------------------------------------------------------*/
  function mainNav() {
    $(".ak-nav").append('<span class="ak-munu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="ak-munu_dropdown_toggle"></span>'
    );
    $(".ak-munu_toggle").on("click", function () {
      $(this)
        .toggleClass("ak-toggle_active")
        .siblings(".ak-nav_list")
        .slideToggle();
    });
    $(".ak-munu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });

    $(".menu-item-has-black-section").append(
      '<span class="ak-munu_dropdown_toggle_1"></span>'
    );

    $(".ak-munu_dropdown_toggle_1").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });

    $(".ak-mode_btn").on("click", function () {
      $(this).toggleClass("active");
      $("body").toggleClass("ak-dark");
    });
    // Side Nav
    $(".ak-icon_btn").on("click", function () {
      $(".ak-side_header").addClass("active");
    });
    $(".ak-close, .ak-side_header_overlay").on("click", function () {
      $(".ak-side_header").removeClass("active");
    });
    //  Menu Text Split
    $(".ak-animo_links > li > a").each(function () {
      let xxx = $(this).html().split("").join("</span><span>");
      $(this).html(`<span class="ak-animo_text"><span>${xxx}</span></span>`);
    });
  }
  /*--------------------------------------------------------------
     3. Sticky Header
--------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $(".ak-sticky_header");
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass("ak-gescout_sticky");
      } else {
        $header.removeClass("ak-gescout_sticky");
        $header.removeClass("ak-gescout_show");
      }

      if ($header.hasClass("ak-gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("ak-gescout_show");
        } else {
          $header.removeClass("ak-gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
     4. Dynamic Background
-------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }

  /*--------------------------------------------------------------    
     5. Slick Slider
 --------------------------------------------------------------*/

  function swiperInit() {
    // if ($.exists(".ak-slider-hero-1")) {
    //   var swiperOptions = {
    //     loop: true,
    //     speed: 1200,
    //     parallax: true,
    //     zoom: {
    //       maxRatio: 5,
    //     },
    //     autoplay: {
    //       delay: 6500,
    //       disableOnInteraction: false,
    //     },
    //     watchSlidesProgress: true,
    //     slidesPerView: "auto",
    //     pagination: {
    //       el: ".hero-swiper-pagination",
    //       clickable: true,
    //       renderBullet: function (index, className) {
    //         return '<p class="' + className + '">' + (index + 1) + "</p>";
    //       },
    //     },
    //     navigation: {
    //       nextEl: ".ak-swiper-button-prev",
    //       prevEl: ".ak-swiper-button-next",
    //     },
    //   };

    //   var swiper = new Swiper(".ak-slider-hero-1", swiperOptions);
    // }
    if ($.exists(".ak-slider-testimonal")) {
      var swiper = new Swiper(".ak-slider-testimonal", {
        loop: true,
        speed: 800,
        effect: "fade",
        autoplay: false,
        slidesPerView: "auto",
        pagination: {
          el: ".ak-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".testimonal-prev",
          prevEl: ".testimonal-next",
        },
      });
    }

    if ($.exists(".ak-trusted-client-slider")) {
      var swiper = new Swiper(".ak-trusted-client-slider", {
        loop: true,
        speed: 1000,
        autoplay: true,
        slidesPerView: "auto",
        pagination: {
          el: ".ak-pagination-2",
          clickable: true,
        },
      });
    }
    if ($.exists(".team-single-page-slider")) {
      var swiper = new Swiper(".team-single-page-slider", {
        loop: true,
        speed: 1000,
        autoplay: true,
        slidesPerView: "auto",
        effect: "coverflow",
        spaceBetween: "12%",
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        },
        keyboard: {
          enabled: true,
        },
        /*  mousewheel: {
          thresholdDelta: 70,
        }, */
        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev",
        },
      });
    }
  }

  /*--------------------------------------------------------------
     6. Modal Video
 --------------------------------------------------------------*/
  function modalVideo() {
    $(document).on("click", ".ak-video-open", function (e) {
      e.preventDefault();
      var video = $(this).attr("href");
      video = video.split("?v=")[1].trim();
      $(".ak-video-popup-container iframe").attr(
        "src",
        `https://www.youtube.com/embed/${video}`
      );
      $(".ak-video-popup").addClass("active");
    });
    $(".ak-video-popup-close, .ak-video-popup-layer").on("click", function (e) {
      $(".ak-video-popup").removeClass("active");
      $("html").removeClass("overflow-hidden");
      $(".ak-video-popup-container iframe").attr("src", "about:blank");
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
     7. Scroll Up
--------------------------------------------------------------*/
  function scrollUp() {
    $(".ak-scrollup").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        0
      );
    });
  }
  // For Scroll Up
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".ak-scrollup").addClass("ak-scrollup-show");
    } else {
      $(".ak-scrollup").removeClass("ak-scrollup-show");
    }
  }

  /*--------------------------------------------------------------
   8. Hover text Animation
--------------------------------------------------------------*/
  function textAnimation() {
    if ($.exists(".text-hover-animaiton")) {
      const $textAnimationElements = $(".text-hover-animaiton");
      if ($textAnimationElements.length > 0) {
        $textAnimationElements.each((index, element) => {
          const $element = $(element);
          const isBlackText = $element.hasClass("black");
          const isWhiteText = $element.hasClass("white");
          const splitType = "words chars";

          const textColorClass = isBlackText
            ? "menu-text black"
            : isWhiteText
            ? "menu-text white"
            : "menu-text";

          new SplitText(element, {
            type: splitType,
            wordsClass: textColorClass,
          });
        });
      }
    }
  }

  /*--------------------------------------------------------------
    9. Pagination 
 --------------------------------------------------------------*/
  if ($.exists(".pagination-wrapper")) {
    var $items = $(".pagination-wrapper .col");
    var numItems = $items.length;
    var perPage = 6;

    $items.slice(perPage).hide();
    $("#pagination-container").pagination({
      items: numItems,
      itemsOnPage: perPage,
      prevText: "&laquo;",
      nextText: "&raquo;",
      onPageClick: function (pageNumber) {
        var showFrom = perPage * (pageNumber - 1);
        var showTo = showFrom + perPage;
        $items.hide().slice(showFrom, showTo).show();
      },
    });
  }

  /*--------------------------------------------------------------
    10. Company Tab
 --------------------------------------------------------------*/
  if ($.exists(".company-tab")) {
    var $activeTab = $(".active-tab");
    var $contentList = $(".tabs-content .list");
    var $tabsList = $(".tabs li");
    var activeIndex = $activeTab.index();
    $contentList.eq(activeIndex).show();

    $(".tabs").on("click", "li", function (e) {
      var $currentTab = $(e.currentTarget);
      var index = $currentTab.index();

      $tabsList.removeClass("active-tab");
      $currentTab.addClass("active-tab");

      $contentList.hide().eq(index).show();
    });
  }

  /*--------------------------------------------------------------
    11. Accordion
 --------------------------------------------------------------*/
  if ($.exists(".ak-accordion-title")) {
    $(".ak-accordion-title").click(function () {
      $(this).toggleClass("active");
      var $accordionTab = $(this).next(".ak-accordion-tab");
      $accordionTab.slideToggle();
      $accordionTab
        .parent()
        .siblings()
        .find(".ak-accordion-tab")
        .slideUp()
        .prev()
        .removeClass("active");
    });
  }

  /*--------------------------------------------------------------
    12. Sticky Content
 --------------------------------------------------------------*/
  if ($.exists(".sticky-content")) {
    if ($(".sticky-content").length) {
      const $window = $(window);
      const $sidebar = $(".sidebar");
      const sidebarHeight = $sidebar.innerHeight();
      const footerOffsetTop = $(".scroll-end-point").offset().top;
      const sidebarOffset = $sidebar.offset();
      const footerThreshold = footerOffsetTop - sidebarHeight;
      let isScrolling = false;
      function handleScroll() {
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(() => {
            const scrollTop = $window.scrollTop();

            if (scrollTop > sidebarOffset.top) {
              $sidebar.addClass("fixed");
            } else {
              $sidebar.removeClass("fixed");
            }

            if (scrollTop + sidebarHeight > footerOffsetTop) {
              const distanceToBottom = -(
                scrollTop +
                sidebarHeight -
                footerOffsetTop
              );
              $sidebar.css({ top: distanceToBottom });
            } else {
              $sidebar.css({ top: 0 });
            }

            isScrolling = false;
          });
        }
      }

      $window.scroll(handleScroll);
    }
  }

  /*--------------------------------------------------------------
     13. Comming Soon Counter
--------------------------------------------------------------*/
  if ($.exists("#comming-section")) {
    commingSoon();

    function commingSoon() {
      const targetDate = new Date("2024-08-31T00:00:00").getTime();

      function updateCountdown() {
        const currentDate = new Date().getTime();
        const timeRemaining = targetDate - currentDate;

        if (timeRemaining <= 0) {
          document.getElementById("countdown").textContent =
            "The event is here!";
          clearInterval(interval);
          return 0;
        } else {
          const months = Math.floor(
            timeRemaining / (1000 * 60 * 60 * 24 * 30.44)
          );
          const days = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24 * 30.44)) /
              (1000 * 60 * 60 * 24)
          );
          const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          document.getElementById("months").textContent = `${months}`;
          document.getElementById("days").textContent = `${days}`;
          document.getElementById("hours").textContent = `${hours}`;
          document.getElementById("minutes").textContent = `${minutes}`;
          document.getElementById("secound").textContent = `${seconds}`;
        }
      }

      const interval = setInterval(updateCountdown, 1000);

      // Initial call to set the countdown value
      updateCountdown();
    }
  }

  /*--------------------------------------------------------------
    14. Light Gallery
--------------------------------------------------------------*/
  if ($.exists("#static-thumbnails")) {
    const galleryDiv = document.getElementById("static-thumbnails");
    lightGallery(galleryDiv, {
      selector: ".item a",
      addClass: "lg-custom-thumbnails",
      animateThumb: true,
      zoomFromOrigin: true,
      allowMediaOverlap: true,
      toggleThumb: true,
    });
  }

  /*--------------------------------------------------------------
    15. Counter
--------------------------------------------------------------*/
  if ($.exists(".auto-counter-section")) {
    var a = 0;
    $(window).scroll(function () {
      var oTop = $(".ak-funfact-number").offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $(".counter").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-number");
          $({
            countNum: $this.text(),
          }).animate(
            {
              countNum: countTo,
            },

            {
              duration: 1500,
              easing: "swing",
              step: function () {
                $this.text(Math.ceil(this.countNum).toLocaleString("en"));
              },
              complete: function () {
                $this.text(Math.ceil(this.countNum).toLocaleString("en"));
              },
            }
          );
        });
        a = 1;
      }
    });
  }
const section = document.querySelector('.video-home');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const currentScroll = window.scrollY;

        if (rect.top < windowHeight && rect.bottom > 0) {
            if (currentScroll > lastScrollTop) {
                // Scroll down → Zoom in + expand
                section.classList.add('active');
            } else {
                // Scroll up → Zoom out + collapse
                section.classList.remove('active');
            }
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

 
 
 //txt slider
  const textItems = document.querySelectorAll('.text-item');
  const hoverImage = document.getElementById('hoverImage');

  let currentHovered = null;

  function showImage(imageUrl) {
    hoverImage.style.transition = 'none';
    hoverImage.style.opacity = '0';
    hoverImage.style.width = '400px';
    hoverImage.style.height = '400px';
    hoverImage.style.transform = 'translate(-50%, -50%) scale(1.3)';

    requestAnimationFrame(() => {
      hoverImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease, width 0.5s ease, height 0.5s ease';
      hoverImage.style.backgroundImage = `url('${imageUrl}')`;
      hoverImage.style.opacity = '1';
      hoverImage.style.width = '200px';
      hoverImage.style.height = '200px';
      hoverImage.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  function hideImage() {
    hoverImage.style.transition = 'transform 0.2s ease';
    hoverImage.style.transform = 'translate(-50%, -50%) scale(1.1)';
    setTimeout(() => {
      hoverImage.style.transition = 'transform 0.4s ease, opacity 0.4s ease, width 0.4s ease, height 0.4s ease';
      hoverImage.style.opacity = '0';
      hoverImage.style.width = '400px';
      hoverImage.style.height = '400px';
      hoverImage.style.transform = 'translate(-50%, -50%) scale(1.3)';
    }, 200);
  }

  // Track mouse position
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hoverImage.style.left = `${mouseX}px`;
    hoverImage.style.top = `${mouseY}px`;
  });

  // Detect hover based on text under mouse
  setInterval(() => {
    const element = document.elementFromPoint(mouseX, mouseY);
    if (element && element.classList.contains('text-item')) {
      if (element !== currentHovered) {
        const imageUrl = element.getAttribute('data-image');
        showImage(imageUrl);
        currentHovered = element;
      }
    } else {
      if (currentHovered !== null) {
        hideImage();
        currentHovered = null;
      }
    }
  }, 100);


})(jQuery);
 