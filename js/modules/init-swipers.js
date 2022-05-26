const reviewsSwiperPrevSlideButton = document.querySelector('.reviews__swiper-button-prev');
const reviewsSwiperNextSlideButton = document.querySelector('.reviews__swiper-button-next');
const trainersSwiperPrevSlideButton = document.querySelector('.trainers__swiper-button-prev');
const trainersSwiperNextSlideButton = document.querySelector('.trainers__swiper-button-next');

const initReviewsSwiper = () => {
  reviewsSwiperPrevSlideButton.style.display = 'block';
  reviewsSwiperNextSlideButton.style.display = 'block';

  let reviewsSwiper = new Swiper('.reviews__list .swiper', {
    spaceBetween: 20,
  });

  // Навешиваем переключение слайдов по нажатию мышкой на кнопки
  reviewsSwiperPrevSlideButton.addEventListener('click', () => {
    reviewsSwiper.slidePrev();
  });

  reviewsSwiperNextSlideButton.addEventListener('click', () => {
    reviewsSwiper.slideNext();
  });

  // Навешиваем переключение слайдов по нажатию Enter на кнопке
  reviewsSwiperPrevSlideButton.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
      reviewsSwiper.slidePrev();
    }
  });

  reviewsSwiperNextSlideButton.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
      reviewsSwiper.slideNext();
    }
  });
};

const initTrainersSwiper = () => {
  trainersSwiperPrevSlideButton.style.display = 'block';
  trainersSwiperNextSlideButton.style.display = 'block';

  let trainersSwiper = new Swiper('.trainers__list .swiper', {
    spaceBetween: 40,
    slidesPerView: 1,
    rewind: true,

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });

  // Навешиваем переключение слайдов по нажатию мышкой на кнопки
  trainersSwiperPrevSlideButton.addEventListener('click', () => {
    trainersSwiper.slidePrev();
  });

  trainersSwiperNextSlideButton.addEventListener('click', () => {
    trainersSwiper.slideNext();
  });

  // Навешиваем переключение слайдов по нажатию Enter на кнопке
  trainersSwiperPrevSlideButton.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
      trainersSwiper.slidePrev();
    }
  });

  trainersSwiperNextSlideButton.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
      trainersSwiper.slideNext();
    }
  });
};

export const initSwipers = () => {
  initReviewsSwiper();
  initTrainersSwiper();
};
