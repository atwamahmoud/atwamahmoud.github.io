document.addEventListener('DOMContentLoaded',_=>{observeImages()})
window.onscroll=_=>{const headerHeight=365.5;const scrolled=window.pageYOffset;let navbar=document.getElementsByClassName('main-list')[0];if(scrolled>=headerHeight){if(navbar.className==='main-list')
navbar.classList.add('main-shown-list')}else{if(navbar.className==='main-list main-shown-list')
navbar.classList.remove('main-shown-list')}}
function registerSW(){if(navigator.serviceWorker){return navigator.serviceWorker.register('/sw.js')}
return null}
function sendToOutbox(msg){return caches.open('outbox').then(cache=>{const resp=new Response(JSON.stringify(msg),{type:'application/json'})
cache.put('https://personal-app-5239.herokuapp.com/verify',resp)})}
registerSW();const INTERSECTION_OBSERVER=_=>{const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){let img=entry.target;img.setAttribute('src',img.getAttribute('data-src'));observer.unobserve(img)}}})
return observer}
const observeImages=_=>{const images=document.querySelectorAll('img');const observer=INTERSECTION_OBSERVER();for(let i=0;i<images.length;i++){observer.observe(images[i]);console.log('observing an image....')}}
