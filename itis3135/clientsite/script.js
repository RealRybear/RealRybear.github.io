document.addEventListener("DOMContentLoaded", function() {
    const images = [
      {
        src: "images/bed.JPG",
        caption: "A peaceful moment right before Gatsby started running around!"
      },
      {
        src: "images/both.JPG",
        caption: "Gatsby and Birch sharing a playful moment, proving that companionship makes everything better."
      },
      {
        src: "images/bothcub.JPG",
        caption: "Chilling together watching birds in a cubby!"
      },
      {
        src: "images/chilln.JPG",
        caption: "Chilling as a team here!"
      },
      {
        src: "images/cool.JPG",
        caption: "This cat is nothing but confidence and cool vibes in every pose."
      },
      {
        src: "images/chin.JPG",
        caption: "A charming close-up of Gatsby."
      },
      {
        src: "images/pawsup.JPG",
        caption: "A playful gesture while sleeping!"
      },
      {
        src: "images/WOAH.JPG",
        caption: "A close up of Birch."
      },
      {
        src: "images/whodat.JPG",
        caption: "A wild Gatsby appeared!"
      },
      {
        src: "images/tummy.JPG",
        caption: "Tummy rub please."
      }
    ];
    
    let currentIndex = 0;
    
    const carouselImage = document.getElementById("carousel-image");
    const carouselCaption = document.getElementById("carousel-caption");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    
    function updateCarousel() {
      carouselImage.src = images[currentIndex].src;
      carouselImage.alt = images[currentIndex].caption;
      carouselCaption.textContent = images[currentIndex].caption;
    }
    //next image
    prevButton.addEventListener("click", function() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
    //go back an image
    nextButton.addEventListener("click", function() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });
  });
  