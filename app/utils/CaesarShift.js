export const shiftEncrypt = (text, shift) => {
    let result = '';
    for (const char of text) {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
        result += String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
        result += String.fromCharCode(((code - 97 + shift) % 26) + 97);
        } else {
        result += char;
        }
    }
    return result;
};

export const shiftDecrypt = (text, shift) => {
    return shiftEncrypt(text, 26 - shift);
}