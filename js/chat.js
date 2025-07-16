// js/chat.js
export function addMessageToChat(chatWindowElement, sender, message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    chatWindowElement.appendChild(messageDiv);
    chatWindowElement.scrollTop = chatWindowElement.scrollHeight; // Auto scroll to bottom
}

export function getAiResponse(query) {
    query = query.toLowerCase();
    if (query.includes("rider")) {
        return "A rider is an optional add-on to your Integrated Shield Plan that can help reduce your out-of-pocket expenses (like deductibles and co-insurance) significantly, often to 5% or 0%.";
    } else if (query.includes("co-insurance")) {
        return "Co-insurance is the percentage of the bill that you have to pay after your deductible is met. For example, if your co-insurance is 10%, you pay 10% of the bill, and the insurer pays 90%.";
    } else if (query.includes("class a") && query.includes("b1")) {
        return "In public hospitals, Class A wards are typically single-bedded and offer amenities like attached bathrooms, while Class B1 wards are multi-bedded (4-6 patients) with basic amenities. Neither Class A nor B1 wards are eligible for government subsidies.";
    } else if (query.includes("medisave")) {
        return "MediSave is a national savings scheme in Singapore that helps individuals save for healthcare expenses, including Integrated Shield Plan premiums, hospitalisation costs, and approved outpatient treatments."; // Changed spelling
    } else {
        return "I'm designed to help with Integrated Shield Plan related questions. Could you please rephrase your question or ask about terms like 'deductible', 'premium', or 'coverage'?";
    }
}