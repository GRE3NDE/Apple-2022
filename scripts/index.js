import Swiper from '../lib/swiper-bundle.esm.browser.min.js';


// simplebar

new SimpleBar(document.querySelector('.country-list'), {
  classNames: {
    scrollbar: 'country-scrollbar',
    track: 'country-track'
  }
})

// slider
new Swiper('.goods-block', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  navigation: {
    prevEl: '.goods-arrow-prev',
    nextEl: '.goods-arrow-next'
  },
  preventClicks: true,
  a11y: false,
});

//modal

const productMore = document.querySelectorAll('.product-more');
const modal = document.querySelector('.modal');

productMore.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.add('modal-open')
  })
});

modal.addEventListener('click', ({target}) => {
  if (target === modal) {
    modal.classList.remove('modal-open')
  }
})

const formPlaceholder = document.querySelectorAll('.form-placeholder');
const formInput = document.querySelectorAll('.form-input');

formInput.forEach((input, i) => {
  input.addEventListener('focus', () => {
    formPlaceholder[i].classList.add('form-placeholder-active')
  })

  input.addEventListener('blur', () => {
    if (input.value === '') {
      formPlaceholder[i].classList.remove('form-placeholder-active')
    }
  })
});



// currency

const dataCurrency = {};

const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat('EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

const showPrice = (currency = 'USD') => {
  const priceElems = document.querySelectorAll('[data-price]');

  priceElems.forEach(elem => {
    elem.textContent = formatCurrency(elem.dataset.price * dataCurrency[currency] , currency);
  })
};


const myHeaders = new Headers();
myHeaders.append("apikey", "WMVDNK9JCg17986gUGeiU5i6HYo1FCGf");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
    Object.assign(dataCurrency, result.rates)
    showPrice();
  })
  .catch(error => console.log('error', error));


// choices

const countryBtn = document.querySelector('.country-btn');
const countryWrapper = document.querySelector('.country-wrapper');

countryBtn.addEventListener('click', () => {
  countryWrapper.classList.toggle('country-wrapper-open')
});

countryWrapper.addEventListener('click', ({target}) => {
  if (target.classList.contains('country-choise')) {
    countryWrapper.classList.remove('country-wrapper-open');
    showPrice(target.dataset.currency);
  }
});

const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
	  0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

const timer = (deadline) => {
  const unitDay = document.querySelector('.timer-unit-day')
  const unitHour = document.querySelector('.timer-unit-hour')
  const unitMin = document.querySelector('.timer-unit-min')
  const descriptionDay = document.querySelector('.timer-unit-description-day')
  const descriptionHour = document.querySelector('.timer-unit-description-hour')
  const descriptionMin = document.querySelector('.timer-unit-description-min')

  const getTimeRemaning = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaning = dateStop - dateNow;

    const minutes = Math.floor((timeRemaning / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaning / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeRemaning / 1000 / 60 / 60 / 24);

    return {timeRemaning, minutes, hours, days, };
  };

  const start = () => {
    const timer = getTimeRemaning();

    unitDay.textContent = timer.days;
    unitHour.textContent = timer.hours;
    unitMin.textContent = timer.minutes;

    descriptionDay.textContent = declOfNum(timer.days, ['день', 'дня', 'дней']);
    descriptionHour.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']);
    descriptionMin.textContent = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);

    const timerId = setTimeout(start, 60000);

    if (timer.timeRemaning < 0) {
      clearTimeout(timerId);
      unitDay.textContent = '0';
      unitHour.textContent = '0';
      unitMin.textContent = '0';
    }
  }

  start();
};

timer('2023/09/07 20:00');