// js/screens/breakdownScreen.js
import { showScreen, activateNavItem } from '../shared/uiHelpers.js';
import { getProfileData } from '../shared/dataStore.js';
import { calculateShieldScore } from '../calculator.js'; // Recalculate to get breakdown data

let backToResultsBtn;
let askAiBreakdownBtn;

export function renderBreakdownScreen() {
    // Recalculate result to get breakdown details (or pass from previous screen)
    const currentResult = calculateShieldScore(getProfileData());

    document.getElementById('breakdownShieldScoreValue').textContent = currentResult.overallScore;
    document.getElementById('breakdownShieldScoreCategory').textContent = currentResult.fitCategory;
    document.getElementById('wardCoverageScore').textContent = currentResult.breakdown.wardCoverageFit.score;
    document.getElementById('wardCoverageMax').textContent = currentResult.breakdown.wardCoverageFit.max;
    document.getElementById('wardCoverageDescription').textContent = currentResult.breakdown.wardCoverageFit.description;
    document.getElementById('outOfPocketScore').textContent = currentResult.breakdown.outOfPocketCosts.score;
    document.getElementById('outOfPocketMax').textContent = currentResult.breakdown.outOfPocketCosts.max;
    document.getElementById('outOfPocketDescription').textContent = currentResult.breakdown.outOfPocketCosts.description;
    document.getElementById('premiumAffordabilityScore').textContent = currentResult.breakdown.futurePremiumAffordability.score;
    document.getElementById('premiumAffordabilityMax').textContent = currentResult.breakdown.futurePremiumAffordability.max;
    document.getElementById('premiumAffordabilityDescription').textContent = currentResult.breakdown.futurePremiumAffordability.description;
    document.getElementById('actionPlanText').textContent = currentResult.actionPlan;
}

export function initBreakdownScreen() {
    backToResultsBtn = document.getElementById('backToResults');
    askAiBreakdownBtn = document.getElementById('askAiBreakdownBtn');

    if (backToResultsBtn) {
        backToResultsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('results-screen');
            activateNavItem('profile-step1-screen'); // Keep Calculator nav item active
        });
    }

    if (askAiBreakdownBtn) {
        askAiBreakdownBtn.addEventListener('click', () => {
            showScreen('ai-chat-screen');
            activateNavItem('ai-chat-screen');
            // Optionally add a pre-filled message to the chat
            // Note: chatScreen.js handles the actual message display
            // We can dispatch a custom event or directly call a function if needed
            const chatInput = document.getElementById('chatInput'); // Directly access for quick demo
            chatInput.value = "Tell me more about my action plan and breakdown details.";
            chatInput.focus();
        });
    }

    // Listener to render breakdown when screen is shown
    window.addEventListener('screenChange', (e) => {
        if (e.detail.id === 'breakdown-screen') {
            renderBreakdownScreen();
        }
    });
}