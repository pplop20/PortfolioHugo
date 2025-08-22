// homepage-bg-changer-advanced.js
// Advanced version with dual layers to prevent white flash

(function() {
  // Only run this script if we're on the homepage
  const currentPath = window.location.pathname;
  const isHomepage = currentPath === '/' || 
                     currentPath === '/index.html' || 
                     currentPath.endsWith('/') || 
                     currentPath.endsWith('/index.html');
  
  if (!isHomepage) {
    return;
  }

  document.addEventListener('DOMContentLoaded', function() {
    let currentImage = 1;
    let isTransitioning = false;
    
    // Create a second background layer
    function initializeDualLayers() {
      const backgroundElement = document.querySelector('.fullscreen-background');
      if (!backgroundElement) return;
      
      // Create a new div for the second background layer
      const secondLayer = document.createElement('div');
      secondLayer.className = 'background-layer-2';
      secondLayer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: -2;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      `;
      
      // Insert it as the first child
      backgroundElement.insertBefore(secondLayer, backgroundElement.firstChild);
    }
    
    function getRandomImageNumber() {
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 7) + 1;
      } while (newNumber === currentImage);
      return newNumber;
    }
    
    function changeBackgroundImage() {
      if (isTransitioning) return; // Prevent multiple transitions
      
      const newImageNumber = getRandomImageNumber();
      const backgroundElement = document.querySelector('.fullscreen-background');
      const secondLayer = document.querySelector('.background-layer-2');
      
      if (backgroundElement && secondLayer) {
        isTransitioning = true;
        const newImagePath = `/portfolio_hugo/assets/img/homepage_main/${newImageNumber}.JPG`;
        
        // Preload the new image
        const tempImg = new Image();
        tempImg.onload = function() {
          // Set the new image on the second layer
          secondLayer.style.backgroundImage = `url('${newImagePath}')`;
          
          // Fade in the second layer
          secondLayer.style.opacity = '1';
          
          // After transition completes, update the main layer and hide second layer
          setTimeout(() => {
            // Update the main ::before pseudo-element
            const styleId = 'dynamic-bg-style';
            let styleElement = document.getElementById(styleId);
            
            if (styleElement) {
              styleElement.remove();
            }
            
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            styleElement.textContent = `
              .fullscreen-background::before {
                background-image: url('${newImagePath}') !important;
              }
            `;
            document.head.appendChild(styleElement);
            
            // Hide the second layer
            secondLayer.style.opacity = '0';
            
            currentImage = newImageNumber;
            isTransitioning = false;
          }, 500); // Match the CSS transition duration
        };
        
        tempImg.src = newImagePath;
      }
    }
    
    // Initialize dual layers
    initializeDualLayers();
    
    // Add click event listener
    document.addEventListener('click', function(event) {
      if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
        return;
      }
      changeBackgroundImage();
    });
    
    // Preload all images immediately
    function preloadImages() {
      for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `/portfolio_hugo/assets/img/homepage_main/${i}.JPG`;
      }
    }
    
    preloadImages();
  });
})();