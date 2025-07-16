// js/shared/uiHelpers.js
const screens = document.querySelectorAll('.screen');
const navItems = document.querySelectorAll('.nav-item');

export function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}

export function activateNavItem(targetScreenId) {
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === targetScreenId) {
            item.classList.add('active');
        } else if (targetScreenId.startsWith('profile-step') && item.dataset.target === 'profile-step1-screen') {
            // Keep calculator active when in profile creation steps
            item.classList.add('active');
        } else if (targetScreenId.includes('results') && item.dataset.target === 'profile-step1-screen') {
             // Keep calculator active when viewing results
            item.classList.add('active');
        }
    });
}