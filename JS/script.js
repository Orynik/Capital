"use strict";
//Калькулятор

var input = document.querySelector(".weight-item");

var g_375 = document.getElementById("375");
var g_583 = document.getElementById("583");
var g_585 = document.getElementById("585");
var g_750 = document.getElementById("750");
var g_925 = document.getElementById("925");

var liquid = document.getElementById("liquid");
var scrap = document.getElementById("scrap");

var input_value = 0;
var calc_probe = 1800;
var calc_quality = 2;

var result = document.getElementById("result");

g_375.onclick = function(){
    calc_probe = 900;
    remove_active_simple(this);
    calculate(input_value,calc_probe,calc_quality);
}

g_583.onclick = function(){
    calc_probe = 1200;
    remove_active_simple(this);
    calculate(input_value,calc_probe,calc_quality);
}

g_585.onclick = function(){
    calc_probe = 1600;
    remove_active_simple(this);
    calculate(input_value,calc_probe,calc_quality);
}

g_750.onclick = function(){
    calc_probe = 1800;
    remove_active_simple(this);
    calculate(input_value,calc_probe,calc_quality);
}

g_925.onclick = function(){
    calc_probe = 2300;
    remove_active_simple(this);
    calculate(input_value,calc_probe,calc_quality);
}

liquid.onclick = function(){
    calc_quality = 4;
    remove_active_quality(this);
    calculate(input_value,calc_probe,calc_quality);
}

scrap.onclick = function(){
    calc_quality = 2;
    remove_active_quality(this);
    calculate(input_value,calc_probe,calc_quality);
}


function remove_active_simple(elem){
    document.querySelectorAll('.buttons-probe .active').forEach(n => n.classList.remove('active')) //Удаляет класс active у дочерних элементов buttons-probe
    elem.classList.add("active");
}

input.oninput = function() {
    input_value = input.value; //Запись изменения поля input
    calculate(input_value,calc_probe,calc_quality);
};

function remove_active_quality(elem){
    document.querySelectorAll('.buttons-quality .active').forEach(n => n.classList.remove('active'))
    elem.classList.add("active");
}

function calculate (weight, probe, quality){
    var calc_result = weight * probe * quality;
    result.innerHTML = calc_result;
}

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

    console.log("Сумма видимого блока и слайд-блока: " + (buffer + width_slide));
	
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


