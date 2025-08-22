// Gallery slideshow functionality - lean and readable
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all gallery images and slideshow elements
    const galleryImages = document.querySelectorAll('.gallery-image');
    const modal = document.getElementById('slideshowModal');
    const slideshowImage = document.getElementById('slideshowImage');
    const slideshowAltText = document.getElementById('slideshowAltText');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Track current image index
    let currentImageIndex = 0;
    
    // Create array of image data for easy navigation
    const imageData = Array.from(galleryImages).map(img => ({
        full: img.src,
        alt: img.alt
    }));
    
    // Open slideshow when gallery image is clicked
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index; // Set current index to clicked image
            openSlideshow();
        });
    });
    
    // Function to open slideshow modal
    function openSlideshow() {
        updateSlideshowImage(); // Display current image
        modal.style.display = 'block'; // Show modal
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close slideshow modal
    function closeSlideshow() {
        modal.style.display = 'none'; // Hide modal
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Function to update slideshow image
    function updateSlideshowImage() {
        const currentImage = imageData[currentImageIndex];
        slideshowImage.src = currentImage.full; // Set full-size image
        slideshowImage.alt = currentImage.alt; // Set alt text
        slideshowAltText.textContent = currentImage.alt; // Display alt text
    }
    
    // Function to go to next image (circular navigation)
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageData.length; // Wrap to first image if at end
        updateSlideshowImage();
    }
    
    // Function to go to previous image (circular navigation)
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageData.length) % imageData.length; // Wrap to last image if at beginning
        updateSlideshowImage();
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    // Close slideshow when clicking anywhere except image or navigation buttons
    modal.addEventListener('click', function(e) {
        if (e.target !== slideshowImage && 
            !prevBtn.contains(e.target) && 
            !nextBtn.contains(e.target)) {
            closeSlideshow();
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') { // Only work when slideshow is open
            if (e.key === 'ArrowRight') nextImage(); // Right arrow = next image
            if (e.key === 'ArrowLeft') prevImage(); // Left arrow = previous image
            if (e.key === 'Escape') closeSlideshow(); // Escape key = close slideshow
        }
    });
    
});