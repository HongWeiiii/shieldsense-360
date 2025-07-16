// js/calculator.js
export function calculateShieldScore(profileData) {
    let overallScore = 0;
    let recommendedPlan = { name: "Not determined", details: "" };
    let wardCoverageScore = 0;
    let outOfPocketScore = 0;
    let futurePremiumAffordabilityScore = 0;

    // --- 1. Ward Coverage Fit (Max 30 points) ---
    if (profileData.healthcarePreference === "Public - B2/C (Subsidised)") {
        if (profileData.financialSituation === "Struggling to save" || profileData.monthlyIncomeRange === "<$2,000") {
            wardCoverageScore = 30; // Best fit for budget-conscious
            recommendedPlan = { name: "MediShield Life only", details: "Recommendation: MediShield Life (MediShield Life only)" };
        } else {
            wardCoverageScore = 20; // Good fit, but could consider more options
        }
    } else if (profileData.healthcarePreference === "Private Hospital") {
        if (profileData.financialSituation === "Investing significantly" && profileData.monthlyIncomeRange === ">$10,000") {
            wardCoverageScore = 30; // Best fit for high income, private preference
            recommendedPlan = { name: "PRUShield Premier", details: "Recommendation: PRUShield Premier with an appropriate rider." };
        } else {
            wardCoverageScore = 10; // Mismatch or less optimal for current situation
        }
    } else if (profileData.healthcarePreference === "Public - Class A" || profileData.healthcarePreference === "Public - Class B1") {
        if (profileData.financialSituation === "Saving actively") {
            wardCoverageScore = 25;
            recommendedPlan = { name: "PRUShield Plus", details: "Recommendation: PRUShield Plus for enhanced public ward coverage." };
        } else {
            wardCoverageScore = 15;
        }
    }
    // Prioritise existing plan if it's a good fit
    if (profileData.currentPlan && profileData.currentPlan !== "None") {
        if (profileData.currentPlan.includes("PRUShield") && profileData.healthcarePreference.includes("Private")) {
            wardCoverageScore = Math.min(30, wardCoverageScore + 5);
            recommendedPlan = { name: profileData.currentPlan, details: `Recommendation: Continue with your current ${profileData.currentPlan} plan.` };
        }
    }


    // --- 2. Out-of-Pocket Costs (Max 20 points) ---
    if (profileData.financialSituation === "Struggling to save") {
        outOfPocketScore = 10;
    } else if (profileData.financialSituation === "Saving actively") {
        outOfPocketScore = 15;
    } else if (profileData.financialSituation === "Investing significantly") {
        outOfPocketScore = 20;
    }
    if (profileData.healthConditions && profileData.healthConditions.length > 0 && !profileData.healthConditions.includes("None of the above")) {
        outOfPocketScore = Math.max(0, outOfPocketScore - 5);
    }


    // --- 3. Future Premium Affordability (Max 15 points) ---
    if (profileData.age < 40 && profileData.monthlyIncomeRange !== "<$2,000") {
        futurePremiumAffordabilityScore = 15;
    } else if (profileData.age >= 40 && profileData.age < 60) {
        if (profileData.monthlyIncomeRange === ">$10,000" || profileData.medisaveBalanceRange === ">$50,000") {
            futurePremiumAffordabilityScore = 10;
        } else {
            futurePremiumAffordabilityScore = 5;
        }
    } else { // age >= 60
        futurePremiumAffordabilityScore = 0;
    }


    // --- Calculate Overall Score ---
    const totalPossiblePoints = 30 + 20 + 15;
    overallScore = Math.round((wardCoverageScore + outOfPocketScore + futurePremiumAffordabilityScore) / totalPossiblePoints * 100);
    overallScore = Math.min(100, Math.max(0, overallScore));

    let fitCategory = "Average Fit";
    if (overallScore >= 90) fitCategory = "Excellent Fit";
    else if (overallScore >= 70) fitCategory = "Good Fit";
    else if (overallScore >= 50) fitCategory = "Average Fit";
    else fitCategory = "Poor Fit";

    // --- Lifetime Savings & Projected Lifetime Cost (Dummy Values) ---
    let potentialLifetimeSavings = 0;
    let projectedLifetimeCost = 0;

    switch (recommendedPlan.name) {
        case "MediShield Life only":
            potentialLifetimeSavings = 91000;
            projectedLifetimeCost = 340000;
            break;
        case "PRUShield Standard":
            potentialLifetimeSavings = 50000;
            projectedLifetimeCost = 600000;
            break;
        case "PRUShield Plus":
            potentialLifetimeSavings = 20000;
            projectedLifetimeCost = 800000;
            break;
        case "PRUShield Premier":
            potentialLifetimeSavings = -5000;
            projectedLifetimeCost = 1200000;
            break;
        default:
            potentialLifetimeSavings = 0;
            projectedLifetimeCost = 0;
    }

    // --- Action Plan Text ---
    let actionPlan = `Your analysis suggests ${recommendedPlan.name} is the most appropriate coverage for your current profile. `;
    if (recommendedPlan.name === "MediShield Life only") {
        actionPlan += "MediShield Life is designed to cover subsidised public wards (B2/C). You are generally not eligible for private Integrated Shield Plan coverage unless you choose to upgrade your ward preference in the profile. ";
    } else if (recommendedPlan.name.includes("PRUShield")) {
        actionPlan += `This plan provides comprehensive coverage tailored to your preferences, aiming to provide good protection against healthcare costs for ${profileData.healthcarePreference} wards. `;
    }
    actionPlan += "We recommend discussing these results with a financial adviser to understand the full implications for your personal circumstances. Note: Based on Ministry of Health (MOH) data and general market trends, actual lifetime premiums can vary significantly between insurers even within the same tier.";


    return {
        overallScore: overallScore,
        fitCategory: fitCategory,
        potentialLifetimeSavings: potentialLifetimeSavings,
        projectedLifetimeCost: projectedLifetimeCost,
        recommendedPlan: recommendedPlan,
        breakdown: {
            wardCoverageFit: { score: wardCoverageScore, max: 30, description: `Your preference for '${profileData.healthcarePreference}' aligns well with the recommended '${recommendedPlan.name}' plan's coverage.` },
            outOfPocketCosts: { score: outOfPocketScore, max: 20, description: `The recommended plan aims to keep your out-of-pocket expenses manageable based on your financial situation. Consider a rider for even lower co-payments if desired.` },
            futurePremiumAffordability: { score: futurePremiumAffordabilityScore, max: 15, description: `Based on your age and income, the premiums for this plan are generally affordable now, but it's important to be aware that premiums will typically increase with age.` }
        },
        actionPlan: actionPlan
    };
}