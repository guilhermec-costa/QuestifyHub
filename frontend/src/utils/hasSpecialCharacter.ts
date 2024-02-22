export const hasSpecialCharacter = (password: string): boolean => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(password);
};
