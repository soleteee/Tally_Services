type AuthUser = {
    id?: string;
    email?: string;
    role?: string;
};

const STORAGE_KEYS = ['user', 'authUser', 'adminUser'];

const parseJwtRole = (token: string): string | null => {
    try {
        const parts = token.split('.');
        if (parts.length < 2) {
            return null;
        }

        const payload = JSON.parse(atob(parts[1])) as { role?: string };
        return typeof payload.role === 'string' ? payload.role : null;
    } catch (_error) {
        return null;
    }
};

const parseStoredRole = (): string | null => {
    for (const key of STORAGE_KEYS) {
        const rawValue = localStorage.getItem(key);
        if (!rawValue) {
            continue;
        }

        try {
            const parsed = JSON.parse(rawValue) as AuthUser;
            if (typeof parsed.role === 'string') {
                return parsed.role;
            }
        } catch (_error) {
            continue;
        }
    }

    return null;
};

export const getToken = (): string => localStorage.getItem('token') || '';

export const isAuthenticated = (): boolean => Boolean(getToken());

export const setAuthSession = (token: string, user: AuthUser): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuthSession = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authUser');
    localStorage.removeItem('adminUser');
};

export const getCurrentRole = (): string => {
    const fromStorage = parseStoredRole();
    if (fromStorage) {
        return fromStorage;
    }

    const token = getToken();
    const fromToken = token ? parseJwtRole(token) : null;

    return fromToken || '';
};
