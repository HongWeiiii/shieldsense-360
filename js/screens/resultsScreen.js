// js/screens/resultsScreen.js
import { showScreen, activateNavItem } from '../shared/uiHelpers.js';
import { getProfileData } from '../shared/dataStore.js';

let viewPlanDetailsBtn;
let comparePlansResultsBtn;

export function renderResultsScreen(result) {
    // Summary Card
    document.getElementById('shieldScoreValue').textContent = result.overallScore;
    document.getElementById('shieldScoreCategory').textContent = result.fitCategory;
    document.getElementById('scoreDescription').textContent = result.scoreDescription || 'This score means the recommended plan provides strong coverage for your needs at an efficient cost.';
    document.getElementById('lifetimeSavings').textContent = `$${result.potentialLifetimeSavings.toLocaleString()}`;
    document.getElementById('projectedCost').textContent = `~$${result.projectedLifetimeCost.toLocaleString()}`; // Changed £ back to $
    document.getElementById('recommendedPlanName').textContent = result.recommendedPlan.name;
    document.getElementById('recommendedPlanDetails').textContent = result.recommendedPlan.details;

    // Store the result data in a module-level variable for access by breakdown screen if needed
    // Or, breakdown screen can re-calculate or fetch from dataStore/passed result
    // For now, `breakdownScreen.js` will know how to get its data.
}

export function initResultsScreen() {
    viewPlanDetailsBtn = document.getElementById('viewPlanDetailsBtn');
    comparePlansResultsBtn = document.getElementById('comparePlansResultsBtn');

    if (viewPlanDetailsBtn) {
        viewPlanDetailsBtn.addEventListener('click', () => {
            showScreen('breakdown-screen');
            activateNavItem('profile-step1-screen'); // Keep Calculator nav item active
            // Re-render breakdown screen with current data, or pass data if stored
            const profileData = getProfileData();
            // Assuming breakdown screen will fetch current result from dataStore or re-calculate for demo
            // A better way would be to pass `result` from profileStep2Screen directly.
            // For now, `breakdownScreen.js` will know how to get its data.
        });
    }

    if (comparePlansResultsBtn) {
        comparePlansResultsBtn.addEventListener('click', () => {
            showScreen('compare-plans-screen');
            // No nav item for compare, so keep current active.
        });
    }
}