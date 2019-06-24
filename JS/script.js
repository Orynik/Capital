"use strict";

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