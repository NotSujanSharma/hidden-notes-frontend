const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.hiddennotes.xyz';

const apiFetch = async (endpoint, method = 'GET', body = null, auth = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (auth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
    }
    if (!response.ok) {
        throw new Error(await response.text());
    }
    console.log(`I have to check here: ${response}`);
    return response.json();
};

export const register = (name,email, password) =>
    apiFetch('/api/register', 'POST', {name, email, password });

export const login = (email, password) =>
    apiFetch('/api/login', 'POST', { email, password });

export const getUser = () => apiFetch('/api/user', 'GET', null, true);

export const getLink = () => apiFetch('/api/get-link', 'GET', null, true);

export const submitMessage = (linkId, content, category, captcha) =>
    apiFetch(`/api/messages/${linkId}`, 'POST', { content, category, captcha });

export const getMessages = () => apiFetch('/api/messages', 'GET', null, true);

export const getUserName = (linkId) => apiFetch(`/api/user/${linkId}`, 'GET', null);


// Assume password change endpoint
export const changePassword = (currentPassword, newPassword) =>
    apiFetch('/api/user/password', 'PUT', { currentPassword, newPassword }, true);