document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

let parallax = document.getElementById('section1')
 let textoParallax = document.getElementById('textoMain')
 
  //  window.addEventListener('scroll', function(){
  //      let value = window.scrollY;
  //      let zoomLevel = 1 - (value * 0.001);
  //    //   textoParallax.style.marginBottom = 50 + '%';
  //    //   textoParallax.style.position = 'absolute';
  //      textoParallax.style.marginTop = value * 0.5 + 'px';
  //      textoParallax.style.transform = `scale(${zoomLevel})`;
  //  })
   let oqueE = document.querySelector('.o-que-e'); 
  
 oqueE.addEventListener('mousemove', function(e) {
   const rect = oqueE.getBoundingClientRect(); // Get element's position and dimensions
   const mouseX = e.clientX - rect.left; // Mouse X position relative to element
   const mouseY = e.clientY - rect.top; // Mouse Y position relative to element
   const centerX = rect.width / 2;
   const centerY = rect.height / 2;
   const offsetX = (centerX - mouseX) * 0.01; // Adjust sensitivity with 0.01
   const offsetY = (centerY - mouseY) * 0.01; 
   oqueE.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`; 
 });

 let empresasConectadas = document.getElementById('empresas-conectadas')
 empresasConectadas.addEventListener('mousemove', function(e) {
  const rect1 = empresasConectadas.getBoundingClientRect(); // Get element's position and dimensions
  const mouseX = e.clientX - rect1.left; // Mouse X position relative to element
  const mouseY = e.clientY - rect1.top; // Mouse Y position relative to element
  const centerX = rect1.width / 2;
  const centerY = rect1.height / 2;
  const offsetX = (centerX - mouseX) * 0.01; // Adjust sensitivity with 0.01
  const offsetY = (centerY - mouseY) * 0.01; 
  empresasConectadas.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`; 
});

let stars = document.getElementById('stars')
let moon = document.getElementById('moon')
let mountains_behind = document.getElementById('mountains_behind')
let text = document.getElementById('text')
let btn = document.getElementById('btn')
let mountains_front = document.getElementById('mountains_front')
let header = document.querySelector('header')

window.addEventListener('scroll', function() {
    let value = window.scrollY
    let zoomLevel = 1 - (value * 0.0005);
    stars.style.left = value * 0.25 + 'px'
    moon.style.top = value * 1.05 + 'px'
    mountains_behind.style.top = value * 0.5 + 'px'
    mountains_front.style.top = value * 0 + 'px'
    text.style.marginTop = value * 1.5 + 'px'
    text.style.transform = `scale(${zoomLevel})`;
    // btn.style.marginTop = value * 1.5 + 'px'
    header.style.top = value * 0.5 + 'px'
})





