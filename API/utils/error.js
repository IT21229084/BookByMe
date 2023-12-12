// error.js

export const createError = (status, message, originalError) => {
    const error = new Error();
    error.status = status;
    error.message = message || "Internal Server Error";
    error.originalError = originalError; // You can include the original error for debugging purposes
    return error;
};
