$(function () {

    $('.product-tabs__top-item').on('click', function (e) {
        e.preventDefault()
        $('.product-tabs__top-item').removeClass('product-tabs__top-item--active')
        $(this).addClass('product-tabs__top-item--active')

        $('.product-tabs__content-item').removeClass('product-tabs__content-item--active')
        $($(this).attr('href')).addClass('product-tabs__content-item--active')

    })

    $('.product-slide__thumb').slick({
        asNavFor: '.product-slide__big',
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        draggable: false
    })
    $('.product-slide__big').slick({
        asNavFor: '.product-slide__thumb',
        draggable: false,
        arrows: false,
        fade: true
    })

    $('.shop-content__filter-btn').on('click', function () {
        $('.shop-content__filter-btn').removeClass('shop-content__filter-btn--active');
        $(this).addClass('shop-content__filter-btn--active')
    })

    $('.button-list').on('click', function () {
        $('.product-item').addClass('product-item--list')
    })

    $('.button-grid').on('click', function () {
        $('.product-item').removeClass('product-item--list')
    })

    $('.select-style, .product-one__item-num').styler();

    $(".filter-price__input").ionRangeSlider({
        type: "double",
        prefix: "$",
        onStart: function (data) {
            $('.filter-price__from').text(data.from)
            $('.filter-price__to').text(data.to)
        },
        onChange: function (data) {

        },
    });


    $('.top-slider__inner').slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000
    })

    $(".star").rateYo({
        starWidth: "17px",
        normalFill: "#ccccce",
        ratedFill: "#ffc35b",
        readOnly: true,
        startSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="14px" viewBox="0 0 15 14" version="1.1"> <g id="surface1"> <path d="M 8.253906 0.492188 C 8.113281 0.191406 7.824219 0 7.503906 0 C 7.183594 0 6.894531 0.191406 6.753906 0.492188 L 5.078125 4.109375 L 1.339844 4.6875 C 1.027344 4.738281 0.765625 4.96875 0.667969 5.28125 C 0.574219 5.597656 0.652344 5.945312 0.875 6.175781 L 3.589844 8.996094 L 2.949219 12.980469 C 2.894531 13.308594 3.027344 13.640625 3.285156 13.835938 C 3.542969 14.03125 3.882812 14.054688 4.164062 13.898438 L 7.503906 12.027344 L 10.847656 13.898438 C 11.128906 14.054688 11.46875 14.03125 11.726562 13.835938 C 11.984375 13.640625 12.113281 13.308594 12.0625 12.980469 L 11.417969 8.996094 L 14.132812 6.175781 C 14.355469 5.945312 14.4375 5.597656 14.339844 5.28125 C 14.238281 4.96875 13.980469 4.738281 13.667969 4.6875 L 9.925781 4.109375 Z M 8.253906 0.492188 "/> </g> </svg>'
    });


    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function initializeClock(id, endtime) {
        const clock = document.querySelector('.promo__clock');
        const daysSpan = clock.querySelector('.promo__days');
        const hoursSpan = clock.querySelector('.promo__hours');
        const minutesSpan = clock.querySelector('.promo__minutes');
        const secondsSpan = clock.querySelector('.promo__seconds');

        function updateClock() {
            const t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
    }

    const deadline = $('.promo__clock').attr('data-time');
    initializeClock('promo__clock', deadline);

})