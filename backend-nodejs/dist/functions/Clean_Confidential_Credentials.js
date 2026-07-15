"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Clean_Confidential_Credentials;
function Clean_Confidential_Credentials(text) {
    // Remove emails
    const noEmail = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}/g, "");
    // Remove mobile numbers (10–15 digits, with optional +, spaces, hyphens)
    const finalText = noEmail.replace(/(\+?\d[\d\s\-]{8,14}\d)/g, "");
    return finalText.trim();
}
;
