// js/shared/dataStore.js
let currentProfileData = {
    age: null,
    financialSituation: null,
    healthcarePreference: null,
    currentPlan: null,
    healthConditions: [],
    monthlyIncomeRange: null,
    medisaveBalanceRange: null
};

export function getProfileData() {
    return { ...currentProfileData }; // Return a copy to prevent direct modification
}

export function updateProfileData(newData) {
    currentProfileData = { ...currentProfileData, ...newData };
    console.log("Profile Data Updated:", currentProfileData); // For debugging
}

export function resetProfileData() {
    currentProfileData = {
        age: null,
        financialSituation: null,
        healthcarePreference: null,
        currentPlan: null,
        healthConditions: [],
        monthlyIncomeRange: null,
        medisaveBalanceRange: null
    };
    console.log("Profile Data Reset.");
}