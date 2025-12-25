const gradientContainer = document.querySelector('.gradient-container');
let isHovered = false;
let speedMode = 'normal'; // 'normal', 'fast', 'paused'

// Function to update gradient colors dynamically
function updateGradientColors() {
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
        '#ffeaa7', '#dda15e', '#ff6b6b', '#c44569',
        '#f8b500', '#6c5ce7', '#a29bfe', '#fd79a8'
    ];
    
    // Shuffle colors for variety
    const shuffled = colors.sort(() => Math.random() - 0.5);
    const gradientString = shuffled.join(', ');
    
    gradientContainer.style.background = `linear-gradient(45deg, ${gradientString})`;
    gradientContainer.style.backgroundSize = '400% 400%';
}

// Initial color setup
updateGradientColors();

// Change colors periodically for more variety
setInterval(() => {
    if (!isHovered) {
        updateGradientColors();
    }
}, 20000); // Change colors every 20 seconds

// Hover event - pause animation
gradientContainer.addEventListener('mouseenter', () => {
    isHovered = true;
    gradientContainer.classList.add('paused');
});

// Mouse leave - resume animation
gradientContainer.addEventListener('mouseleave', () => {
    isHovered = false;
    gradientContainer.classList.remove('paused');
    gradientContainer.classList.remove('fast');
    speedMode = 'normal';
});

// Click event - toggle speed (normal -> fast -> paused -> normal)
gradientContainer.addEventListener('click', () => {
    if (speedMode === 'normal') {
        speedMode = 'fast';
        gradientContainer.classList.remove('paused');
        gradientContainer.classList.add('fast');
    } else if (speedMode === 'fast') {
        speedMode = 'paused';
        gradientContainer.classList.remove('fast');
        gradientContainer.classList.add('paused');
    } else {
        speedMode = 'normal';
        gradientContainer.classList.remove('paused');
        gradientContainer.classList.remove('fast');
    }
});

// Add smooth color transitions using CSS custom properties
function createSmoothColorTransition() {
    const root = document.documentElement;
    let hue = 0;
    
    setInterval(() => {
        if (!isHovered || speedMode !== 'paused') {
            hue = (hue + 1) % 360;
            root.style.setProperty('--hue', hue);
        }
    }, 50);
}

createSmoothColorTransition();

