"use strict";
// Слайдер 
var next = document.getElementById('next');
var prew = document.getElementById('prew');

var slides = document.getElementsByClassName('slide');
for(var i=0; i<slides.length; i++) {
    slides[i].style.zIndex = slides.length - i;
}

next.onclick = function () {
    var activeEl = document.querySelector('.active');
    if(activeEl.nextElementSibling) {
        activeEl.style.left = "-100%";
        activeEl.classList.remove('active');
        activeEl.nextElementSibling.classList.add('active');
        this.classList.remove('disabled');
        prew.classList.remove('disabled');
        if(!activeEl.nextElementSibling.nextElementSibling) {
            this.classList.add('disabled');
        }
    }
}
prew.onclick = function () {
    var activeEl = document.querySelector('.active');
    if(activeEl.previousElementSibling) {
        activeEl.previousElementSibling.style.left = "0%";
        activeEl.classList.remove('disabled');
        activeEl.previousElementSibling.classList.add('active');
        this.classList.remove('disabled');
        next.classList.remove('disabled');
        if(!activeEl.previousElementSibling.previousElementSibling) {
            this.classList.add('disabled');
        }
    }
}

//Модальное окно

var closeBtn = document.querySelector('.closeBtn');
var modal = document.querySelector('.modal');
var overflow = document.createElement('div');
// !!!! класс для добавления блюра
var wrapper = document.querySelector('.blur');
// !!!!
var body = document.querySelector('body');
var trigger = document.querySelector('.details-location');
trigger.onclick = function () {
	overflow.className = "overflow";
    document.body.appendChild(overflow);
	modal.style.top = "0%";
    wrapper.classList.add("wrapper_blur");
    body.style.overflow = 'hidden'; //Убирается прокрутка страницы
}

overflow.onclick = function () { //Клик вне области
    modal.style.top = "-170%";
	wrapper.classList.remove("wrapper_blur"); //Удаление размытия
    overflow.remove();
    body.style.overflow = "scroll";
}

closeBtn.addEventListener('click', function(){ //Клик по кнопке закрытия
	modal.style.top = "-170%";
	wrapper.classList.remove("wrapper_blur") //Удаление размытия
    overflow.remove();
    body.style.overflow = "scroll";
})


