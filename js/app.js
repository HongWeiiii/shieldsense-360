// js/app.js
import { showScreen, activateNavItem } from './shared/uiHelpers.js';
import { initMyinfoScreen } from './screens/myinfoScreen.js';
import { initHomeScreen } from './screens/homeScreen.js';
import { initProfileStep1Screen } from './screens/profileStep1Screen.js';
import { initProfileStep2Screen } from './screens/profileStep2Screen.js';
import { initLoadingScreen } from './screens/loadingScreen.js'; // Added init for completeness, though it's minimal
import { initResultsScreen } from './screens/resultsScreen.js';
import { initBreakdownScreen } from './screens/breakdownScreen.js';
import { initChatScreen } from './screens/chatScreen.js';
import { initComparePlansScreen } from './screens/comparePlansScreen.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all screen modules (they will attach their own listeners)
    initMyinfoScreen();
    initHomeScreen();
    initProfileStep1Screen();
    initProfileStep2Screen();
    initLoadingScreen(); // Initialize loading screen module
    initResultsScreen();
    initBreakdownScreen();
    initChatScreen();
    initComparePlansScreen();

    // Set up global navigation bar listeners
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreenId = item.dataset.target;
            showScreen(targetScreenId);
            activateNavItem(targetScreenId); // This is handled in uiHelpers
            // Trigger a custom event for screens to respond to
            window.dispatchEvent(new CustomEvent('screenChange', { detail: { id: targetScreenId } }));
        });
    });

// Start the application on the Home screen
showScreen('home-screen');
activateNavItem('home-screen'); // Highlight 'Home' in nav bar
window.dispatchEvent(new CustomEvent('screenChange', { detail: { id: 'home-screen' } }));
});