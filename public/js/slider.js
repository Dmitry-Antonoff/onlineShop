// /* eslint-disable no-undef */
// $(document).ready(() => {
//   $('.parent-slider').each((index, element) => {
//     const $slider = $(element).find('.children-slider');

//     $slider.slick({
//       slidesToScroll: 1,
//       infinite: false,
//       arrows: false,
//       slidesToShow: 5,
//       responsive: [
//         {
//           breakpoint: 769,
//           settings: {
//             slidesToShow: 2,
//             slidesToScroll: 1,
//           },
//         },
//         {
//           breakpoint: 500,
//           settings: {
//             slidesToShow: 1,
//             slidesToScroll: 1,
//           },
//         },
//       ],
//     });

//     $(element)
//       .find('.portfolio-prev')
//       .click(() => {
//         $slider.slick('slickPrev');
//       });

//     $(element)
//       .find('.portfolio-next')
//       .click(() => {
//         $slider.slick('slickNext');
//       });
//   });
// });
// $(window).on('resize', () => {
//   $('.children-slider').slick('setPosition');
// });
let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  
  for (let i = slideIndex; i < slideIndex + 5; i++) { // Показываем 3 слайда одновременно
    if (i < slides.length) {
      slides[i].style.display = 'block';
    }
  }
}

function nextSlide() {
  slideIndex += 3;
  showSlides();
}

function prevSlide() {
  slideIndex -= 3;
  if (slideIndex < 0) {
    slideIndex = 0;
  }
  showSlides();
}

// Показать первые 3 слайда при загрузке страницы
showSlides();