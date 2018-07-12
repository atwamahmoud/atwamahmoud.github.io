document.addEventListener('DOMContentLoaded',_=>{observeImages()})
window.onscroll=_=>{const headerHeight=365.5;const scrolled=window.pageYOffset;let navbar=document.getElementsByClassName('main-list')[0];if(scrolled>=headerHeight){if(navbar.className==='main-list')
navbar.classList.add('main-shown-list')}else{if(navbar.className==='main-list main-shown-list')
navbar.classList.remove('main-shown-list')}}
const inputBoxes=document.querySelectorAll('.input-box');const inputContainers=document.querySelectorAll('.input-container');[].slice.call(inputBoxes).map((el,i)=>{if(i<3){el.addEventListener('focus',_=>{inputContainers[i].classList.toggle('active-container')})
el.addEventListener('blur',_=>{inputContainers[i].classList.toggle('active-container')})}});const submitBtn=document.querySelector('.submit-btn');submitBtn.addEventListener('click',e=>{e.preventDefault();const response=grecaptcha.getResponse();const email=document.querySelector('#email').value;const name=document.querySelector('#name').value;const msg=document.querySelector('.msg').value;const icon=document.querySelector('.send-icon');icon.classList.add('rotate');if(!response)return;const reqBody={'response':response,'email':email,'name':name,'msg':msg}
sendToOutbox(reqBody).then(_=>registerSW()).then(reg=>{reg.sync.register('outbox')})
navigator.serviceWorker.addEventListener('message',e=>{if(e.data===!0){icon.classList.remove('rotate');document.querySelector('.submit-btn').classList.add('sent')}})})
function registerSW(){if(navigator.serviceWorker){return navigator.serviceWorker.register('/sw.js')}
return null}
function sendToOutbox(msg){return caches.open('outbox').then(cache=>{const resp=new Response(JSON.stringify(msg),{type:'application/json'})
cache.put('https://personal-app-5239.herokuapp.com/verify',resp)})}
registerSW();const INTERSECTION_OBSERVER=_=>{const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){let img=entry.target;img.setAttribute('src',img.getAttribute('data-src'));observer.unobserve(img)}}})
return observer}
const observeImages=_=>{const images=document.querySelectorAll('img');const observer=INTERSECTION_OBSERVER();for(let i=0;i<images.length;i++){observer.observe(images[i]);console.log('observing an image....')}}