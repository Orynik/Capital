"use strict";
//Калькулятор

var input = document.querySelector(".weight-item");

let input_value = 0;
let calc_probe = 1800;
let calc_quality = 2;
let error = document.querySelector(".error");

//Объекты для расчета значений
let arrOfSimple = [
    {
        simple: 375,
        value: 900
    },
    {
        simple: 583,
        value: 1200
    },
    {
        simple: 585,
        value: 1600
    },
    {
        simple: 750,
        value: 1800
    },
    {
        simple: 925,
        value: 2300
    }
];

let arrOfQuality = [
    {
        name: 'liquid',
        value: 2
    },
    {
        name: 'scrap',
        value: 4
    }
];

//Поиск, добавление/удаление класса, расчет стоимости
function simple(val){
    defenitionSimple(val);
    changeSimple(val);
    calculate(input_value,calc_probe,calc_quality);
}

function quality(val){
    defenitionQuality(val);
    changeQuality(val);
    calculate(input_value,calc_probe,calc_quality);
}

//Перезапись текущего значение в соответсвии с нажатой кнопкой

function defenitionQuality(val){
    arrOfQuality.forEach(item => {
        if(item.name == val){
            calc_quality = item.value;
        }
    })
}

function defenitionSimple(val){
    arrOfSimple.forEach(item => {
        if(item.simple == val){
            calc_probe = item.value;
        }
    });
}

//Удаление active с других кнопок и дбавление на нажатую
function changeSimple(elem){
    document.querySelectorAll('.buttons-probe .active').forEach(n => n.classList.remove('active')) 
    document.getElementById(elem).classList.add("active");
}

function changeQuality(elem){
    document.querySelectorAll('.buttons-quality .active').forEach(n => n.classList.remove('active'))
    document.getElementById(elem).classList.add("active");
}

//Расчет стоимости
function calculate (weight, probe, quality){
    var calc_result = Math.round(weight * probe * quality);
    document.getElementById("result").innerHTML = calc_result;
}

//Вывод данных с input и валидация данных
input.oninput = function() {
    if(isNaN(input.value) || input.value <= 0){
        result.innerHTML = 0;
        var text_error = "Ошибка, введите корректное число"
        error.innerHTML = text_error;
    }if(!isNaN(input.value) || input.value == ""){
        error.innerHTML = "";
        input_value = input.value;
        calculate(input_value,calc_probe,calc_quality);
    }
};

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

//Слайдер поступлений

var next_item = document.getElementById("next-items");
var prew_item = document.getElementById("prew-items");
var slider_items = document.querySelector(".slider-items");

//Ширина видимого блока
var width_visibity_block = document.querySelector(".slider-out").offsetWidth; 

//Буффер для использования в вычислениях
var buffer = width_visibity_block; 

//Ширина одного слайд-блока
var width_slide = document.querySelector(".items-wrapper").offsetWidth; 
var swipe = 0; 

//Ширина скрытого блока
const width_slider = document.querySelector(".slider-items").offsetWidth;

//Котнроль ширин
console.log("Видимый блок: " + width_visibity_block);
console.log("Один слайд-блок:" + width_slide);
console.log("Скрытый блок:" + width_slider);

slider_items.style.transform = "translate3d(-0px, 0px, 0px)";
slider_items.style.transition = "all 1s ease 0s";

next_item.onclick = function(){
	if(buffer != width_slider){
		swipe += width_slide;
		slider_items.style.transform = "translate3d( -" + swipe + "px, 0px, 0px)";
		buffer += width_slide;
		prew_item.classList.remove("disabled");
        next_item.classList.remove("disabled");
        if(buffer == width_slider){
            prew_item.classList.remove("disabled");
            next_item.classList.add("disabled");
        }
	}
}

prew_item.onclick = function(){
	if(swipe != 0){
        swipe -= width_slide;
		slider_items.style.transform = "translate3d(-"+ swipe +"px, 0px, 0px)"
        buffer -= width_slide;
		prew_item.classList.remove("disabled");
        next_item.classList.remove("disabled");
        if(buffer == width_visibity_block){
            next_item.classList.remove("disabled");
            prew_item.classList.add("disabled")
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


