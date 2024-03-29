/* eslint-disable no-undef */
$(document).ready(() => {
  $('.parent-slider').each((index, element) => {
    const $slider = $(element).find('.children-slider');

    $slider.slick({
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    $(element)
      .find('.portfolio-prev')
      .click(() => {
        $slider.slick('slickPrev');
      });

    $(element)
      .find('.portfolio-next')
      .click(() => {
        $slider.slick('slickNext');
      });
  });
});
$(window).on('resize', () => {
  $('.children-slider').slick('setPosition');
});
