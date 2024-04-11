$(document).ready(() => {
  const slider = $('.categories-slider');
  slider.slick({
    slidesToShow: 4,
    infinite: false,
    prevArrow: ` 
  <button type="button" class="prev categories-slider-prev">
  <img alt="arror-left" src="svg/left.svg" />
</button>
`,
    nextArrow: `<button type="button" class="next categories-slider-next">
<img alt="arror-right" src="svg/right.svg" />
</button>`,
    variableWidth: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
