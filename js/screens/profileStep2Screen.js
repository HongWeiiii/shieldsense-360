// js/screens/profileStep2Screen.js
import { showScreen, activateNavItem } from '../shared/uiHelpers.js';
import { updateProfileData, getProfileData } from '../shared/dataStore.js'; // FIXED: Corrected 'datastore' to 'dataStore'
import { calculateShieldScore } from '../calculator.js';
import { renderResultsScreen } from './resultsScreen.js'; // Import the rendering function

let profileStep2Form;
let noneOfTheAboveCheckbox;
let healthConditionCheckboxes;
let backToStep1Btn;
let currentPlanSelect;
let monthlyIncomeSelect;
let medisaveBalanceSelect;

function setupEventListeners() {
    noneOfTheAboveCheckbox.addEventListener('change', () => {
        if (noneOfTheAboveCheckbox.checked) {
            healthConditionCheckboxes.forEach(checkbox => {
                if (checkbox !== noneOfTheAboveCheckbox) {
                    checkbox.checked = false;
                    checkbox.disabled = true;
                }
            });
        } else {
            healthConditionCheckboxes.forEach(checkbox => {
                if (checkbox !== noneOfTheAboveCheckbox) {
                    checkbox.disabled = false;
                }
            });
        }
    });

    healthConditionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked && checkbox !== noneOfTheAboveCheckbox) {
                noneOfTheAboveCheckbox.checked = false;
            }
        });
    });

    profileStep2Form.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedHealthConditions = Array.from(healthConditionCheckboxes)
            .filter(cb => cb.checked && cb.value !== 'None of the above')
            .map(cb => cb.value);

        updateProfileData({
            currentPlan: currentPlanSelect.value,
            monthlyIncomeRange: monthlyIncomeSelect.value,
            medisaveBalanceRange: medisaveBalanceSelect.value,
            healthConditions: selectedHealthConditions.length > 0 ? selectedHealthConditions : ['None of the above']
        });

        showScreen('loading-screen'); // Show loading screen

        // Simulate API call or complex calculation
        setTimeout(() => {
            const result = calculateShieldScore(getProfileData());
            renderResultsScreen(result); // Pass data to results screen renderer
            showScreen('results-screen');
            activateNavItem('profile-step1-screen'); // Keep Calculator nav item active
        }, 2000); // Simulate 2-second calculation
    });

    backToStep1Btn.addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('profile-step1-screen');
        activateNavItem('profile-step1-screen');
    });
}

function renderScreen() {
    const profile = getProfileData();

    currentPlanSelect.value = profile.currentPlan || '';
    monthlyIncomeSelect.value = profile.monthlyIncomeRange || '';
    medisaveBalanceSelect.value = profile.medisaveBalanceRange || '';

    // Reset health conditions checkboxes
    healthConditionCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });

    if (profile.healthConditions.includes('None of the above')) {
        noneOfTheAboveCheckbox.checked = true;
        healthConditionCheckboxes.forEach(checkbox => {
            if (checkbox !== noneOfTheAboveCheckbox) {
                checkbox.disabled = true;
            }
        });
    } else {
        profile.healthConditions.forEach(condition => {
            const checkbox = Array.from(healthConditionCheckboxes).find(cb => cb.value === condition);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }
}

export function initProfileStep2Screen() {
    profileStep2Form = document.getElementById('profile-step2-form');
    noneOfTheAboveCheckbox = document.getElementById('noneOfTheAbove');
    healthConditionCheckboxes = document.querySelectorAll('input[name="healthConditions"]');
    backToStep1Btn = document.getElementById('backToStep1');
    currentPlanSelect = document.getElementById('current-plan');
    monthlyIncomeSelect = document.getElementById('monthly-income');
    medisaveBalanceSelect = document.getElementById('medisave-balance');

    setupEventListeners();
    // Add an event listener for when this screen is shown, to render its state
    window.addEventListener('screenChange', (e) => {
        if (e.detail.id === 'profile-step2-screen') {
            renderScreen();
        }
    });
}