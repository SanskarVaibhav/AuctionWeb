// Action Types
export const SET_ALERT = 'SET_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';

// Action Creators
export const setAlert = (message, alertType = 'info') => ({
    type: SET_ALERT,
    payload: { message, alertType }
});

export const clearAlert = () => ({
    type: CLEAR_ALERT
});