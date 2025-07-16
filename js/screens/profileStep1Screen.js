// js/screens/profileStep1Screen.js
import { showScreen, activateNavItem } from '../shared/uiHelpers.js';
import { updateProfileData, getProfileData } from '../shared/dataStore.js'; // FIXED: Corrected 'datastore' to 'dataStore'

let financialOptionCards;
let healthcareOptionCards;
let ageInput;
let form;

function setupEventListeners() {
    financialOptionCards.forEach(card => {
        card.addEventListener('click', () => {
            financialOptionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            updateProfileData({ financialSituation: card.dataset.value });
        });
    });

    healthcareOptionCards.forEach(card => {
        card.addEventListener('click', () => {
            healthcareOptionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            updateProfileData({ healthcarePreference: card.dataset.value });
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        updateProfileData({ age: ageInput.value });

        const currentData = getProfileData();
        if (!currentData.financialSituation || !currentData.healthcarePreference || !currentData.age) {
            alert('Please select your financial situation and healthcare preference, and enter your age.');
            return;
        }
        showScreen('profile-step2-screen');
        activateNavItem('profile-step1-screen'); // Keep Calculator nav item active
    });
}

function renderScreen() {
    const profile = getProfileData();
    if (profile.age) {
        ageInput.value = profile.age;
    }
    financialOptionCards.forEach(card => {
        if (card.dataset.value === profile.financialSituation) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
    healthcareOptionCards.forEach(card => {
        if (card.dataset.value === profile.healthcarePreference) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

export function initProfileStep1Screen() {
    // Get elements only once when module initializes
    financialOptionCards = document.querySelectorAll('#profile-step1-screen .form-section:nth-child(2) .option-card');
    healthcareOptionCards = document.querySelectorAll('#profile-step1-screen .form-section:nth-child(3) .option-card');
    ageInput = document.getElementById('age');
    form = document.getElementById('profile-step1-form');

    setupEventListeners();
    // Add an event listener for when this screen is shown, to render its state
    window.addEventListener('screenChange', (e) => {
        if (e.detail.id === 'profile-step1-screen') {
            renderScreen();
        }
    });
}