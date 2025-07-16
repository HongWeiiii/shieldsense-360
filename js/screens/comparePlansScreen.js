// js/screens/comparePlansScreen.js
import { showScreen, activateNavItem } from '../shared/uiHelpers.js';

export function initComparePlansScreen() {
    const backFromCompareBtn = document.getElementById('backFromCompare');

    if (backFromCompareBtn) {
        backFromCompareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Decide where to go back: home or results screen, based on entry point
            // For simplicity, go to home for now. A more robust app might track history.
            showScreen('home-screen');
            activateNavItem('home-screen');
        });
    }
}