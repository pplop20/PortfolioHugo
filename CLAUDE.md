# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a photography portfolio website named "Hugo A Chang" - a static HTML/CSS/JavaScript site without a build system. The project contains a single-page portfolio with a fullscreen background image carousel.

## Development Commands

This project uses compiled CSS from SCSS and does not have automated build tools configured. Development requires manual compilation:

### SCSS Compilation
```bash
# Compile SCSS to CSS (requires sass to be installed)
sass assets/css/styles.scss assets/css/styles.min.css --style compressed --source-map
```

### Local Development
```bash
# Serve locally using any static server, e.g.:
python -m http.server 8000
# or
npx serve .
```

## Project Structure

- `index.html` - Main homepage with fullscreen background and title display
- `assets/css/styles.scss` - Main SCSS stylesheet with responsive design
- `assets/css/styles.min.css` - Compiled CSS output  
- `assets/js/homepage-bg-changer.js` - Background image carousel functionality
- `assets/img/homepage_main/` - Homepage background images (1.JPG to 6.JPG)
- `assets/img/eventos/` - Event photography portfolio images
- `assets/img/making_of/` - Behind-the-scenes photography
- `assets/img/personales/` - Personal photography
- `assets/img/sesiones/` - Photo session work

## Key Technical Details

### CSS Architecture
- Uses SCSS with variables for responsive breakpoints and typography
- Mobile-first responsive design with breakpoint at 768px
- Fullscreen layout with `overflow: hidden` to prevent scrolling
- Mix-blend-mode difference effect for text overlay
- CSS Grid/Flexbox for layout

### JavaScript Functionality
- Homepage background carousel that cycles through 6 images on click
- Dual-layer transition system to prevent white flash during image changes
- Image preloading for smooth transitions
- Homepage-only execution with path detection

### Image Paths
All image references use absolute paths starting with `/portfolio_hugo/` - this suggests the site is designed to be deployed in a subdirectory.

## Known Issues
- SCSS file contains TODO comments about mix-blend-mode issues
- JavaScript functionality may need debugging per developer comments
- No automated build process for SCSS compilation

## Development Guidelines
- Style should always be written in assets/css/styles.scss, in scss

## Role Identity
- You are a senior front-end developer