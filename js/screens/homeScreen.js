// js/screens/homeScreen.js
import { showScreen, activateNavItem } from '../shared/uiHelpers.js';

export function initHomeScreen() {
    const calculateScoreHomeBtn = document.getElementById('calculateScoreHomeBtn');
    const loginSingpassHomeBtn = document.getElementById('loginSingpassHomeBtn'); // Get the new button ID
    const aiChatAdvisorCard = document.getElementById('aiChatAdvisorCard');
    const comparePlansCard = document.getElementById('comparePlansCard');

    if (calculateScoreHomeBtn) {
        calculateScoreHomeBtn.addEventListener('click', () => {
            showScreen('profile-step1-screen');
            activateNavItem('profile-step1-screen');
        });
    }

    // Add listener for the new Singpass button on Home screen
    if (loginSingpassHomeBtn) {
        loginSingpassHomeBtn.addEventListener('click', () => {
            alert('Simulating Singpass login from Home Screen.');
            // This button now links to the Myinfo verification screen
            showScreen('myinfo-verification-screen');
            activateNavItem('home-screen'); // Keep Home active, as Myinfo is a sub-flow from Home
        });
    }

    if (aiChatAdvisorCard) {
        aiChatAdvisorCard.addEventListener('click', () => {
            showScreen('ai-chat-screen');
            activateNavItem('ai-chat-screen');
        });
    }

    if (comparePlansCard) {
        comparePlansCard.addEventListener('click', () => {
            showScreen('compare-plans-screen');
            // Compare Plans isn't in bottom nav, so keep current active if any.
        });
    }
}