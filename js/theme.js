document.addEventListener('DOMContentLoaded', () => {
    // Add theme toggle button if not present
    const header = document.querySelector('header') || document.body;
    if (!document.querySelector('.theme-toggle')) {
        header.insertAdjacentHTML('beforeend', `
            <button onclick="toggleTheme()" class="theme-toggle">
                <span class="theme-icon">🌙</span>
            </button>
        `);
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Make toggleTheme available globally
window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};