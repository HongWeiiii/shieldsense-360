// js/screens/chatScreen.js
import { showScreen, activateNavItem } from '../shared/uiHelpers.js';
import { addMessageToChat, getAiResponse } from '../chat.js'; // Import core chat functions

let backFromChatBtn;
let chatWindow;
let chatInput;
let chatSendBtn;
let suggestedQuestionButtons;

function handleUserInput(message, isSuggested = false) {
    if (!message.trim()) return;

    addMessageToChat(chatWindow, "User", message, true); // Display user's message

    // Simulate AI response
    if (!isSuggested) {
        setTimeout(() => {
            const aiResponse = getAiResponse(message);
            addMessageToChat(chatWindow, "AI", aiResponse);
        }, 500);
    } else {
        // For suggested questions, provide a specific answer instantly
        const aiResponse = getAiResponse(message);
        setTimeout(() => {
            addMessageToChat(chatWindow, "AI", aiResponse);
        }, 300);
    }
}

export function initChatScreen() {
    backFromChatBtn = document.getElementById('backFromChat');
    chatWindow = document.querySelector('#ai-chat-screen .chat-window');
    chatInput = document.getElementById('chatInput');
    chatSendBtn = document.getElementById('chatSendBtn');
    suggestedQuestionButtons = document.querySelectorAll('.suggested-q-btn');

    if (backFromChatBtn) {
        backFromChatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('home-screen'); // Or intelligently go back to last screen
            activateNavItem('home-screen');
        });
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', () => {
            handleUserInput(chatInput.value);
            chatInput.value = ''; // Clear input
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                chatSendBtn.click();
            }
        });
    }

    suggestedQuestionButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleUserInput(button.dataset.question, true);
        });
    });

    // When chat screen is shown, scroll to bottom
    window.addEventListener('screenChange', (e) => {
        if (e.detail.id === 'ai-chat-screen') {
            chatWindow.scrollTop = chatWindow.scrollHeight;
            chatInput.focus();
        }
    });
}