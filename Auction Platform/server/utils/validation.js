// Validate email format
exports.isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Validate password strength (at least 6 chars, one letter, one number)
exports.isStrongPassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
};

// Validate username (alphanumeric, 3-20 chars)
exports.isValidUsername = (username) => {
    const re = /^[a-zA-Z0-9]{3,20}$/;
    return re.test(username);
};