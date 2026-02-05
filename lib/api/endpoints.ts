// List of api routes
// Single source of truth for api endpoints

export const API = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        GOOGLE: "/auth/google",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
    },
    USERS: {
        GET_ONE: (uid: string) => `/user/${uid}`,
    }
}
