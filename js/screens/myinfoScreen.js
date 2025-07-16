// js/screens/myinfoScreen.js
import { showScreen, activateNavItem } from '../shared/uiHelpers.js';
import { updateProfileData, getProfileData } from '../shared/dataStore.js'; // Ensure correct casing: dataStore
import { calculateShieldScore } from '../calculator.js';
import { renderResultsScreen } from './resultsScreen.js';

export function initMyinfoScreen() {
    const verifySingpassBtn = document.getElementById('verifySingpassBtn');
    const manualEntryLink = document.getElementById('manualEntryLink');

    if (verifySingpassBtn) {
        verifySingpassBtn.addEventListener('click', () => {
            alert('Simulating Myinfo verification success and data retrieval!');
            // For demo, we'll populate dummy data into dataStore as if Myinfo provided it
            updateProfileData({
                age: 35, // Example data
                financialSituation: "Saving actively",
                healthcarePreference: "Public - Class A",
                currentPlan: "None",
                healthConditions: ["None of the above"],
                monthlyIncomeRange: "$4,001 - $6,000",
                medisaveBalanceRange: "$5,000 - $20,000"
            });

            showScreen('loading-screen');
            activateNavItem('profile-step1-screen'); // Activate calculator as this leads to a score/results

            // Simulate calculation and transition to results screen
            setTimeout(() => {
                const result = calculateShieldScore(getProfileData());
                renderResultsScreen(result);
                showScreen('results-screen');
            }, 2000);
        });
    }

    if (manualEntryLink) {
        manualEntryLink.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('profile-step1-screen');
            activateNavItem('profile-step1-screen');
        });
    }
}