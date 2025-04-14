$(document).ready(function() {
    const slides = [
      { src: "images/robot.png", caption: "R - Robot (1st letter of my name)" },
      { src: "images/yacht.png", caption: "Y - Yacht (2nd letter of my name)" },
      { src: "images/airplane.png", caption: "A - Airplane (3rd letter of my name)" },
      { src: "images/night.png", caption: "N - Night Sky (4th letter of my name)" },
      { src: "images/castle.png", caption: "C - Castle (5th letter of my name)" },
      { src: "images/river.png", caption: "R - River (6th letter of my name)" },
      { src: "images/ocean.png", caption: "O - Ocean (7th letter of my name)" },
      { src: "images/sunset.png", caption: "S - Sunset (8th letter of my name)" },
      { src: "images/bridge.png", caption: "B - Bridge (9th letter of my name)" },
      { src: "images/yurt.png", caption: "Y - Yurt (10th letter of my name)" }
    ];
    
    let currentSlide = 0;
    
    function updateSlide() {
      $('#mainImage').fadeOut(500, function() {
        $(this).attr('src', slides[currentSlide].src)
               .attr('alt', slides[currentSlide].caption)
               .fadeIn(500);
      });
      $('#caption').fadeOut(500, function() {
        $(this).text(slides[currentSlide].caption).fadeIn(500);
      });
    }
    
    updateSlide();
    
    $('#prev').click(function() {
      currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
      updateSlide();
    });
    
    $('#next').click(function() {
      currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
      updateSlide();
    });
  });
  