
document.addEventListener('DOMContentLoaded', function () {
  anchor()
  achievementsSlider()
  bannerSlider()
  awardsSlider()
  galleryPopupSwiper()
  contacts()
  popupScripts()
  testForm()
})

var galleryPopupSwiper

function awardsSlider() {
  if ($('.awards').length > 0) {
    const awardsSwiper = new Swiper('.awards__slider .swiper', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      centeredSlides: true,
      centeredSlidesBounds: true,
      initialSlide: 1,
      navigation: {
        nextEl: '.awards .ui-swiper-button-next',
        prevEl: '.awards .ui-swiper-button-prev'
      },
      breakpoints: {
        1450: {
          slidesPerView: 4,
          spaceBetween: 72,
          centeredSlides: false,
          centeredSlidesBounds: false,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 40,
          centeredSlides: false,
          centeredSlidesBounds: false,
          initialSlide: 0
        }
      }
    })
  }
}

function bannerSlider() {
  if ($('.banner').length > 0) {
    const bannerSwiper = new Swiper('.banner .swiper', {
      slidesPerView: 1,
      spaceBetween: 15,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true
      }
    })
  }
}

function achievementsSlider() {
  if ($('.achievements').length > 0) {
    const achievementsSwiper = new Swiper('.achievements .swiper', {
      slidesPerView: 'auto',
      spaceBetween: 15,
      centeredSlides: true,
      centeredSlidesBounds: true,
      initialSlide: 2,
      init: false
    })
    if ($(window).width() < 768) {
      achievementsSwiper.init()
    }
    window.addEventListener('resize', function () {
      $(window).width() > 767 ? achievementsSwiper.destroy() : achievementsSwiper.init()
    })
  }
}

function galleryPopupSwiper() {
  galleryPopupSwiper = new Swiper('.gallery-popup .swiper', {
    spaceBetween: 10,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })
}

function popupScripts() {
  const closePopupButton = document.querySelector('.js-close-popup')
  if (closePopupButton) {
    closePopupButton.addEventListener('click', function () {
      Fancybox.close(true)
    })
  }
}

function getPopup(popup) {
  const popupSrc = popup.data('type')
  const popupClass = popupSrc.slice(0, -6)
  const popupCloseButton = popup.data('close-popup')
  const linkIndex = popup.index()

  Fancybox.show(
    [
      {
        src: `#${popupSrc}`,
        preload: false,
      },
    ],
    {
      mainClass: `popup popup--${popupClass}`,
      parentEl: document.querySelector('.wrapper'),
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      hideScrollbar: true,
      touch: false,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false,
      closeButton: popupCloseButton,
      
      on: {
        done: (fancybox, slide) => {
          if (popupSrc === 'gallery-popup') {
            console.log(linkIndex)
            galleryPopupSwiper.update()
            galleryPopupSwiper.slideTo((linkIndex + 1), 300)
          }
        }
      }
    }
  );
  
  Fancybox.defaults.ScrollLock = false

  return false
}

function anchor() {
  $('.js-anchor').on('click', function () {
    const _href = $(this).attr('href')
    $('html, body').animate({
      scrollTop: `${$(_href).offset().top}px`
    })
    return false
  })
}

function contacts() {
  $('.contacts__tabs-btn').on('click', function () {
    $(this).siblings().removeClass('contacts__tabs-btn--active')
    $(this).addClass('contacts__tabs-btn--active')
    $('.contacts__tabs-item').removeClass('contacts__tabs-item--active').eq($(this).index()).addClass('contacts__tabs-item--active')
  })
}

function testForm() {
  $('.js-test-request-call').on('submit', function (event) {
    event.preventDefault()
    $(this).parents('.request-call').addClass('request-call--success')
  })

  $('.js-test-request-call .ui-input input').on('keyup', function () {
    if ($(this).val().length > 0) {
      $(this).parents('.ui-input').removeClass('ui-input--error').addClass('ui-input--success')
    } else {
      $(this).parents('.ui-input').removeClass('ui-input--success').addClass('ui-input--error')
    }
  })
}
