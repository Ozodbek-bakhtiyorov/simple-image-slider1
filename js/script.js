window.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.offer__slide'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slideInner = document.querySelector('.offer__slider-inner'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        width = getComputedStyle(slideWrapper).width,
        slider = document.querySelector('.offer__slider');
    slideInner.style.width = 100 * slides.length + '%';
    console.log(width);

    let slideIndex = 1,
        offset = 0;
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }

    slides.forEach(slide => {
        slide.style.width = width;

    });
    slider.style.position = 'relative';
    let indecator = document.createElement('ol'),
        dots = [];
    indecator.style.cssText = `
        position:absolute;
        right: 0 ;
        bottom: 0;
        left:0;
        z-index:15;
        display:flex;
        margin-right:15%;
        margin-left:15%;
        list-style:none;
        justify-content:center;
    `;
    slider.append(indecator);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing:content-box;
            flex:0 1 auto;
            width:20px;
            height:6px;
            margin-right:3px;
            margin-left:3px;
            cursor:pointer;
            background-color:white;
            background-clip:padding-box;
            border-top:10px solid transparent;
            opacity:.5;
            transition:opacity .6 ease
         `;
        indecator.append(dot);
        if (i == 0) {
            dot.style.opacity = '1';
        }
        dots.push(dot);
    }


    //buttons
    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        }
        else {
            offset += +width.slice(0, width.length - 2);
        }
        slideInner.style.transform = `translate(-${offset}px)`;
        if (slideIndex === slides.length) {
            slideIndex = 1;
        }
        else slideIndex++;

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        }
        else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = '1';

       


    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = (+width.slice(0, width.length - 2) * (slides.length - 1));
        }
        else {
            offset -= +width.slice(0, width.length - 2);
        }
        slideInner.style.transform = `translate(-${offset}px)`;
        if (slideIndex == 1) {
            slideIndex = slides.length;
        }
        else slideIndex--;
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        }
        else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
       
      
        

    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = (+width.slice(0, width.length - 2) * (slideTo - 1));
            slideInner.style.transform = `translate(-${offset}px)`;
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            }
            else {
                current.textContent = slideIndex;
            }
            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dots[slideIndex - 1].style.opacity = '1';
        });

    });



});



