let parallax = document.getElementById('section1')
let textoParallax = document.getElementById('textoMain')

//  window.addEventListener('scroll', function(){
//      let value = window.scrollY;
//      parallax.style.transform = `scale(1.${value * 0.006})`; 
//  })

  window.addEventListener('scroll', function(){
      let value = window.scrollY;
    //   textoParallax.style.marginBottom = 50 + '%';
    //   textoParallax.style.position = 'absolute';
      textoParallax.style.marginLeft = value * 1 + 'px';
  })