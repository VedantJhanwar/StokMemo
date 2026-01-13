// StokMemo - Main Application Logic

// Utility: Format current date
function formatDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

// Utility: Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Utility: Add fade-in animation to elements
function addFadeInAnimation(selector, delay = 0) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fadeIn');
        }, delay + (index * 100));
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on load
    addFadeInAnimation('.hero', 200);
    addFadeInAnimation('.feature-card', 400);

    // Add active state to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = 'var(--color-accent-primary)';
        }
    });
});

// Export utilities
window.StokMemo = {
    formatDate,
    scrollToElement,
    addFadeInAnimation
};
