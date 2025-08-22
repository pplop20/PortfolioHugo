// Navigation dropdown functionality
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(function(dropdown) {
      const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
      
      // Handle click events for dropdown (all devices)
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close other dropdowns
        dropdownItems.forEach(function(otherDropdown) {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-item.dropdown')) {
        dropdownItems.forEach(function(dropdown) {
          dropdown.classList.remove('active');
        });
      }
    });
  });
})();