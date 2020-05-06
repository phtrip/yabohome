document.documentElement.style.setProperty("--scrollbar-size",getScrollbarSize()+"px");var scroller=new SmoothScroll({scrollBody:document.querySelector(".scroll-content"),scrollSpacer:document.querySelector(".spacer"),target:document.querySelector(".scroll-container"),scrollEase:0.05,});function getScrollbarSize(){var div=document.createElement("div");div.classList.add("scrollbar-div");document.body.appendChild(div);var size=div.offsetWidth-div.scrollWidth;document.body.removeChild(div);return size}
inView.threshold(0);if(window.matchMedia("(min-width: 768px)").matches){TweenMax.set(".item",{autoAlpha:0.1});inView('.item').on('enter',el=>{TweenMax.to(el,1,{x:0,autoAlpha:5,})})
// inView('.horizontal-1').once('enter',el=>{TweenMax.to(el,3,{xPercent:"20",yPercent:"35"})})
inView('.horizontal-1').once('enter',el=>{TweenMax.to(el,3,{xPercent:"0",yPercent:"0"})})
inView('.horizontal-2').once('enter',el=>{TweenMax.to(el,3,{xPercent:"0",yPercent:"0"})})
inView('.horizontal-3').once('enter',el=>{TweenMax.to(el,4,{xPercent:"0",yPercent:"0"})})
inView('.horizontal-4').once('enter',el=>{TweenMax.to(el,4,{xPercent:"0",yPercent:"0"})})
inView('.horizontal-5').once('enter',el=>{TweenMax.to(el,2,{xPercent:"0",yPercent:"0"})})
inView('.horizontal-6').once('enter',el=>{TweenMax.to(el,2,{xPercent:"0",yPercent:"0"})})
inView('.horizontal-7').once('enter',el=>{TweenMax.to(el,2,{xPercent:"0",yPercent:"0"})})}
if(window.matchMedia("(min-width: 769px)").matches){inView('.content-collages').on('enter',el=>{TweenMax.to(el,2,{yPercent:"-15"})})}
if(window.matchMedia("(min-width: 769px)").matches){inView('.grid__item').on('enter',el=>{TweenMax.to(el,1,{yPercent:"-15",autoAlpha:1})})}
$(document).ready(function(){setTimeout(function(){$('#loader-wrapper').addClass('fadeout')},20);setTimeout(function(){$('body').addClass('loaded')},20)});